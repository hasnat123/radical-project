import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
  
    const url = new URL('http://localhost:8000/api/favourites');
    if (query) {
      url.searchParams.set('query', query);
    }

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to load favourites.');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 });
  }
}

export async function POST(request: NextRequest) {

  const { id, title, author } = await request.json();

  // Use the id and body to update data in your backend
  const url = new URL('http://localhost:8000/api/favourites');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({ id, title, author }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    // console.error('Error:', error);
    // return NextResponse.json({ error: 'Failed to toggle favourite' }, { status: 500 });

    try {
      const errorData = JSON.parse(error.message);
      // If successful, it means we received a structured error from the API
      return NextResponse.json(errorData, { status: error.status || 500 });
    } catch {
      // If parsing fails, it means it's not a structured error from the API
      return NextResponse.json({ error: 'Failed to toggle favourite' }, { status: 500 });
    }
  }
}