import { NextResponse } from "next/server";

const CHANNEL_ID = "UCk_pBB6TriKLB_biEnMo4kg"; // BDC PRESS
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing API KEY" },
      { status: 500 }
    );
  }

  try {
    // ----------------------------------------------------
    // 1️⃣ Get Latest Videos (Uploads + Live)
    // ----------------------------------------------------
    const searchURL =
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=20`;

    const searchRes = await fetch(searchURL);
    const searchData = await searchRes.json();

    if (!searchData.items) {
      return NextResponse.json(
        { error: "Invalid YouTube search response" },
        { status: 500 }
      );
    }

    const videos = searchData.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url,
      publishedAt: item.snippet.publishedAt,
      liveStatus:
        item.snippet.liveBroadcastContent === "live"
          ? "live"
          : item.snippet.liveBroadcastContent === "upcoming"
          ? "upcoming"
          : "none",
    }));

    // ----------------------------------------------------
    // 2️⃣ Get Channel Logo
    // ----------------------------------------------------
    const channelURL =
      `https://www.googleapis.com/youtube/v3/channels?` +
      `part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`;

    const channelRes = await fetch(channelURL);
    const channelData = await channelRes.json();

    const channelLogo =
      channelData?.items?.[0]?.snippet?.thumbnails?.default?.url || "";

    return NextResponse.json({
      videos,
      channelLogo,
    });
  } catch (error) {
    console.error("YouTube API failed:", error);
    return NextResponse.json({ error: "YouTube API failed" }, { status: 500 });
  }
}
