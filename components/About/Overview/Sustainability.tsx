'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export default function SustainabilitySection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/overview/sustainability', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.length > 0) {
            setData(json.data[0]);
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="w-full bg-[#fcfcfc] relative py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* Left Side: Title, Description & Checklist */}
        <div className="lg:col-span-6 space-y-6">
          {data.title && (
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#00873E] tracking-tight leading-tight">
              {data.title}
            </h2>
          )}

          {data.description && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {data.description}
            </p>
          )}

          {/* Features Checklist */}
          {data.features && data.features.length > 0 && (
            <div className="space-y-4 pt-2">
              {data.features.map(
                (item: { title: string; description: string }, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="text-[#facc15] w-5 h-5 shrink-0 mt-1 stroke-[3]" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <strong className="font-bold text-gray-900">{item.title} – </strong>
                      <span className="text-gray-600 font-normal">{item.description}</span>
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Right Side: Extended Background Banner & Overlapping Images */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px] pt-8 lg:pt-0">
          
          {/* Expanded Full-Width Background Box/Image */}
          {data.bgImage ? (
            <div className="absolute -left-4 -right-8 sm:-left-8 sm:-right-16 top-1/2 -translate-y-1/2 h-[220px] sm:h-[260px] lg:h-[280px] z-0 overflow-hidden">
              <img src={data.bgImage} alt="Background" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="absolute -left-4 -right-8 sm:-left-8 sm:-right-16 top-1/2 -translate-y-1/2 h-[220px] sm:h-[260px] lg:h-[280px] bg-[#bfdcf5] z-0" />
          )}

          {/* Foreground Images Wrapper */}
          <div className="relative z-10 w-full flex items-center justify-center lg:justify-end gap-6 sm:gap-10">
            
            {/* Front Left Image (Student with book - shifted downwards) */}
            {data.image1 && (
              <div className="w-[180px] sm:w-[230px] lg:w-[260px] h-[280px] sm:h-[350px] lg:h-[390px] translate-y-8 sm:translate-y-12 shadow-sm overflow-hidden shrink-0">
                <img
                  src={data.image1}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Back Right Image (Campus building view - shifted upwards) */}
            {data.image2 && (
              <div className="w-[190px] sm:w-[240px] lg:w-[270px] h-[300px] sm:h-[370px] lg:h-[410px] -translate-y-6 sm:-translate-y-10 shadow-sm overflow-hidden shrink-0">
                <img
                  src={data.image2}
                  alt="Campus View"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}