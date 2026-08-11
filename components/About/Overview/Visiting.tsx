'use client';

import { useState, useEffect } from 'react';
import { Phone, ArrowRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function VisitingSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/overview/visiting', { cache: 'no-store' });
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

  // Model key handle (badgeIconUrl, badgeLogo, or icon)
  const badgeLogoSrc = data.badgeLogo || data.badgeIconUrl;

  const hasLeftContent =
    data.title || data.paragraph1 || data.paragraph2 || data.phone || data.buttonText;
  const hasRightContent =
    data.image1 || data.image2 || data.departmentCount || badgeLogoSrc;

  if (!hasLeftContent && !hasRightContent) return null;

  return (
    <section className="w-full bg-[#f4f6f8] relative py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* Left Side Content */}
        {hasLeftContent && (
          <div className="lg:col-span-7 space-y-7">
            {data.title && (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#008751] tracking-tight leading-tight">
                {data.title}
              </h2>
            )}

            {data.paragraph1 && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                {data.paragraph1}
              </p>
            )}

            {data.paragraph2 && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                {data.paragraph2}
              </p>
            )}

            {/* Phone Call Info Card */}
            {data.phone && (
              <div className="flex items-center gap-4 pt-2">
                <div className="w-14 h-14 bg-[#008751] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#008751] tracking-tight">
                    {data.phone}
                  </p>
                  {data.phoneSubtext && (
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {data.phoneSubtext}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Call to Action Button */}
            {data.buttonText && (
              <div className="pt-3">
                <Link
                  href={data.buttonUrl || '#'}
                  className="inline-flex items-center gap-3 bg-[#008751] hover:bg-[#007043] text-white font-medium text-base px-7 py-4 rounded-none transition-colors shadow-sm"
                >
                  {data.buttonText} <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Right Side Layout (Identical to FindDepartmentSection) */}
        {hasRightContent && (
          <div className="lg:col-span-5 relative grid grid-cols-2 gap-5 items-start">
            
            {/* Upper Left Image */}
            <div className="col-span-1 h-[250px] sm:h-[280px] lg:h-[300px] overflow-hidden">
              <img
                src={data.image1}
                alt="Visiting Main"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Tall Image */}
            <div className="col-span-1 h-[380px] sm:h-[430px] lg:h-[460px] overflow-hidden">
              <img
                src={data.image2}
                alt="Visiting Secondary"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Green Badge Box with Dynamic Badge Logo */}
            {(data.departmentCount || data.departmentSubtext || badgeLogoSrc) && (
              <div className="absolute bottom-[45px] sm:bottom-[50px] left-0 z-20 w-[72%] bg-[#68ba90] text-white p-4 sm:p-5 flex items-center gap-4 shadow-lg">
                
                {/* Badge Logo Container */}
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

                {/* Badge Value and Label */}
                <div>
                  {data.departmentCount && (
                    <h3 className="text-3xl sm:text-4xl font-black text-white leading-none">
                      {data.departmentCount}
                    </h3>
                  )}
                  {data.departmentSubtext && (
                    <p className="text-xs sm:text-sm font-medium text-white/95 leading-tight mt-1.5">
                      {data.departmentSubtext}
                    </p>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}