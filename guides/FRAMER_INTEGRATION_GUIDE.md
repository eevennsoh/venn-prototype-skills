# Framer Integration Guide

## Overview

This guide explains how the Venn Prototyping Kit enables external access to the AI Gateway endpoint for Framer code components. The solution implements a secure, CORS-compliant 3-layer architecture that allows Framer canvases to communicate with your AI Gateway while keeping credentials safe.

## 🎯 The Problem

When attempting to use the AI Gateway endpoint directly from Framer (which runs on `framercanvas.com`), browsers block the request due to:

1. **Same-Origin Policy**: Browsers block cross-origin requests by default for security
2. **Missing CORS Headers**: The backend doesn't include `Access-Control-Allow-Origin` headers
3. **Preflight Requests**: Modern browsers send `OPTIONS` requests first to check permissions

Without proper CORS configuration, you'll see errors like:

```
Access to fetch at 'http://localhost:3000/api/ai-gateway/stream' from origin 'https://framercanvas.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🏗️ The Solution: Two Architectures for Different Environments

**⚠️ IMPORTANT**: The architecture differs between development and production due to how Next.js static export works.

### Development Architecture (3-Layer)

```
┌─────────────────┐
│ Framer Canvas   │ (framercanvas.com)
│  Chat.tsx       │
└────────┬────────┘
         │ POST http://localhost:3000/api/ai-gateway/stream
         │
         ▼
┌─────────────────────────────┐
│ Next.js API Route (Port 3000) │  ← CORS proxy layer
│  /api/ai-gateway/stream/    │
└────────┬────────────────────┘
         │ Proxy to backend
         │ POST http://localhost:8080/api/ai-gateway/stream
         │
         ▼
┌─────────────────────────────┐
│ Express Backend (Port 8080)  │  ← ASAP auth + AI Gateway
│  server.js                  │
└────────┬────────────────────┘
         │ Calls AI Gateway
         ▼
┌─────────────────────────────┐
│ Atlassian AI Gateway        │
│  Bedrock/Claude            │
└─────────────────────────────┘
```

### Production Architecture (2-Layer)

```
┌─────────────────┐
│ Framer Canvas   │ (framercanvas.com)
│  Chat.tsx       │
└────────┬────────┘
         │ POST https://your-service.platdev.atl-paas.net/api/ai-gateway/stream
         │ (Direct to Express - Next.js API routes excluded in build)
         │
         ▼
┌─────────────────────────────┐
│ Express Backend             │  ← CORS + ASAP auth + AI Gateway
│  server.js                  │     (Must handle CORS directly!)
│  + Static Next.js files     │
└────────┬────────────────────┘
         │ Calls AI Gateway
         ▼
┌─────────────────────────────┐
│ Atlassian AI Gateway        │
│  Bedrock/Claude            │
└─────────────────────────────┘
```

**Why the difference?**

- Production uses `npm run build:export` which creates a static export
- Static export EXCLUDES all API routes (they're development-only)
- Express serves both static files AND handles API endpoints directly
- This means Framer must call Express directly, requiring CORS on Express itself

---

## Layer 1: Next.js API Route (CORS Proxy)

**File**: `app/api/ai-gateway/stream/route.ts`

This is the **public-facing endpoint** that Framer calls: `http://localhost:3000/api/ai-gateway/stream`

### Key Implementation

