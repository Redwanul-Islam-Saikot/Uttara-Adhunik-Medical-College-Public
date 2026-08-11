'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function MedicalEducationUnit() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/facilities/me-unit', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setData(Array.isArray(json.data) ? json.data[0] : json.data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="bg-white py-16 px-4 md:px-8">
      {/* Container Size increased to w-[95%] */}
      <div className="w-[95%] max-w-[1500px] mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 flex items-center gap-6">
            {data.logo && (
              <img src={data.logo} alt="Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            )}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-[#00873E] font-bold">{data.titlePrefix}</h2>
              <h2 className="text-4xl md:text-5xl font-serif text-[#00873E] font-bold">{data.titleHighlight}</h2>
            </div>
          </div>
          <div className="md:col-span-7 space-y-3">
            <p className="text-xl font-bold text-gray-900">{data.subTitle}</p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">{data.description}</p>
          </div>
        </div>

        {/* Main Banner Image */}
        {data.mainImage && (
          <div className="w-full h-[450px] rounded-xl overflow-hidden mb-16">
            <img src={data.mainImage} alt="Banner" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Sub-Sections Rendering */}
        {data.subSections?.map((section: any, sIdx: number) => {
          const items = section.items || [];
          const isAcademicDatabase = section.sectionTitle?.toLowerCase().includes('database') || section.sectionTitle?.toLowerCase().includes('academic');

          // 1. Academic Databases Layout
          if (isAcademicDatabase) {
            const firstItem = items[0];
            const remainingItems = items.slice(1);

            return (
              <div key={sIdx} className="space-y-8 mb-20">
                {section.sectionTitle && (
                  <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 tracking-tight mb-10">
                    {section.sectionTitle}
                  </h3>
                )}

                {/* 1st Full-width Card */}
                {firstItem && (
                  <div className="bg-[#EAF3EC] px-8 py-7 rounded-none flex items-center justify-between gap-6">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      <strong className="font-bold text-gray-900">{firstItem.title}</strong>
                      {firstItem.description ? `: ${firstItem.description}` : ''}
                    </p>
                    <div className="bg-white p-3 rounded-xs shrink-0 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-[#00873E]" />
                    </div>
                  </div>
                )}

                {/* Gap as per screenshot */}
                {remainingItems.length > 0 && <div className="h-12"></div>}

                {/* Remaining 3 Cards in 2-column Grid */}
                {remainingItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {remainingItems.map((item: any, iIdx: number) => (
                      <div
                        key={iIdx}
                        className="bg-[#EAF3EC] px-8 py-7 rounded-none flex items-center justify-between gap-4"
                      >
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                          <strong className="font-bold text-gray-900">{item.title}</strong>
                          {item.description ? `: ${item.description}` : ''}
                        </p>
                        <div className="bg-white p-3 rounded-xs shrink-0 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-[#00873E]" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // 2. Normal Layout (Facilities & Resources etc.)
          return (
            <div key={sIdx} className="space-y-8 mb-20">
              {section.sectionTitle && (
                <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 tracking-tight mb-10">
                  {section.sectionTitle}
                </h3>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item: any, iIdx: number) => (
                  <div
                    key={iIdx}
                    className="bg-[#EAF3EC] px-8 py-7 rounded-none flex items-center justify-between gap-4"
                  >
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      <strong className="font-bold text-gray-900">{item.title}</strong>
                      {item.description ? `: ${item.description}` : ''}
                    </p>
                    <div className="bg-white p-3 rounded-xs shrink-0 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-[#00873E]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer Note */}
        {data.footerNote && (
          <p className="text-center text-xl text-gray-500 italic pt-8">{data.footerNote}</p>
        )}
      </div>
    </section>
  );
}