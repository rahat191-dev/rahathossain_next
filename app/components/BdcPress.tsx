"use client";

import { useState, useEffect } from "react";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  liveStatus: "live" | "upcoming" | "none";
}

export default function BdcPress() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [channelLogo, setChannelLogo] = useState<string>("");

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // -------------------------------
  // Fetch YouTube API data
  // -------------------------------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) {
          console.error("API Error:", res.status);
          return;
        }

        const data = await res.json();
        setVideos(data.videos || []);
        setChannelLogo(data.channelLogo || "");
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="text-white text-base">
      {/* Header */}
      <div className="flex gap-1 mb-4 pb-2 font-extrabold items-center border-b border-gray-600">
        <img className="w-8" src={"/images/svg/media/yt.svg"} alt="YT Logo" />
        <h3 className="font-extrabold text-lg">BDC PRESS</h3>
      </div>

      <div className="flex flex-col p-4 gap-4">
        {/* Channel Logo + Subscribe */}
        <div className="flex items-center gap-3">
          {channelLogo && (
            <img
              src={channelLogo}
              alt="Channel Logo"
              className="w-20 h-20 rounded-full"
            />
          )}
          <a
            href="https://www.youtube.com/channel/UCk_pBB6TriKLB_biEnMo4kg?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white text-sm px-3 py-1 rounded font-semibold hover:text-brand transition-all duration-500"
          >
            Subscribe
          </a>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className="relative rounded-lg overflow-hidden shadow-lg bg-[#1c1c1c]"
              >
                {playingVideo === video.videoId ? (
                  <iframe
                    className="w-full h-[180px]"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={video.thumbnail} alt={video.title} className="w-full" />

                    {/* Play Button */}
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-4xl"
                      onClick={() => setPlayingVideo(video.videoId)}
                    >
                      ▶
                    </button>

                    {/* Live / Upcoming Badge */}
                    {video.liveStatus === "live" && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        Live
                      </span>
                    )}
                    {video.liveStatus === "upcoming" && (
                      <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                        Upcoming
                      </span>
                    )}
                  </>
                )}

                {/* Title + Date */}
                <h3 className="p-2 text-sm font-semibold">{video.title}</h3>
                <p className="px-2 pb-2 text-xs text-gray-400">
                  Published: {formatDate(video.publishedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
