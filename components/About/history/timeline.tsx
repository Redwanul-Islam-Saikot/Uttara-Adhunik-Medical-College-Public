'use client';

import React, { useEffect, useState } from 'react';

interface Item {
  _id?: string;
  year: string;
  title: string;
}

interface HeaderInfo {
  _id?: string;
  mainTitle?: string;
  subtitle?: string;
  description?: string;
}

interface TimelineData {
  header?: HeaderInfo | null;
  headers?: HeaderInfo[];
  items?: Item[];
}

export default function DynamicTimelineFrontend() {
  const [data, setData] = useState<TimelineData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/about/timeline', { cache: 'no-store' })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.error('Error fetching timeline:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const rawHeader =
    data?.headers && data.headers.length > 0
      ? data.headers[0]
      : data?.header;

  const hasTitle = Boolean(rawHeader?.mainTitle?.trim());
  const hasSubtitle = Boolean(rawHeader?.subtitle?.trim());
  const hasDescription = Boolean(rawHeader?.description?.trim());

  const hasHeaderData = hasTitle || hasSubtitle || hasDescription;

  const items = (data?.items || []).filter(
    (item) => item?.year?.trim() || item?.title?.trim()
  );
  const hasItemsData = items.length > 0;

  if (!hasHeaderData && !hasItemsData) {
    return null;
  }

  const rows: Item[][] = [];
  for (let i = 0; i < items.length; i += 4) {
    rows.push(items.slice(i, i + 4));
  }

  return (
    /* max-w-7xl দিয়ে বামে ও ডানে সেকশনটি অনেকখানি প্রসারিত করা হয়েছে */
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto font-sans w-full">
      {/* HEADER SECTION */}
      {hasHeaderData && rawHeader && (
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-2 font-serif">
          {hasTitle && (
            <h2 className="text-3xl md:text-5xl font-bold text-[#1D3528] tracking-tight leading-tight">
              {rawHeader.mainTitle}
            </h2>
          )}

          {hasSubtitle && (
            <h3 className="text-2xl md:text-3xl font-semibold text-[#1D3528]">
              {rawHeader.subtitle}
            </h3>
          )}

          {hasDescription && (
            <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed pt-2 max-w-3xl mx-auto">
              {rawHeader.description}
            </p>
          )}
        </div>
      )}

      {/* TIMELINE GRID */}
      {hasItemsData && (
        <div className="space-y-24 w-full">
          {rows.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="relative w-full">
              {/* EXACT HORIZONTAL TIMELINE LINE (Edge to Edge stretched) */}
              <div className="hidden md:block absolute top-[11px] left-0 right-0 h-[1.5px] bg-[#00873E] z-0" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 relative z-10 w-full">
                {rowItems.map((item, itemIdx) => (
                  <div key={item._id || itemIdx} className="flex flex-col items-center text-center">
                    
                    {/* DOUBLE CIRCLE NODE & VERTICAL STEM */}
                    <div className="relative flex flex-col items-center mb-4">
                      {/* Outer Circle with White BG */}
                      <div className="w-6 h-6 rounded-full border-[1.5px] border-[#00873E] bg-white flex items-center justify-center">
                        {/* Inner Dot */}
                        <div className="w-2 h-2 rounded-full bg-[#00873E]" />
                      </div>
                      
                      {/* Vertical Stem */}
                      <div className="w-[1.5px] h-7 bg-[#00873E]" />
                    </div>

                    {/* YEAR */}
                    {item.year && (
                      <span className="text-3xl md:text-4xl font-extrabold text-[#00873E] tracking-tight mb-2 font-sans">
                        {item.year}
                      </span>
                    )}

                    {/* TITLE */}
                    {item.title && (
                      <p className="text-xs md:text-sm font-semibold text-[#2D2D2D] leading-snug max-w-[220px]">
                        {item.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}