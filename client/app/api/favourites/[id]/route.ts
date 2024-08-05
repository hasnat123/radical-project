import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
    const id = params.id;

    const url = new URL(`http://localhost:8000/api/favourites/${id}`);

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to load book details.');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const { price, rating } = await request.json();

  const url = new URL(`http://localhost:8000/api/favourites/${id}`);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({ price, rating }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update favourite' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const id = params.id;

  const url = new URL(`http://localhost:8000/api/favourites/${id}`);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to delete favourite');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete favourite' }, { status: 500 });
  }
}