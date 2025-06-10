"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  "/bottles/burberry.jpg",
  "/bottles/naxos.jpg",
  "/bottles/tomford.jpg",
  "/bottles/valetin.jpg",
  "/bottles/aesop.jpg",
  "/bottles/helf.jpg",
];

export default function ImageStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.animate(
      [
        { transform: "translateX(0%)" },
        { transform: "translateX(-50%)" }, // Adjust based on duplication
      ],
      {
        duration: 6000,
        iterations: Infinity,
        easing: "linear",
      }
    );
  }, []);

  return (
    <div className="image-strip-mask">
      <div className="image-track" ref={trackRef}>
        {[...images, ...images].map((src, i) => (
          <div key={i} className="image-container">
            <Image src={src} alt={`bottle-${i}`} width={120} height={150} />
          </div>
        ))}
      </div>
    </div>
  );
}