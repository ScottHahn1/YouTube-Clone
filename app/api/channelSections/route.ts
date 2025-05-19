import { NextResponse } from "next/server";

interface ChannelSections {
  contentDetails: {
    channels: string[];
    playlists: string[];
  },
  snippet: {
    type: string;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;

  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channelSections?${params}&key=${process.env.API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const filteredData = data.items.filter((section: ChannelSections) => {
      return section.snippet.type !== 'channelsectiontypeundefined' && 
      section.contentDetails &&
      section.contentDetails.playlists
    });

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};