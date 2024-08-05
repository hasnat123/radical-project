import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
  
    const url = new URL('http://localhost:8000/api/bestsellers/search');
    if (query) {
      url.searchParams.set('query', query);
    }

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      }
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