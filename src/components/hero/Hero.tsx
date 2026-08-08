'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { HeroIntro } from './HeroIntro';

/**
 * Hero — full-bleed first impression.
 *
 * Layout:
 * - Background (full viewport): a cinematic reveal — the person slides in from the left,
 *   settling on the right. This represents "Pranav entering the scene."
 * - Foreground (overlaid, left side): intro text, name, CTA.
 *
 * When a photo exists at /public/pranav.jpg, it fills the right background.
 * The gradient mask ensures text on the left is always readable.
 */
export function Hero() {
  const [automated, setAutomated] = useState(false);
  const [toggleReady, setToggleReady] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FAF6EE' }}
    >
      {/* ── Background: video with rounded margins ───────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">

        {/* Video — fills full area, edges blended with gradients, no hard clip */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            playsInline
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= 7) setToggleReady(true);
            }}
            onEnded={() => setToggleReady(true)}
            className="absolute inset-0 w-full h-full object-cover object-[100%_top]"
          >
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>

          <Image
            src="/toggle-bg.png"
            alt=""
            fill
            priority
            unoptimized
            aria-hidden="true"
            className={`object-cover object-[100%_top] transition-opacity duration-700 ${automated ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Very light tint — 5% so video reads at ~95% opacity */}
          <div className="absolute inset-0 bg-[#FAF6EE]/05" />

          {/* Left — strong fade for text readability */}
          <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/70 to-transparent" />
          {/* Right — wide soft blend */}
          <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-[#FAF6EE] via-[#FAF6EE]/60 to-transparent" />
          {/* Top — subtle blend, doesn't cut into head */}
          <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-[#FAF6EE] to-transparent" />
          {/* Bottom — wide soft blend */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FAF6EE] via-[#FAF6EE]/50 to-transparent" />
        </div>

        {/* Paper grain overlay on top of everything */}
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
          }}
        />
      </div>

      {/* ── Foreground: intro text — overlaid on the left ────────────── */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center py-20 lg:py-0 lg:pl-32 xl:pl-32">
        <div className="w-full max-w-xl lg:max-w-2xl">
          <HeroIntro
            automated={automated}
            showAutomationToggle={toggleReady}
            onAutomationChange={setAutomated}
          />
        </div>
      </Container>
    </section>
  );
}
