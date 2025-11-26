// Initialize console early for startup debugging
console.log("[STARTUP] Server process starting...");
console.error("[STARTUP] Startup initiated", new Date().toISOString());

// Try to load .env.local if it exists, but don't fail if it doesn't
try {
	require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });
	console.log("[STARTUP] .env.local loaded");
} catch (e) {
	console.log("[STARTUP] .env.local not found, using environment variables only");
}

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

console.log("[STARTUP] Dependencies loaded");

const app = express();
const port = process.env.PORT || 8080;
console.log(`[STARTUP] Port configured: ${port}`);

// Debug logging
const DEBUG = process.env.DEBUG === "true";
function debugLog(section, message, data) {
	if (DEBUG) {
		console.log(`[DEBUG][${section}] ${message}`, data ? JSON.stringify(data, null, 2) : "");
	}
}

app.use(cors());
app.use(express.json());

console.log("[STARTUP] Middleware configured");

function getEnvVars() {
	return {
		AI_GATEWAY_URL: process.env.AI_GATEWAY_URL,
		AI_GATEWAY_USE_CASE_ID: process.env.AI_GATEWAY_USE_CASE_ID,
		AI_GATEWAY_CLOUD_ID: process.env.AI_GATEWAY_CLOUD_ID,
		AI_GATEWAY_USER_ID: process.env.AI_GATEWAY_USER_ID,
	};
}

async function getAuthToken() {
	debugLog("AUTH", "Using ASAP authentication");
	return generateAsapToken();
}

function generateAsapToken() {
	try {
		let privateKey = process.env.ASAP_PRIVATE_KEY;
		if (!privateKey) {
			throw new Error("ASAP_PRIVATE_KEY not found in environment");
		}

		// Handle different key formats
		// Replace literal \\n with actual newlines
		privateKey = privateKey.replace(/\\n/g, "\n");

		// Ensure proper PEM format
		if (!privateKey.includes("-----BEGIN")) {
			// If it's base64 encoded, decode it
			try {
				privateKey = Buffer.from(privateKey, "base64").toString("utf-8");
			} catch (e) {
				// Not base64, use as-is
			}
		}

		// ASAP config for AI Gateway - read from environment variables
		// These are set in .env.local from the user's generated .asap-config file
		const config = {
			issuer: process.env.ASAP_ISSUER || process.env.AI_GATEWAY_USE_CASE_ID,
			kid: process.env.ASAP_KID,
			expiry: 60,
		};

		if (!config.issuer || !config.kid) {
			throw new Error("Missing ASAP configuration: ASAP_ISSUER and ASAP_KID must be set in .env.local");
		}

		const now = Math.floor(Date.now() / 1000);
		const payload = {
			iss: config.issuer,
			sub: config.issuer,
			aud: ["ai-gateway"],
			iat: now,
			exp: now + config.expiry,
			jti: `${config.issuer}-${now}-${Math.random().toString(36).substring(7)}`,
		};

		const token = jwt.sign(payload, privateKey, {
			algorithm: "RS256",
			keyid: config.kid,
		});

		return token;
	} catch (error) {
		console.error("Failed to generate ASAP token:", error);
		console.error("Private key format check:", {
			hasKey: !!process.env.ASAP_PRIVATE_KEY,
			keyLength: process.env.ASAP_PRIVATE_KEY?.length,
			startsWithBegin: process.env.ASAP_PRIVATE_KEY?.startsWith("-----BEGIN"),
		});
		throw new Error("Token generation failed: " + error.message);
	}
}

let buildAIGatewayPayload;
try {
	// Try Docker path first (./rovo), then local dev path (../rovo)
	let config;
	try {
		config = require("./rovo/config");
		console.log("[STARTUP] rovo config loaded from ./rovo (Docker path)");
	} catch (e1) {
		config = require("../rovo/config");
		console.log("[STARTUP] rovo config loaded from ../rovo (local dev path)");
	}
	buildAIGatewayPayload = config.buildAIGatewayPayload;
	console.log("[STARTUP] rovo config loaded successfully");
} catch (e) {
	console.warn("[STARTUP] rovo config failed to load:", e.message);
	console.warn("[STARTUP] Using fallback functions - config did not load!");
	// Provide a fallback
	buildAIGatewayPayload = (message) => ({
		anthropic_version: "bedrock-2023-05-31",
		max_tokens: 2000,
		system: "You are Rovo, an AI assistant.",
		messages: [{ role: "user", content: [{ type: "text", text: message }] }],
	});
}

