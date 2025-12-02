"use client";
import { useEffect, useState } from "react";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function YouTube() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [logo, setLogo] = useState("");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVideos(data.videos);
          setLogo(data.channelLogo);
        }
      });
  }, []);

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* Channel Logo */}
      <div className="flex items-center gap-3">
  {logo && (
    <img
      src={logo}
      alt="Channel Logo"
      className="w-20 h-20 rounded-full"
    />
  )}

  {/* Subscribe Button */}
  <a
    href={`https://www.youtube.com/channel/UCk_pBB6TriKLB_biEnMo4kg?sub_confirmation=1`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-600 text-white text-sm px-2 py-1 rounded font-semibold hover:text-brand transition-all duration-500"
  >
    Subscribe
  </a>
  </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.videoId} // 🔥 FIXED — unique key
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
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-4xl"
                  onClick={() => setPlayingVideo(video.videoId)}
                >
                  ▶
                </button>
              </>
            )}

            <h3 className="p-2 text-sm font-semibold">{video.title}</h3>

            <p className="px-2 pb-2 text-xs text-gray-500">
              Published: {formatDate(video.publishedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
