"use client";
import { useEffect, useState } from "react";

export default function BdcPress() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelLogo, setChannelLogo] = useState("");
  const [channelId, setChannelId] = useState("");
  const [playing, setPlaying] = useState<string | null>(null); // 🔥 নতুন state (কোন ভিডিও প্লে হচ্ছে)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        const data = await res.json();

        setVideos(data.videos || []);
        setChannelLogo(data.channelLogo || "");
        setChannelId(data.channelId || "");
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (!videos.length) return <p>No videos found.</p>;

  return (
    <div className="w-full">
      {/* Top Channel Info */}
      <div className="flex items-center gap-3 mb-4">
        {channelLogo && (
          <img
            src={channelLogo}
            className="w-12 h-12 rounded-full border shadow"
            alt="channel logo"
          />
        )}
              <a
                href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
                target="_blank"
                className="text-xs px-2 py-1 bg-red-600 text-white rounded"
              >
                Subscribe
              </a>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border rounded-lg overflow-hidden shadow bg-foreground">
            
            {/* ------- Thumbnail OR Player ------- */}
            <div className="relative">
              {playing === video.id ? (
                /* ---- Inline Iframe Player ---- */
                <iframe
                  className="w-full h-40 sm:h-44 lg:h-48"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                />
              ) : (
                /* ---- Thumbnail with Play button ---- */
                <div
                  onClick={() => setPlaying(video.id)}
                  className="relative cursor-pointer"
                >
                  <img src={video.thumbnail} className="w-full" alt={video.title} />

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title + Subscribe */}
            <div className="flex justify-between items-start p-2 gap-2">
              <p className="font-semibold text-background text-sm line-clamp-2 w-[70%]">
                {video.title}
              </p>


            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
