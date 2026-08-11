'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdmissionAidSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/overview/admission-aid', { cache: 'no-store' });
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

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Images Grid */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-3.5 items-center">
          <div className="col-span-6 h-[340px] sm:h-[400px] overflow-hidden rounded-xs">
            <img
              src={data.image1}
              alt="Admission Campus View 1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-6 flex flex-col gap-3.5">
            <div className="h-[162px] sm:h-[191px] overflow-hidden rounded-xs">
              <img
                src={data.image2}
                alt="Admission Campus View 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[162px] sm:h-[191px] overflow-hidden rounded-xs">
              <img
                src={data.image3}
                alt="Admission Campus View 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Text & Links */}
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

          {/* Dynamic Links with Video-Matching Hover Effect */}
          {data.links && data.links.length > 0 && (
            <div className="pt-2 space-y-3">
              {data.links.map((link: { label: string; url: string }, idx: number) => (
                <Link
                  key={idx}
                  href={link.url || '#'}
                  className="flex items-center justify-between bg-white hover:bg-[#ffc107] px-5 py-4 border-b-2 border-[#ffc107] text-[#00873E] hover:text-black font-medium text-base sm:text-lg tracking-tight transition-all duration-200 group shadow-xs"
                >
                  <span className="transition-colors duration-200">
                    {link.label}
                  </span>

                  {/* Icon Swap on Hover */}
                  <div className="relative shrink-0">
                    <ArrowRight
                      size={20}
                      className="text-[#00873E] group-hover:hidden transition-all"
                    />
                    <ArrowUpRight
                      size={20}
                      className="text-black hidden group-hover:block transition-all"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}