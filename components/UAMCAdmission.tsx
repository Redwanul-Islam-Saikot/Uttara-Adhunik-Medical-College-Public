'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface AdmissionBannerData {
  _id: string;
  highlightTitle: string;
  mainTitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export default function AdmissionBanner() {
  const [data, setData] = useState<AdmissionBannerData | null>(null);

  useEffect(() => {
    fetch('/api/admission-banner')
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.success && resData?.data?.length > 0) {
          setData(resData.data[0]);
        }
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    // Full screen background image section
    <section
      className="relative w-full min-h-[400px] md:min-h-[460px] bg-cover bg-center flex items-center justify-center px-4 md:px-10 py-8 md:py-12"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#06331e]/75 backdrop-blur-[1px]" />

      {/* Wide Inner Card (Left & Right cover almost fully with small side gap) */}
      <div className="relative z-10 w-full max-w-[95%] lg:max-w-[90%] bg-black/25 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/10 text-center shadow-2xl">
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-wide text-white">
            <span className="text-[#ffc107] font-bold">{data.highlightTitle}</span>{' '}
            {data.mainTitle}
          </h1>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-normal max-w-4xl mx-auto">
            {data.description}
          </p>

          <div className="pt-2">
            <a
              href={data.buttonLink || '#'}
              className="inline-flex items-center gap-2 bg-[#008751] hover:bg-[#007043] text-white text-xs md:text-sm font-semibold px-6 py-2.5 rounded-md transition duration-200 shadow-md"
            >
              <span>{data.buttonText}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}