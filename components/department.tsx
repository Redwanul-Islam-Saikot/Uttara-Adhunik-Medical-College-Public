'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function FindDepartmentSection() {
  const [data, setData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/department-section', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const item = Array.isArray(json.data) ? json.data[0] : json.data;
            setData(item);
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
    fetchData();
  }, []);

  if (!data) return null;

  const popularTags = Array.isArray(data.popularSearchTags)
    ? data.popularSearchTags
    : data.popularSearchTags?.split(',').map((t: string) => t.trim()) || [];

  // Model key handle (badgeIconUrl othoba badgeLogo pathaleo kaaj korbe)
  const badgeLogoSrc = data.badgeIconUrl || data.badgeLogo;

  return (
    <section className="w-full bg-[#f4f6f8] relative py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end relative z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-7">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#008751] tracking-tight leading-tight">
            {data.title}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
            {data.description}
          </p>

          {/* Search Box */}
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#008751]" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={data.searchPlaceholder}
              className="w-full bg-[#eaedfa] text-slate-800 text-base py-4 sm:py-5 pl-14 pr-6 outline-none border border-transparent focus:border-[#008751] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Popular Search Tags with Underline Border */}
          {popularTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
              <span className="font-bold text-[#008751]">Popular Search:</span>
              {popularTags.map((tag: string, idx: number) => (
                <span key={idx} className="inline-flex items-center">
                  <span className="cursor-pointer underline underline-offset-4 decoration-gray-400 hover:decoration-[#008751] text-gray-600 transition-colors">
                    {tag}
                  </span>
                  {idx !== popularTags.length - 1 && <span className="ml-2 mr-1"> </span>}
                </span>
              ))}
            </div>
          )}

          {/* Popular Program Card */}
          <div className="pt-2">
            <div className="border border-dashed border-[#008751]/80 bg-[#e6f2eb] p-4 sm:p-5 flex items-center justify-between max-w-2xl">
              <div className="flex items-center gap-4 sm:gap-5">
                <img
                  src={data.popularProgramImage}
                  alt={data.popularProgramTitle}
                  className="w-20 h-16 sm:w-24 sm:h-18 object-cover shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="inline-block bg-[#ffc107] text-black text-xs font-bold px-2.5 py-1">
                    Popular Program
                  </span>
                  <h4 className="font-bold text-[#008751] text-lg sm:text-xl leading-tight">
                    {data.popularProgramTitle}
                  </h4>
                </div>
              </div>

              <Link
                href={data.popularProgramLink || '#'}
                className="bg-[#008751] hover:bg-[#007043] text-white p-3.5 sm:p-4 transition-colors shrink-0 ml-3"
              >
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side Layout */}
        <div className="lg:col-span-5 relative grid grid-cols-2 gap-5 items-start">
          
          {/* Upper Left Image */}
          <div className="col-span-1 h-[250px] sm:h-[280px] lg:h-[300px] overflow-hidden">
            <img
              src={data.imageRight1}
              alt="Department Top"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Tall Image */}
          <div className="col-span-1 h-[380px] sm:h-[430px] lg:h-[460px] overflow-hidden">
            <img
              src={data.imageRight2}
              alt="Department Side"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Green Badge Box with Dynamic Badge Logo */}
          <div className="absolute bottom-[45px] sm:bottom-[50px] left-0 z-20 w-[72%] bg-[#68ba90] text-white p-4 sm:p-5 flex items-center gap-4 shadow-lg">
            <div className="relative shrink-0 w-13 h-13 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center border border-white/20 overflow-hidden p-2">
              {badgeLogoSrc ? (
                <img
                  src={badgeLogoSrc}
                  alt="Badge Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <GraduationCap size={28} className="text-amber-300" />
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rotate-45" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-none">
                {data.badgeValue}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/95 leading-tight mt-1.5">
                {data.badgeLabel}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}