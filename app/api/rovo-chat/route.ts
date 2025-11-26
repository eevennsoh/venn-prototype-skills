import { NextRequest, NextResponse } from 'next/server';

/**
 * API proxy route that forwards chat requests to the backend Express server
 * 
 * This route is ONLY used during local development (npm run dev).
 * In production, this route does not exist - the frontend calls the backend directly
 * since they're served from the same domain.
 * 
 * This allows the frontend (running on port 3000) to communicate with the backend
 * (running on port 8080) without CORS issues, since both requests come from the
 * same origin (localhost:3000).
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
        const url = `${backendUrl}/api/rovo-chat`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: 'Backend request failed', details: errorText },
                { status: response.status }
            );
        }

        // Handle streaming response from backend
        if (response.headers.get('content-type')?.includes('text/event-stream')) {
            return new NextResponse(response.body, {
                status: response.status,
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Rovo chat proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