app.post("/api/rovo-chat", async (req, res) => {
	try {
		const { message, conversationHistory, customSystemPrompt } = req.body;

		if (!message) {
			return res.status(400).json({ error: "Message is required" });
		}

		debugLog("CHAT", "Received chat request", { messageLength: message.length });

		const ENV_VARS = getEnvVars();
		debugLog("CHAT", "Environment variables loaded", {
			AI_GATEWAY_URL: ENV_VARS.AI_GATEWAY_URL ? "SET" : "MISSING",
			AI_GATEWAY_USE_CASE_ID: ENV_VARS.AI_GATEWAY_USE_CASE_ID,
			AI_GATEWAY_USER_ID: ENV_VARS.AI_GATEWAY_USER_ID,
		});

		if (!ENV_VARS.AI_GATEWAY_URL) {
			console.error("Missing required environment variable: AI_GATEWAY_URL");
			return res.status(500).json({ error: "Server configuration error" });
		}

		let token;
		try {
			debugLog("CHAT", "Starting authentication token generation");
			token = await getAuthToken();
			debugLog("CHAT", "Successfully obtained auth token", { tokenLength: token.length });
		} catch (tokenError) {
			console.error("Token generation error:", tokenError);
			debugLog("CHAT", "Token generation failed", { error: tokenError.message });
			return res.status(500).json({
				error: "Authentication failed",
				details: tokenError.message,
			});
		}

		const streamingUrl = ENV_VARS.AI_GATEWAY_URL.replace("/invoke", "/invoke-with-response-stream");

		const aiPayload = buildAIGatewayPayload(message, conversationHistory, customSystemPrompt);

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
		let accumulatedText = "";
		let widgetStarted = false;
		let widgetBuffer = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split("\n");

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					try {
						const data = JSON.parse(line.slice(6));

						// Extract text from Bedrock streaming format
						if (data.delta?.text) {
							accumulatedText += data.delta.text;

							if (!widgetStarted && accumulatedText.includes("WIDGET_DATA:")) {
								widgetStarted = true;
								const parts = accumulatedText.split("WIDGET_DATA:");
								widgetBuffer = "WIDGET_DATA:" + parts[1];
								console.log("Widget detected - buffering widget data");
							} else if (widgetStarted) {
								widgetBuffer += data.delta.text;
							} else {
								// Stream text before widget normally
								res.write(`data: ${JSON.stringify({ text: data.delta.text })}\n\n`);
							}
						}
					} catch (e) {
						// If not JSON or parsing fails, skip
					}
				}
			}
		}

		// Stream widget data if detected
		if (widgetStarted) {
			res.write(`data: ${JSON.stringify({ text: widgetBuffer })}\n\n`);
		}

		res.write("data: [DONE]\n\n");
		res.end();
	} catch (error) {
		console.error("Rovo Chat API error:", error);
		res.status(500).json({
			error: "Internal server error",
			details: error.message,
		});
	}
});

// CORS preflight handler for Framer integration
app.options("/api/ai-gateway/stream", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Max-Age", "86400");
	res.status(200).end();
});

