import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { success: false, error: "API keys missing" },
      { status: 500 }
    );
  }

  try {
    // -----------------------------
    // 1) Fetch Channel Details
    // -----------------------------
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      return NextResponse.json(
        { success: false, error: "Channel not found" },
        { status: 404 }
      );
    }

    const channelLogo =
      channelData.items[0].snippet.thumbnails.medium.url || "";

    // -----------------------------
    // 2) Fetch Videos (latest 10)
    // -----------------------------
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );
    const videoData = await videoRes.json();

    const videos = videoData.items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,

        // ⭐ ADD LIVE STATUS
        liveStatus: item.snippet.liveBroadcastContent, // "live" | "upcoming" | "none"
      }));

    return NextResponse.json({
      success: true,
      channelLogo,
      videos,
    });
  } catch (err) {
    console.error("YouTube API ERROR:", err);
    return NextResponse.json(
      { success: false, error: "YouTube fetch failed" },
      { status: 500 }
    );
  }
}