```typescript
import { NextRequest, NextResponse } from "next/server";

// Handle CORS preflight requests
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*", // Allow ALL origins
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
		},
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { message } = body;

		// Validate input
		if (!message || typeof message !== "string") {
			return NextResponse.json(
				{ error: "Message is required" },
				{
					status: 400,
					headers: {
						"Access-Control-Allow-Origin": "*", // ← Critical!
						"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type, Authorization",
					},
				}
			);
		}

		// Forward to backend
		const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
		const url = `${backendUrl}/api/ai-gateway/stream`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			return NextResponse.json(
				{ error: "Backend request failed", details: errorText },
				{
					status: response.status,
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type, Authorization",
					},
				}
			);
		}

		// Stream the response back to the client
		if (response.headers.get("content-type")?.includes("text/event-stream")) {
			return new NextResponse(response.body, {
				status: response.status,
				headers: {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					Connection: "keep-alive",
					"Access-Control-Allow-Origin": "*", // ← On streaming responses too!
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			});
		}

		// If not streaming, return JSON
		const data = await response.json();
		return NextResponse.json(data, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error) {
		console.error("AI Gateway streaming proxy error:", error);
		return NextResponse.json(
			{
				error: "Internal server error",
				details: error instanceof Error ? error.message : String(error),
			},
			{
				status: 500,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			}
		);
	}
}
```

### Why This Layer Works

✅ **CORS Compliance**: `Access-Control-Allow-Origin: *` tells browsers "any origin can access this"  
✅ **Preflight Handling**: `OPTIONS` handler responds to browser preflight checks  
✅ **Streaming Support**: Preserves Server-Sent Events (SSE) format for real-time responses  
✅ **Error Handling**: All error responses include CORS headers  
✅ **Security**: Acts as a proxy, keeping backend internals hidden

---

## Layer 2: Express Backend (Production & Development)

**File**: `backend/server.js`

This endpoint handles ASAP authentication and AI Gateway communication. **In production, it must also handle CORS directly** since Next.js API routes don't exist in the deployed build.

### Required Changes to `backend/server.js`

⚠️ **You MUST add these to your Express backend for production to work:**

1. **Add OPTIONS handler** (before the POST handler) for CORS preflight
2. **Add CORS headers** at the very start of the POST handler
3. **Ensure `buildAIGatewayPayload` is loaded at startup** (top of file, not inside handler)

### Production-Ready Implementation with CORS

```javascript
// CORS preflight handler for Framer integration (REQUIRED for production!)
app.options("/api/ai-gateway/stream", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Max-Age", "86400");
	res.status(200).end();
});

// Streaming endpoint for Framer components
app.post("/api/ai-gateway/stream", async (req, res) => {
	// Add CORS headers for production (critical!)
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	try {
		console.log("Framer streaming endpoint called");
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({ error: "Message is required" });
		}

		const ENV_VARS = getEnvVars();
		const token = await getAuthToken();

		if (!token) {
			return res.status(500).json({ error: "Failed to generate authentication token" });
		}

		const streamingUrl = ENV_VARS.AI_GATEWAY_URL.replace("/invoke", "/invoke-with-response-stream");

		// Use pre-loaded buildAIGatewayPayload function (loaded at startup)
		const aiPayload = buildAIGatewayPayload(message, [], "");

		const aiResponse = await fetch(streamingUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "text/event-stream",
				Authorization: `bearer ${token}`,
				"X-Atlassian-UseCaseId": ENV_VARS.AI_GATEWAY_USE_CASE_ID,
				"X-Atlassian-CloudId": ENV_VARS.AI_GATEWAY_CLOUD_ID,
				"X-Atlassian-UserId": ENV_VARS.AI_GATEWAY_USER_ID,
			},
			body: JSON.stringify(aiPayload),
		});

		if (!aiResponse.ok) {
			const errorText = await aiResponse.text();
			console.error("AI Gateway error:", aiResponse.status, errorText.substring(0, 500));
			return res.status(500).json({
				error: "Failed to get AI response",
				status: aiResponse.status,
			});
		}

		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		const reader = aiResponse.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split("\n");

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					try {
						const data = JSON.parse(line.slice(6));
						if (data.delta?.text) {
							res.write(`data: ${JSON.stringify({ text: data.delta.text })}\n\n`);
						}
					} catch (e) {
						// Skip invalid JSON
					}
				}
			}
		}

		res.write("data: [DONE]\n\n");
		res.end();
	} catch (error) {
		console.error("Framer streaming API error:", error);
		res.status(500).json({
			error: "Internal server error",
			details: error.message,
		});
	}
});
```