// Streaming endpoint for Framer components (simpler format, no widget detection)
app.post("/api/ai-gateway/stream", async (req, res) => {
	// Add CORS headers for Framer
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

		// Build AI payload (without custom system prompts or conversation history for simplicity)
		// Use the buildAIGatewayPayload function that was already loaded at startup
		const aiPayload = buildAIGatewayPayload(message, [], ""); // No history, no custom prompt

		debugLog("FRAMER_STREAM", "Calling AI Gateway", {
			url: streamingUrl,
			hasToken: !!token,
		});

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

						// Extract text from Bedrock streaming format
						if (data.delta?.text) {
							// Send in simple format expected by Framer component
							res.write(`data: ${JSON.stringify({ text: data.delta.text })}\n\n`);
						}
					} catch (e) {
						// If not JSON or parsing fails, skip
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

app.get("/healthcheck", (req, res) => {
	console.log("Healthcheck requested by Micros");
	res.status(200).json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
	console.log("Health check requested");
	debugLog("HEALTH", "Processing health check");

	const envVars = getEnvVars();
	const key = process.env.ASAP_PRIVATE_KEY;

	debugLog("HEALTH", "Auth configuration", {
		hasAsapKey: !!key,
	});

	const response = {
		status: "OK",
		message: "Backend server is working!",
		timestamp: new Date().toISOString(),
		authMethod: "ASAP",
		debugMode: DEBUG,
		envCheck: {
			AI_GATEWAY_URL: envVars.AI_GATEWAY_URL ? "SET" : "MISSING",
			AI_GATEWAY_USE_CASE_ID: envVars.AI_GATEWAY_USE_CASE_ID ? "SET" : "MISSING",
			AI_GATEWAY_CLOUD_ID: envVars.AI_GATEWAY_CLOUD_ID ? "SET" : "MISSING",
			AI_GATEWAY_USER_ID: envVars.AI_GATEWAY_USER_ID ? "SET" : "MISSING",
			ASAP_PRIVATE_KEY: key ? "SET" : "MISSING",
		},
		keyDebug: key
			? {
					length: key.length,
					startsWithBegin: key.substring(0, 15),
					hasNewlines: key.includes("\n"),
					hasLiteralBackslashN: key.includes("\\n"),
			  }
			: null,
	};

	res.status(200).json(response);
});
// Serve static files from Next.js export output
const publicPath = path.join(__dirname, "public");
console.log(`[STARTUP] Serving static files from: ${publicPath}`);

// Serve all static files (CSS, JS, images, etc.)
app.use(express.static(publicPath));

// For all other routes, try to serve the corresponding HTML file or fallback to index.html
// This supports Next.js client-side routing
app.get("*", (req, res) => {
	console.log(`[STATIC] Request for route: ${req.path}`);

	// Try to serve index.html for SPA routing
	const indexPath = path.join(publicPath, "index.html");
	res.sendFile(indexPath, (err) => {
		if (err) {
			console.log(`[STATIC] index.html not found at ${indexPath}`);
			// If index.html doesn't exist, return a minimal HTML page
			res.status(200).send(`<!DOCTYPE html>
<html>
<head>
<title>Volt Prototype</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="root">
<h1>AI Prototype Service</h1>
<p>Service is running and ready to serve content.</p>
<p><a href="/healthcheck">Health Check</a></p>
<p><a href="/api/health">API Health Check</a></p>
</div>
</body>
</html>`);
		}
	});
});

console.log("[STARTUP] All routes registered, starting HTTP server...");

const server = app.listen(port, "0.0.0.0", () => {
	console.log(`[STARTUP] ✓ Server listening on 0.0.0.0:${port}`);
	console.log(`\n${"=".repeat(60)}`);
	console.log(`Server ready for connections`);
	console.log("Environment check:");
	console.log(`  PORT: ${port}`);
	console.log(`  AI_GATEWAY_URL: ${process.env.AI_GATEWAY_URL ? "SET" : "MISSING"}`);
	console.log(`  Debug Mode: ${DEBUG}`);

	console.log("\n🔐 Using ASAP Authentication");
	console.log(`  ASAP_ISSUER: ${process.env.ASAP_ISSUER ? "SET" : "MISSING"}`);
	console.log(`  ASAP_KID: ${process.env.ASAP_KID ? "SET" : "MISSING"}`);
	console.log(`  ASAP_PRIVATE_KEY: ${process.env.ASAP_PRIVATE_KEY ? "SET" : "MISSING"}`);
	console.log(`${"=".repeat(60)}\n`);

	if (DEBUG) {
		console.log("[DEBUG MODE ENABLED]");
		console.log("  All debug logs will be printed");
		console.log("  To disable: DEBUG=false\n");
	}
});

// Handle any startup errors
server.on("error", (err) => {
	console.error("Server error:", err);
	process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.error("Uncaught exception:", err);
	process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled rejection at:", promise, "reason:", reason);
	process.exit(1);
});
