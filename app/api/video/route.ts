import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();

  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?${params}&key=${process.env.API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json(data.items[0], { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}