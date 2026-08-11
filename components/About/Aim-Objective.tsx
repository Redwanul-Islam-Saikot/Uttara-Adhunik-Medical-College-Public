'use client';

import React, { useEffect, useState } from 'react';

interface Category {
  title: string;
  points: string[];
}

interface AimObjectiveData {
  _id: string;
  aimTitle: string;
  aimDescription: string;
  objectiveTitle: string;
  imageUrl: string;
  categories: Category[];
  footerText: string;
}

export default function AimObjectiveSection() {
  const [data, setData] = useState<AimObjectiveData | null>(null);

  useEffect(() => {
    fetch('/api/about/aim-objective')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data && resData.data.length > 0) {
          setData(resData.data[0]);
        } else {
          setData(null);
        }
      })
      .catch(() => setData(null));
  }, []);

  if (!data) return null;

  const topCategories = data.categories ? data.categories.slice(0, 3) : [];
  const bottomCategories = data.categories ? data.categories.slice(3) : [];

  return (
    <section className="w-full bg-[#EBF4EC] py-12 px-2 sm:px-6 lg:px-10 font-sans text-gray-800">
      <div className="max-w-[95%] 2xl:max-w-[1500px] mx-auto space-y-10">
        
        {/* 1. Aim Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3 lg:col-span-3">
            <div className="inline-flex items-end gap-1.5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide">
                {data.aimTitle}
              </h2>
              <span className="w-24 sm:w-36 h-[2px] bg-gray-900 mb-1.5 inline-block"></span>
            </div>
          </div>
          <div className="md:col-span-9 lg:col-span-9">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">
              {data.aimDescription}
            </p>
          </div>
        </div>

        {/* 2. Banner Image & Overflowing Yellow Objective Box */}
        <div className="relative w-full pr-8 sm:pr-16 md:pr-24">
          <div className="relative w-full h-64 sm:h-96 md:h-[420px] rounded-none overflow-hidden shadow-sm">
            <img 
              src={data.imageUrl} 
              alt="Aim and Objective Banner" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Objective Badge with Side Underline */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFCB05] z-10 px-6 py-6 sm:px-12 sm:py-10 shadow-md flex items-center justify-center">
            <div className="inline-flex items-end gap-2">
              <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
                {data.objectiveTitle}
              </h3>
              <span className="w-24 sm:w-32 h-[2px] bg-gray-900 mb-1.5 inline-block"></span>
            </div>
          </div>
        </div>

        {/* 3. Objective Categories inside a Dedicated Light Green Box */}
        <div className="bg-[#D8EAD9] p-6 sm:p-10 lg:p-12 rounded-sm space-y-12 shadow-sm">
          
          {/* Top Row: Up to 3 Categories */}
          {topCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {topCategories.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-sm sm:text-base font-bold text-[#00873E] border-b border-gray-400 pb-1.5">
                    {cat.title}
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    {cat.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-gray-900 mt-1 text-[8px]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Row: 2 Categories */}
          {bottomCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-2">
              {bottomCategories.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-sm sm:text-base font-bold text-[#00873E] border-b border-gray-400 pb-1.5">
                    {cat.title}
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    {cat.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-gray-900 mt-1 text-[8px]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Footer Note Inside Box */}
          {data.footerText && (
            <div className="pt-6 text-center border-t border-gray-300/60">
              <p className="text-xs sm:text-sm text-gray-800 font-medium max-w-5xl mx-auto leading-relaxed">
                {data.footerText}
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}