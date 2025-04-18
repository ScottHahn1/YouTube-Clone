import { NextResponse } from "next/server";

interface Video {
  snippet: {
    title: string;
  }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;

    const playlistsIds = params.get('playlistId')?.split(',') || [];

    try {
      if (playlistsIds.length > 1) {
        const playlistPromises = playlistsIds.map((id) =>
          fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${id}&maxResults=50&key=${process.env.API_KEY}`
          ).then((res) => res.json())
        );

        const data = await Promise.all(playlistPromises);

        const validData = data
        .filter(playlist => !playlist.error)
        .map((playlist) => ({
          ...playlist,
          items: playlist.items.filter((video: Video) => video.snippet.title !== 'Private video')
        }));
    
        return NextResponse.json(validData, { status: 200 });
      } else {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${playlistsIds[0]}&maxResults=20&key=${process.env.API_KEY}`)
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}