'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ReusableFacilityView({ slug }: { slug: string }) {
  const [data, setData] = useState<any | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch(`/api/facilities/reusable?slug=${slug}`, { cache: 'no-store' });
      if (!res.ok) return;

      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error('Error fetching facility data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const hasImage1 = Boolean(data?.image1?.trim());
  const hasImage2 = Boolean(data?.image2?.trim());

  return (
    <section className="bg-white py-12 w-full overflow-hidden">
      {data && (
        <div className="w-full space-y-16">
          
          {/* Top Green Hero Card Container (Full Screen / Edge-to-Edge) */}
          <div className="bg-[#EAF3EC] w-full px-6 py-10 md:px-16 md:py-14 space-y-10">
            <div className="max-w-[1700px] mx-auto space-y-10">
              
              {/* Header Section */}
              {(data.logo || data.titlePrefix || data.titleHighlight || data.descriptionNormal || data.descriptionBold) && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 flex items-center gap-5">
                    
                    {/* Logo Display */}
                    {data.logo && (
                      <div className="shrink-0 flex items-center justify-center">
                        <img 
                          src={data.logo} 
                          alt="Logo" 
                          className="w-20 h-20 md:w-24 md:h-24 object-contain bg-transparent" 
                        />
                      </div>
                    )}

                    {/* Title Section */}
                    <div className="flex flex-col justify-center">
                      {data.titlePrefix && (
                        <h2 className="text-4xl md:text-5xl font-serif text-[#00873E] font-bold leading-tight">
                          {data.titlePrefix}
                        </h2>
                      )}
                      {data.titleHighlight && (
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 font-bold leading-tight">
                          {data.titleHighlight}
                        </h2>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-7 space-y-3">
                    {(data.subTitleBold || data.subTitleNormal) && (
                      <p className="text-xl text-gray-900">
                        {data.subTitleBold && <strong className="font-bold">{data.subTitleBold} </strong>}
                        {data.subTitleNormal}
                      </p>
                    )}
                    {(data.descriptionBold || data.descriptionNormal) && (
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {data.descriptionBold && <strong className="font-bold text-gray-900">{data.descriptionBold} </strong>}
                        {data.descriptionNormal}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Banner Images Inside Top Green Card */}
              {(hasImage1 || hasImage2) && (
                <div className={`grid gap-6 ${hasImage1 && hasImage2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {hasImage1 && (
                    <div className="w-full h-[380px] md:h-[480px] rounded-xl overflow-hidden shadow-sm">
                      <img src={data.image1} alt="Facility 1" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {hasImage2 && (
                    <div className="w-full h-[380px] md:h-[480px] rounded-xl overflow-hidden shadow-sm">
                      <img src={data.image2} alt="Facility 2" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Dynamic SubSections (Center aligned with padding) */}
          <div className="w-[95%] max-w-[1700px] mx-auto space-y-16">
            {data.subSections?.map((section: any, sIdx: number) => {
              const items = section.items || [];
              if (items.length === 0 && !section.sectionTitle) return null;

              return (
                <div key={sIdx} className="space-y-8 mb-12">
                  {section.sectionTitle && (
                    <h3 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 tracking-tight mb-8">
                      {section.sectionTitle}
                    </h3>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item: any, iIdx: number) => (
                      <div key={iIdx} className="bg-[#EAF3EC] px-8 py-6 rounded-lg flex items-center justify-between gap-4">
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                          {item.title && <strong className="font-bold text-gray-900">{item.title}</strong>}
                          {item.description ? `: ${item.description}` : ''}
                        </p>
                        <div className="bg-white p-2.5 rounded-md shrink-0 shadow-sm">
                          <ArrowRight className="w-4 h-4 text-[#00873E]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Footer Note / Bottom Text */}
            {data.footerNote && (
              <div className="text-center pt-2">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed w-[95%] mx-auto">
                  {data.footerNote}
                </p>
              </div>
            )}
          </div>

        </div>
      )}
    </section>
  );
}