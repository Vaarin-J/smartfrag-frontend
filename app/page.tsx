'use client'

import { useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    tl.to(".col", {
      top: "0",
      duration: 3,
      ease: "power4.inOut"
    });

    [1, 2, 3, 4, 5].forEach((_, i) => {
      tl.to(`.c-${i + 1} .item`, {
        top: "0",
        stagger: i % 2 === 0 ? 0.25 : -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4");
    });

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

  const imageGroups = [
    { className: "c-1", images: [1, 2, 3, 4, 5] },
    { className: "c-2", images: [6, 7, 8, 9, 10] },
    { className: "c-3", images: [11, 12, 14, 13, 15] },
    { className: "c-4", images: [1, 2, 3, 4, 5] },
    { className: "c-5", images: [6, 7, 8, 9, 10] },
  ];

  return (
    <>
      <div className="landing-container">
        {imageGroups.map((group, idx) => (
          <div key={idx} className={`col ${group.className}`}>
            {group.images.map(i => (
              <div key={i} className="item">
                <Image src={`/img${i}.jpg`} alt="" width={400} height={600} priority />
              </div>
            ))}
          </div>
        ))}
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

        <footer></footer>
      </div>
    </>
  );
}
