import { NextResponse } from "next/server";

interface Video {
  snippet: { title: string, channelTitle: string }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();

  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?${params}&key=${process.env.API_KEY}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const validData = {
      items: data.items.filter((video: Video) => (
        video.snippet.title !== 'Private video' 
        && 
        !video.snippet.channelTitle.toLowerCase().endsWith('- topic')
      )),
      nextPageToken: data.nextPageToken
    }
    
    return NextResponse.json(validData, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};