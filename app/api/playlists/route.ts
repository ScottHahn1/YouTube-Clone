import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?${params}&key=${process.env.API_KEY}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}