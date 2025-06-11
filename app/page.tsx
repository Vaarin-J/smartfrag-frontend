"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on client side
    setIsMobile(window.innerWidth <= 768);

    // Wait for all .item img elements to finish loading
    const images = Array.from(document.querySelectorAll(".item img"));
    const imageLoadPromises = images.map((img) => {
      const image = img as HTMLImageElement;
      return image.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve(); // fail-safe
          });
    });

    Promise.all(imageLoadPromises).then(() => {
      const tl = gsap.timeline({ delay: 0 });

      tl.to(".col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut",
      });

      const itemConfig = {
        top: "0",
        duration: 3,
        ease: "power4.inOut",
      };

      tl.to(".c-1 .item", { ...itemConfig, stagger: 0.25 }, "-=2");
      tl.to(".c-2 .item", { ...itemConfig, stagger: -0.25 }, "-=4");
      tl.to(".c-3 .item", { ...itemConfig, stagger: 0.25 }, "-=4");
      tl.to(".c-4 .item", { ...itemConfig, stagger: -0.25 }, "-=4");
      tl.to(".c-5 .item", { ...itemConfig, stagger: 0.25 }, "-=4");

      tl.to(
        ".landing-container",
        {
          scale: 6,
          duration: 4,
          ease: "power4.inOut",
        },
        "-=1.8"
      );

      tl.to(
        ".nav-item a, .title p, .hero-buttons button",
        {
          top: 0,
          opacity: 1,
          stagger: 0.075,
          duration: 1,
          pointerEvents: "auto",
          ease: "power3.out",
        },
        "-=1.5"
      );

      tl.to(
        ".nav-glass-button",
        {
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.5"
      );
    });
  }, []);

  const renderColumn = (className: string, indices: number[]) => (
    <div className={`col ${className}`}>
      {indices.map((i) => (
        <div key={i} className="item">
          <Image
            src={`/img${i}.jpg`}
            alt={`Fragrance ${i}`}
            width={isMobile ? 2400 : 1200}  // higher res only on mobile
            height={isMobile ? 3600 : 1800}
            quality={isMobile ? 90 : 80}    // better quality only on mobile
            loading={isMobile ? "eager" : "eager"} // you can still lazy load if desired
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="landing-container">
        {renderColumn("c-1", [1, 2, 3, 4, 5])}
        {renderColumn("c-2", [6, 7, 8, 9, 10])}
        {renderColumn("c-3", [11, 12, 14, 13, 15])}
        {renderColumn("c-4", [1, 2, 3, 4, 5])}
        {renderColumn("c-5", [6, 7, 8, 9, 10])}
      </div>

      <div className="content">
        <nav className="nav">
          <div className="nav-item">
            <Link href="/">
              <button className="nav-glass-button">Home</button>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/about">
              <button className="nav-glass-button">About</button>
            </Link>
          </div>
        </nav>

        <div className="hero">
          <div className="icon" />
          <div className="title">
            <p>PerfumAi</p>
          </div>
          <div className="icon-2" />
          <div className="hero-buttons">
            <Link href="/login">
              <button className="btn login">Log In</button>
            </Link>
            <Link href="/signup">
              <button className="btn signup">Sign Up</button>
            </Link>
          </div>
        </div>

        <footer />
      </div>
    </>
  );
}
