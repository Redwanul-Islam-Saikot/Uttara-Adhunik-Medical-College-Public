'use client';

import { useEffect, useState } from 'react';

interface FeesData {
  _id: string;
  titleGreen: string;
  titleBlack: string;
  descBold: string;
  descNormal: string;
  badgeText: string;
  logoUrl: string;
  imageUrl: string;
}

export default function Fees() {
  const [data, setData] = useState<FeesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        const res = await fetch('/api/admission/admission-procedure/fees', { cache: 'no-store' });
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('Failed to fetch fees data:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFeesData();
  }, []);

  if (loading) {
    return <div className="w-full max-w-[1320px] h-[450px] mx-auto bg-gray-100 animate-pulse my-8" />;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="w-full bg-[#EBF5EE] py-12 px-6 sm:px-10 lg:px-16 my-6">
      <div className="max-w-[1320px] mx-auto space-y-10">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Title Section with Logo */}
          <div className="md:col-span-7 flex items-center gap-5">
            {data.logoUrl && (
              <img
                src={data.logoUrl}
                alt="Logo Icon"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain shrink-0"
              />
            )}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif leading-[1.1] tracking-tight">
              <span className="font-bold text-[#00873E]">{data.titleGreen} </span>
              <span className="font-bold text-gray-900 block mt-1">{data.titleBlack}</span>
            </h2>
          </div>

          {/* Right Descriptions */}
          <div className="md:col-span-5 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-sans pr-2">
            <p>
              <strong className="font-bold text-gray-900">{data.descBold} </strong>
              {data.descNormal}
            </p>
          </div>
        </div>

        {/* Banner Section */}
        {data.imageUrl && (
          <div className="relative w-full flex items-center pt-2">
            {/* Image (Takes ~70% width) */}
            <div className="w-full md:w-[70%] overflow-hidden">
              <img
                src={data.imageUrl}
                alt="Admission Banner"
                className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover block"
              />
            </div>

            {/* Yellow Badge Box Overlay */}
            {data.badgeText && (
              <div className="absolute right-0 md:left-[52%] top-1/2 -translate-y-1/2 bg-[#FFD02B] text-gray-900 px-8 sm:px-12 md:px-14 py-8 sm:py-10 md:py-12 z-10 w-full md:w-[48%] shadow-sm">
                <span className="text-3xl sm:text-5xl md:text-[62px] font-serif font-bold tracking-tight block leading-none">
                  {data.badgeText}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}