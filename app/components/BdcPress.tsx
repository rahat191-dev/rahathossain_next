"use client";

import { useState } from "react";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  liveStatus: "live" | "upcoming" | "none"; // <-- ADD THIS
}

interface DbcPressProps {
  initialVideos?: Video[];
  channelLogo?: string;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BdcPress({
  initialVideos = [],
  channelLogo = "",
}: DbcPressProps) {
  // -------------------------------
  // SORT LIVE → UPCOMING → NORMAL → DATE
  // -------------------------------
  const sortedVideos = [...initialVideos].sort((a, b) => {
    const order = { live: 0, upcoming: 1, none: 2 };

    // Sort live status first
    const liveSort = order[a.liveStatus] - order[b.liveStatus];
    if (liveSort !== 0) return liveSort;

    // If both are same (both live / both normal), sort by latest date
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const [videos] = useState<Video[]>(sortedVideos);
  const [logo] = useState(channelLogo);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <main className="text-pg text-base">
      <div className="flex gap-1 mb-4 pb-2 font-extrabold items-center border-pg border-b">
        <img className="w-8" src={"/images/svg/media/yt.svg"} />
        <h3 className="font-extrabold">BDC PRESS</h3>
      </div>

      <div className="flex flex-col p-4 gap-4">
        <div className="flex items-center gap-3">
          {logo && (
            <img src={logo} alt="Channel Logo" className="w-20 h-20 rounded-full" />
          )}
          <a
            href="https://www.youtube.com/channel/UCk_pBB6TriKLB_biEnMo4kg?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white text-sm px-2 py-1 rounded font-semibold hover:text-brand transition-all duration-500"
          >
            Subscribe
          </a>
        </div>

        {/* Video Grid */}
        {videos?.length === 0 ? (
          <p className="text-gray-500">No videos available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {videos?.map((video) => (
              <div
                key={video.videoId}
                className="relative rounded-lg overflow-hidden shadow"
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

                    {/* Live Badge */}
                    {video.liveStatus === "live" && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        LIVE
                      </span>
                    )}
                  </>
                )}

                <h3 className="p-2 text-sm font-semibold">{video.title}</h3>
                <p className="px-2 pb-2 text-xs text-gray-500">
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
