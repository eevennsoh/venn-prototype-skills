# Framer Chat Component

This folder contains the Chat component for use in Framer with your AI Gateway backend.

## Setup Instructions

### 1. Start Your Local Development Server

```bash
npm run dev
```

This starts both:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

### 2. Copy the API Endpoint URL

Once the app is running:
1. Open http://localhost:3000 in your browser
2. You'll see an **"API Endpoint for Framer"** section at the top
3. Click the **"Copy"** button to copy the URL: `http://localhost:3000/api/ai-gateway/stream`

### 3. Use in Framer

#### Option A: Framer Code Component
1. In Framer, create a new **Code Component**
2. Copy the contents of `Chat.tsx` into your component
3. In the component properties, paste the API endpoint URL you copied

#### Option B: Framer Code Override
1. Copy `Chat.tsx` to your Framer project's code folder
2. Import and use it in your Framer canvas
3. Set the `apiEndpoint` property to the URL you copied

## API Endpoint Details

- **Local Development**: `http://localhost:3000/api/ai-gateway/stream`
- **Format**: Server-Sent Events (SSE) streaming
- **Method**: POST
- **Payload**: `{ "message": "your message here" }`
- **Response**: Streaming text chunks as `data: {"text":"..."}\n\n`

## How It Works

```
Framer Component (Chat.tsx)
         ↓
         POST to http://localhost:3000/api/ai-gateway/stream
         ↓
Next.js API Route (proxies to backend)
         ↓
Backend Express Server (port 8080)
         ↓
AI Gateway (with ASAP authentication)
         ↓
Streaming response back through the chain
```

## Component Features

- ✅ Real-time streaming responses
- ✅ Message history
- ✅ Loading states with animated dots
- ✅ Error handling
- ✅ Customizable styling via Framer properties
- ✅ Clear chat functionality
- ✅ Keyboard shortcuts (Enter to send)

## Customization

In Framer, you can customize:
- Background color
- Text color
- User message bubble color
- Assistant message bubble color
- Input background
- Border radius
- Padding
- Font size

## Troubleshooting

### "Failed to connect to AI Gateway"
- Make sure `npm run dev` is running
- Check that backend is accessible at http://localhost:8080
- Verify your `.env.local` has all required ASAP credentials

### CORS Errors
- The Next.js frontend acts as a proxy to avoid CORS issues
- Always use `http://localhost:3000/api/ai-gateway/stream` (not port 8080)

### No Response
- Check the browser console for errors
- Verify the API endpoint URL is correct
- Test the backend directly: `curl http://localhost:8080/api/health`

## Development

To test the streaming endpoint directly:

```bash
curl -X POST http://localhost:3000/api/ai-gateway/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

You should see streaming responses in SSE format.

