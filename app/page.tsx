'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    tl.to(".col", {
      top: "0",
      duration: 3,
      ease: "power4.inOut"
    });

    tl.to(".c-1 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=2");

    tl.to(".c-2 .item", {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-3 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-4 .item", {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-5 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".landing-container", {
      scale: 6,
      duration: 4,
      ease: "power4.inOut"
    }, "-=1.8");

    tl.to(".nav-item a, .title p, .hero-buttons button", {
      top: 0,
      opacity: 1,
      stagger: 0.075,
      duration: 1,
      pointerEvents: "auto",
      ease: "power3.out",
    }, "-=1.5");
  }, []);

  const renderColumn = (className: string, indices: number[]) => (
    <div className={`col ${className}`}>
      {indices.map(i => (
        <div key={i} className="item">
          <Image
            src={`/img${i}.jpg`}
            alt={`Fragrance ${i}`}
            width={1200}
            height={1800}
            quality={100}
            unoptimized
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
        <nav>
          <div className="nav-item">
            <Link href="/" id="active">Home</Link>
          </div>
          <div className="nav-item">
            <Link href="/about">About</Link>
          </div>
        </nav>

        <div className="hero">
          <div className="icon" />
          <div className="title"><p>PerfumAi</p></div>
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
