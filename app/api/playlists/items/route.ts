import { NextResponse } from "next/server";

interface Video {
  snippet: {
    title: string;
  }
};

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;
    const playlistsIds = params.get('playlistId')?.split(',') || [];

    try {
      if (playlistsIds.length > 1) {
        const playlistPromises = playlistsIds.map(async (id) => {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${id}&maxResults=12&key=${process.env.API_KEY}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          };

          const data = await response.json();
          return data;
        });

        const data = await Promise.all(playlistPromises);

        const validData = data
        .filter(playlist => !playlist.error)
        .map((playlist) => ({
          ...playlist,
          items: playlist.items.filter((video: Video) => video.snippet.title !== 'Private video')
        }));

        return NextResponse.json(validData, { status: 200 });
      } else {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}&key=${process.env.API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        };

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};