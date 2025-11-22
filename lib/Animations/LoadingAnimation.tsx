"use client";

import React, { useRef, useEffect } from "react";

type Props = {
  size?: number;
  duration?: number;
  bgColor?: string;
};


export default function LoadingAnimation({
  size = 40,                // original size
  duration = 2,
  bgColor = "rgb(46,45,45)" // full screen background
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;
    const startTime = performance.now();

    const borderColor = "#aaffaa";
    const fillColor = "rgb(183,255,111)";

    const draw = (time: number) => {
      // Half box size
      const boxSize = size / 2;

      // Full screen canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const elapsed = (time - startTime) / 1000;
      const progress = (elapsed % duration) / duration;

      // Clear canvas with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rotation (0 → 360deg first half)
      const rotate = progress < 0.5 
        ? (progress / 0.5) * 2 * Math.PI
        : 2 * Math.PI;

      // Fill progress (second half)
      let fillProgress = 0;
      if (progress >= 0.5) {
        fillProgress = (progress - 0.5) / 0.5;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotate);

      // Outer box (fixed)
      ctx.fillStyle = "transparent";
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-boxSize/2, -boxSize/2, boxSize, boxSize);
      ctx.fill();
      ctx.stroke();

      // Inner filling top → bottom
      if (fillProgress > 0) {
        ctx.fillStyle = "rgba(183,255,111,0.50)";
        ctx.beginPath();
        ctx.rect(-boxSize/2, -boxSize/2, boxSize, boxSize * fillProgress);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationFrameId);
  }, [size, duration, bgColor]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100vw", height: "100vh" }} />;
}
