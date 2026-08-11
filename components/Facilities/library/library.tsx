'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

export default function LibrarySection() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/api/facilities/library', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setData(json.data[0]);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(null);
      }
    };

    getData();
  }, []);

  if (!data) return null;

  return (
    <section className="bg-[#EBF7F0] py-12 px-4 md:px-8">
      {/* Container width set to 95% */}
      <div className="w-[95%] mx-auto space-y-10">
        
        {/* Top Header Badge (Increased text size) */}
        <div className="flex justify-center items-center">
          <div className="bg-[#D3EBDC] px-8 py-3 rounded-md inline-flex items-center gap-8 text-sm md:text-base text-gray-800">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#00873E] fill-[#00873E]/20" />
              <span>
                <strong>Open:</strong> {data.openHours}
              </span>
            </div>
            
            <div className="h-5 w-[1px] bg-gray-400/60"></div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#00873E] fill-[#00873E]/20" />
              <span>
                <strong>Days:</strong> {data.studyAreas}
              </span>
            </div>
          </div>
        </div>

        {/* Content Header Grid (Increased title & text size) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* SVG Icon + Larger Title */}
          <div className="md:col-span-5 flex items-center gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Top Layers */}
                <path d="M 25 22 Q 50 15 75 22 L 70 30 Q 50 25 30 30 Z" fill="#CBEADA" />
                <path d="M 20 32 Q 50 25 80 32 L 76 42 Q 50 36 24 42 Z" fill="#78C697" />
                {/* Main Cabinet */}
                <path d="M 12 44 Q 50 37 88 44 L 80 88 Q 50 92 20 88 Z" fill="#00873E" />
                {/* Drawer Handle */}
                <rect x="36" y="72" width="28" height="6" rx="3" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight leading-none">
                {data.titlePrefix}
              </h2>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#00873E] tracking-tight leading-none mt-1.5">
                {data.titleHighlight}
              </h2>
            </div>
          </div>

          {/* Larger Descriptions */}
          <div className="md:col-span-7 space-y-3">
            <p className="text-base md:text-lg font-bold text-gray-900 leading-snug">
              {data.boldDescription}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {data.normalDescription}
            </p>
          </div>
        </div>

        {/* Main Image */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[480px] rounded-xl overflow-hidden shadow-md border border-white">
          <img src={data.image} alt="Library Hall" className="w-full h-full object-cover" />
        </div>

        {/* Counters (Increased size) */}
        <div className="flex justify-center items-center gap-10 md:gap-20 pt-3">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00873E]">{data.totalBooks}</h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">Printed & E-Books</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-300"></div>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00873E]">{data.totalJournals}</h3>
            <p className="text-sm font-semibold text-gray-700 mt-1">A-To-Z Journal Access</p>
          </div>
        </div>

        {/* Bottom Note */}
        {data.bottomNote && (
          <p className="text-center text-xs md:text-sm text-gray-500 italic pt-2">
            {data.bottomNote}
          </p>
        )}
      </div>
    </section>
  );
}