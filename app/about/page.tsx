'use client';
import Image from 'next/image';
import Link from "next/link";



export default function AboutPage() {
 
  return (
    <div> 
      <nav className="nav nav-about nav-dark">
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

      <div className="about-wrapper">
        <div className="about-section">
          <h1 className="about-title">About PerfumAi</h1>

          <p className="about-paragraph">
            PerfumAi is your personal AI-powered fragrance companion. Discover the perfect scent tailored to your preferences using our advanced AI models trained on thousands of perfumes and olfactory profiles.
          </p>

          <p className="about-paragraph">
            Whether you&apos;re searching for a signature scent, exploring new styles, or shopping for a gift, PerfumAi helps you match fragrances by mood, ingredients, and even your own words.
          </p>

          <div className="about-images">
            <div className="image-box">
              <Image src="/img7.jpg" alt="Smart matching" width={500} height={350} className="image" />
              <p className="image-caption">AI Scent Matching Visualization</p>
            </div>
            <div className="image-box">
              <Image src="/img1.jpg" alt="Flow" width={500} height={350} className="image" />
              <p className="image-caption">Recommendation Engine Flow</p>
            </div>
          </div>

          <p className="about-footer">Built for enthusiasts, curated for discovery.</p>
        </div>
      </div>
    </div>
  );
}
