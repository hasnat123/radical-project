import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  
    const url = new URL('http://localhost:8000/api/bestsellers');

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // This tells Next.js to not cache this request
            next: { revalidate: 0 } // This is for Next.js 13+
        });

        if (!res.ok) {
            throw new Error('Failed to load bestsellers.');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }
}