**Critical Production Requirements:**

1. ✅ OPTIONS handler for CORS preflight
2. ✅ CORS headers set at start of POST handler (before any response)
3. ✅ Use pre-loaded buildAIGatewayPayload (don't require it inside the handler)
4. ✅ Headers set before try/catch to ensure they're present on errors too

### Step-by-Step: What to Add/Modify

**Step 1: Ensure `buildAIGatewayPayload` is loaded at startup**

At the top of `backend/server.js` (after other requires), add:

```javascript
// Load rovo config at startup
let buildAIGatewayPayload;
try {
	// Try Docker path first (./rovo), then local dev path (../rovo)
	let config;
	try {
		config = require("./rovo/config");
	} catch (e1) {
		config = require("../rovo/config");
	}
	buildAIGatewayPayload = config.buildAIGatewayPayload;
} catch (e) {
	console.warn("rovo config failed to load:", e.message);
	// Provide fallback
	buildAIGatewayPayload = (message) => ({
		anthropic_version: "bedrock-2023-05-31",
		max_tokens: 2000,
		system: "You are an AI assistant.",
		messages: [{ role: "user", content: [{ type: "text", text: message }] }],
	});
}
```

**Step 2: Add OPTIONS handler for CORS preflight**

Add this **before** your existing `app.post('/api/ai-gateway/stream', ...)` handler:

```javascript
// CORS preflight handler for Framer integration
app.options("/api/ai-gateway/stream", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Max-Age", "86400");
	res.status(200).end();
});
```

**Step 3: Add CORS headers to POST handler**

At the **very beginning** of your `app.post('/api/ai-gateway/stream', ...)` handler, add these headers (before the `try {` block):

```javascript
app.post('/api/ai-gateway/stream', async (req, res) => {
    // Add CORS headers for production (critical!)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        // ... rest of your existing handler code
    }
});
```

**Step 4: Use pre-loaded function (NOT dynamic require)**

Inside your POST handler, when building the AI payload, use:

```javascript
// ✅ CORRECT - use pre-loaded function
const aiPayload = buildAIGatewayPayload(message, [], "");

// ❌ WRONG - don't do this inside the handler
// const { buildAIGatewayPayload } = require(path.join(__dirname, '..', 'rovo', 'config.js'));
```

### Why This Layer Exists

🔐 **Security**: Keeps ASAP credentials secure (not exposed to Framer)  
🔄 **Token Management**: Handles ASAP token generation for AI Gateway authentication  
📡 **Format Conversion**: Transforms Bedrock streaming format to simpler format  
🎯 **Simplification**: No widget detection or complex logic for external consumers

---

## Layer 3: Framer Component (Consumer)

**File**: `skills/Chat.tsx`

This is your **Framer code component** that uses the API.

### Key Implementation

```tsx
import { addPropertyControls, ControlType } from "framer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
}

interface ChatProps {
	apiEndpoint?: string;
	placeholder?: string;
	style?: React.CSSProperties;
}

export default function Chat(props: ChatProps) {
	const {
		apiEndpoint = "http://localhost:3000/api/ai-gateway/stream", // Points to Next.js
		placeholder = "Type your message...",
		style,
	} = props;

	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			role: "user",
			content: input.trim(),
			timestamp: Date.now(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			// Call AI Gateway streaming API via Next.js proxy
			const response = await fetch(apiEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userMessage.content }),
			});

			if (!response.ok) {
				throw new Error("Failed to connect to AI Gateway streaming API");
			}

			// Read streaming response
			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error("No response stream available");
			}

			const decoder = new TextDecoder();
			let fullText = "";

			// Create placeholder assistant message
			const assistantMessage: Message = {
				role: "assistant",
				content: "",
				timestamp: Date.now(),
			};
			setMessages((prev) => [...prev, assistantMessage]);

			// Stream response text
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				const lines = chunk.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") break;

						try {
							const parsed = JSON.parse(data);
							if (parsed.text) {
								fullText += parsed.text;

								// Update message in real-time
								setMessages((prev) => prev.map((msg, idx) => (idx === prev.length - 1 ? { ...msg, content: fullText } : msg)));
							}
						} catch (e) {
							// Skip invalid JSON
						}
					}
				}
			}

			setIsLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setIsLoading(false);
		}
	};

	return <div style={{ ...style }}>{/* Chat UI implementation */}</div>;
}

addPropertyControls(Chat, {
	apiEndpoint: {
		type: ControlType.String,
		title: "API Endpoint",
		defaultValue: "http://localhost:3000/api/ai-gateway/stream",
	},
	placeholder: {
		type: ControlType.String,
		title: "Placeholder",
		defaultValue: "Type your message...",
	},
});
```

### Configuration in Framer

1. **Add the component to your Framer project**:
   - Copy `skills/Chat.tsx` to your Framer project's code files
2. **Configure the API endpoint**:
   - In the Framer canvas, select the Chat component
   - In the property controls, set "API Endpoint" to your deployed URL or `http://localhost:3000/api/ai-gateway/stream` for local development
3. **Test the connection**:
   - Run your local development servers (Next.js on port 3000, Express on port 8080)
   - Type a message in the Framer canvas preview
   - You should see streaming responses from the AI

---

## 🔑 Understanding CORS Headers

### Required CORS Headers

```typescript
'Access-Control-Allow-Origin': '*'
// Allows ANY domain (including Framer) to make requests
// In production, you might want to restrict this to specific domains

'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
// Specifies which HTTP methods are allowed

'Access-Control-Allow-Headers': 'Content-Type, Authorization'
// Allows these headers in the request

'Access-Control-Max-Age': '86400'
// Browser caches preflight response for 24 hours (performance optimization)
```

### Why `OPTIONS` Handler is Required

Modern browsers implement CORS by sending a **preflight request** before the actual request:

1. **Preflight Request** (Browser → Server):

   ```
   OPTIONS /api/ai-gateway/stream
   Origin: https://framercanvas.com
   Access-Control-Request-Method: POST
   Access-Control-Request-Headers: content-type
   ```

2. **Preflight Response** (Server → Browser):

   ```
   200 OK
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

3. **Actual Request** (Browser → Server):
   ```
   POST /api/ai-gateway/stream
   Content-Type: application/json
   ```

Without the `OPTIONS` handler, the preflight check fails and the browser never sends the actual `POST` request.

---

## 🚀 Deployment: Development vs Production URLs

### Development (localhost)

**Architecture**: 3-layer (Framer → Next.js → Express)

- Next.js: `http://localhost:3000`
- Express Backend: `http://localhost:8080`
- **Framer API Endpoint**: `http://localhost:3000/api/ai-gateway/stream`

**Why**: Next.js API routes provide CORS proxy layer.

### Production (Micros/Cloud)

**Architecture**: 2-layer (Framer → Express directly)

- Express serves static files + API routes
- **Framer API Endpoint**: `https://your-service.platdev.atl-paas.net/api/ai-gateway/stream`

**Why**: Static export excludes Next.js API routes. Express must handle CORS directly.

### Deploying with CORS Support

When deploying to production:

1. **Ensure Express has CORS handlers** (OPTIONS + headers on POST)
2. **Build for production**:
   ```bash
   VERSION=1.0.x
   docker buildx build --platform linux/amd64 --no-cache \
     -t docker.atl-paas.net/your-service:app-${VERSION} \
     -f backend/Dockerfile . --load
   docker push docker.atl-paas.net/your-service:app-${VERSION}
   ```
3. **Deploy**:
   ```bash
   export VERSION=1.0.x
   atlas micros service deploy --service=your-service --env=pdev-west2 --file=service-descriptor.yml
   ```
4. **Test CORS after deployment**:

   ```bash
   # Test preflight
   curl -i -X OPTIONS https://your-service.platdev.atl-paas.net/api/ai-gateway/stream \
     -H "Origin: https://framercanvas.com" \
     -H "Access-Control-Request-Method: POST"

   # Should return Access-Control-Allow-Origin: *

   # Test POST
   curl -i -X POST https://your-service.platdev.atl-paas.net/api/ai-gateway/stream \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}'
   ```

5. **Update Framer component**:
   ```typescript
   apiEndpoint: "https://your-service.platdev.atl-paas.net/api/ai-gateway/stream";
   ```

### Security Best Practices

For production deployments, consider:

1. **Restrict CORS Origins**:

   ```typescript
   'Access-Control-Allow-Origin': 'https://framercanvas.com'
   // Instead of '*'
   ```

2. **Add Rate Limiting**:

   ```javascript
   const rateLimit = require("express-rate-limit");
   const limiter = rateLimit({
   	windowMs: 15 * 60 * 1000, // 15 minutes
   	max: 100, // limit each IP to 100 requests per windowMs
   });
   app.use("/api/ai-gateway/stream", limiter);
   ```

3. **Add API Key Authentication**:

   ```typescript
   // In Next.js API route
   const apiKey = request.headers.get("x-api-key");
   if (apiKey !== process.env.FRAMER_API_KEY) {
   	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   ```

4. **Monitor Usage**:
   - Log all requests
   - Set up alerts for unusual traffic patterns
   - Track API usage per key/origin

---

## 🐛 Production-Specific Issues

### CORS Works in Development but Fails in Production

**Symptom**: Localhost works fine, but deployed version shows CORS errors in Framer.

**Cause**: Production uses static export which excludes Next.js API routes. Framer calls Express directly, but Express doesn't have CORS headers.

**Solution**:

1. Add OPTIONS handler to `backend/server.js`:

   ```javascript
   app.options("/api/ai-gateway/stream", (req, res) => {
   	res.setHeader("Access-Control-Allow-Origin", "*");
   	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
   	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   	res.setHeader("Access-Control-Max-Age", "86400");
   	res.status(200).end();
   });
   ```

2. Add CORS headers to POST handler (at the START, before try/catch):

   ```javascript
   app.post("/api/ai-gateway/stream", async (req, res) => {
   	res.setHeader("Access-Control-Allow-Origin", "*");
   	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
   	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   	// ... rest of handler
   });
   ```

3. Rebuild and redeploy with incremented version

**Verify**: Test OPTIONS request returns proper CORS headers:

```bash
curl -i -X OPTIONS https://your-service.com/api/ai-gateway/stream \
  -H "Origin: https://framercanvas.com" \
  -H "Access-Control-Request-Method: POST"
```

### "Cannot find module '/rovo/config.js'" in Production

**Symptom**: Works in dev, but production logs show module not found error.

**Cause**: Handler is trying to require rovo/config.js dynamically, but path resolution differs in Docker.

**Solution**: Use the pre-loaded `buildAIGatewayPayload` function instead:

```javascript
// DON'T DO THIS in the handler:
const { buildAIGatewayPayload } = require(path.join(__dirname, "..", "rovo", "config.js"));

// DO THIS instead (uses function loaded at server startup):
const aiPayload = buildAIGatewayPayload(message, [], "");
```

The function is already loaded at the top of server.js, so just use it directly.

---

## 🛠️ Troubleshooting

### "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause**: CORS headers not present on response  
**Solution**: Verify that:

- `OPTIONS` handler exists in Next.js API route
- All response types (success, error, streaming) include CORS headers
- Next.js dev server is running on port 3000

### "Failed to connect to AI Gateway streaming API"

**Cause**: Backend not responding or unreachable  
**Solution**:

- Verify Express backend is running on port 8080
- Check `.env.local` has all required AI Gateway credentials
- Test backend health: `curl http://localhost:8080/api/health`

### "Network request failed" in Framer

**Cause**: Incorrect API endpoint URL  
**Solution**:

- Verify URL in Framer component property controls
- Ensure Next.js dev server is accessible from your network
- Check browser console for detailed error messages

### Streaming Response Stops Mid-Response

**Cause**: Connection timeout or premature closure  
**Solution**:

- Verify all layers maintain `Connection: keep-alive` header
- Check for network interruptions
- Increase timeout values in fetch calls

### "401 Unauthorized" from AI Gateway

**Cause**: ASAP token generation or authentication failure  
**Solution**:

- Verify ASAP credentials in `.env.local`
- Check token generation: Review backend logs for ASAP errors
- Confirm AI Gateway credentials are correct

---

## 📋 Testing Checklist

### Development Testing

- [ ] Next.js dev server running on port 3000
- [ ] Express backend running on port 8080
- [ ] Framer points to `http://localhost:3000/api/ai-gateway/stream`
- [ ] CORS headers present via Next.js API route
- [ ] Streaming responses work in Framer canvas preview
- [ ] Error responses include CORS headers

### Production Testing (CRITICAL!)

- [ ] Express backend has OPTIONS handler for `/api/ai-gateway/stream`
- [ ] CORS headers set at start of POST handler (before try/catch)
- [ ] buildAIGatewayPayload uses pre-loaded function (not dynamic require)
- [ ] OPTIONS request returns proper CORS headers:
  ```bash
  curl -i -X OPTIONS https://your-service.com/api/ai-gateway/stream \
    -H "Origin: https://framercanvas.com" \
    -H "Access-Control-Request-Method: POST"
  ```
- [ ] POST request includes CORS headers in response:
  ```bash
  curl -i -X POST https://your-service.com/api/ai-gateway/stream \
    -H "Content-Type: application/json" \
    -d '{"message":"test"}'
  ```
- [ ] Framer component updated to production URL
- [ ] Streaming works in Framer with production endpoint
- [ ] Error responses also include CORS headers
- [ ] Backend health check endpoint responds correctly
- [ ] ASAP token generation succeeds
- [ ] Rate limiting configured (optional)
- [ ] API key authentication implemented (optional)
- [ ] Monitoring and logging set up

---

## 📚 Additional Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Framer: Code Components](https://www.framer.com/developers/)
- [Next.js: API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

---

## 🎯 Summary

The Framer integration uses **different architectures for development and production**:

### Development (3-Layer)

1. **Next.js API Route**: CORS proxy at `localhost:3000/api/ai-gateway/stream`
2. **Express Backend**: ASAP auth + AI Gateway at `localhost:8080`
3. **Framer Component**: Calls Next.js endpoint

### Production (2-Layer)

1. **Express Backend**: CORS + ASAP auth + AI Gateway + static files
2. **Framer Component**: Calls Express directly at `your-service.com/api/ai-gateway/stream`

**Key Production Requirements:**

- ✅ OPTIONS handler on Express for CORS preflight
- ✅ CORS headers on POST handler (set early, before try/catch)
- ✅ Use pre-loaded functions (avoid dynamic requires in handlers)
- ✅ Test CORS after every deployment
- ✅ Update Framer endpoint to production URL

**The Critical Difference**: Static export excludes Next.js API routes. In production, Express must handle CORS directly since there's no Next.js proxy layer.

This architecture provides:

- ✅ **Security**: ASAP credentials never exposed to client
- ✅ **CORS Compliance**: Proper headers on all responses (both environments)
- ✅ **Streaming Support**: Real-time AI responses
- ✅ **Flexibility**: Works in development and production
- ✅ **Developer Experience**: Simple integration for Framer components
