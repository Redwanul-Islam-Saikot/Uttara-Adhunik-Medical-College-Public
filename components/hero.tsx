'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function DynamicHeroSection() {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function getHeroData() {
      try {
        const res = await fetch('/api/hero', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setHeroSlides(json.data);
          }
        }
      } catch (err) {
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    }

    getHeroData();
  }, []);

  // ৩ সেকেন্ড পরপর স্লাইড পরিবর্তন
  useEffect(() => {
    if (heroSlides.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [heroSlides, isHovered]);

  if (loading) {
    return (
      <div className="h-[90vh] bg-gray-950 flex items-center justify-center text-white/50 text-sm font-medium">
        Loading Hero Data...
      </div>
    );
  }

  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  const activeSlide = heroSlides[currentIndex];

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[90vh] lg:h-[92vh] flex flex-col justify-between text-white overflow-hidden bg-gray-950 font-sans selection:bg-amber-400 selection:text-black"
    >
      
      {/* 1. Dynamic Background Image with Fast 300ms Fade */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide._id || slide.id || idx}
          className={`absolute inset-0 z-0 transition-opacity duration-300 ease-in-out ${
            idx === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.bgImage && (
            <img
              src={slide.bgImage}
              alt="Hero Background"
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Subtle Green & Dark Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#005a2b]/85 via-[#00381b]/45 to-black/35" />
        </div>
      ))}

      {/* 2. Top Navigation Bar (PREV | 01 | 02 ... | NEXT) */}
      {heroSlides.length > 1 && (
        <div className="relative z-20 pt-8 px-4 sm:px-8 lg:px-12 max-w-[1536px] mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-300">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
            }
            className="hover:text-amber-400 transition-colors duration-200 uppercase py-1"
          >
            PREV
          </button>

          <div className="flex items-center gap-3 sm:gap-5">
            {heroSlides.map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-200 py-1 ${
                    currentIndex === idx
                      ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5'
                      : 'text-gray-300 hover:text-white opacity-80'
                  }`}
                >
                  {`0${idx + 1}`}
                </button>
                {idx !== heroSlides.length - 1 && (
                  <span className="text-white/30 text-xs font-normal">|</span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
            }
            className="hover:text-amber-400 transition-colors duration-200 uppercase py-1"
          >
            NEXT
          </button>
        </div>
      )}

      {/* Flexible Spacer */}
      <div className="flex-1" />

      {/* 3. Glassmorphism Hero Box Container (Wider & Expanded) */}
      <div className="relative z-10 w-full pb-8 lg:pb-12 px-3 sm:px-6 lg:px-10">
        <div className="max-w-[1536px] mx-auto bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 lg:p-12 xl:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end shadow-2xl">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            {activeSlide.tagline && (
              <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium tracking-wide">
                <GraduationCap size={18} className="text-white/90 shrink-0" />
                <span>{activeSlide.tagline}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-normal leading-[1.12] text-white">
              {activeSlide.titleWhite1}{' '}
              {activeSlide.titleYellow && (
                <span className="text-[#FFC107] font-serif italic font-normal">
                  {activeSlide.titleYellow}
                </span>
              )}
              {activeSlide.titleWhite2 && `${activeSlide.titleYellow ? ',' : ''} ${activeSlide.titleWhite2}`}
            </h1>

            {activeSlide.buttonText && (
              <div className="pt-2">
                <Link
                  href={activeSlide.buttonLink || '#'}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#006e3b] font-bold text-xs sm:text-sm rounded hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-xl"
                >
                  <span>{activeSlide.buttonText}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>

          {/* Right Degrees / Programs */}
          {activeSlide.programs && activeSlide.programs.length > 0 && (
            <div className="lg:col-span-5 xl:col-span-4 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
              {activeSlide.programSectionTitle && (
                <h3 className="text-amber-400 font-serif text-xl sm:text-2xl font-bold tracking-wide">
                  {activeSlide.programSectionTitle}
                </h3>
              )}

              <div className="space-y-5">
                {activeSlide.programs.map((prog: any, idx: number) => (
                  <div key={idx} className="group cursor-pointer space-y-1">
                    <div className="flex items-center justify-between text-white font-serif font-medium text-base sm:text-lg group-hover:text-amber-400 transition-colors">
                      <h4>{prog.title}</h4>
                      <ArrowRight
                        size={16}
                        className="text-white/80 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2"
                      />
                    </div>
                    {prog.description && (
                      <p className="text-xs text-gray-200/80 leading-relaxed font-sans line-clamp-2">
                        {prog.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}