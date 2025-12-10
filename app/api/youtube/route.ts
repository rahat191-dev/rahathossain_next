import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CHANNEL_ID = "UCPmAACUzyE1HyOlEvOrWWRw";

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const rss = await fetch(feedUrl);
    const xmlText = await rss.text();

    // XML → JSON Convert
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const entries = xml.getElementsByTagName("entry");
    const videos: any[] = [];

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];

      const title = e.getElementsByTagName("title")[0]?.textContent || "";
      const videoId =
        e.getElementsByTagName("yt:videoId")[0]?.textContent || "";

      videos.push({ title, "yt:videoId": videoId });
    }

    return NextResponse.json({ feed: { entry: videos } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch YouTube feed", details: String(error) },
      { status: 500 }
    );
  }
}
