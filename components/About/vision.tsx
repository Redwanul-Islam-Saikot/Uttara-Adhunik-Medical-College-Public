'use client';

import { useState, useEffect } from 'react';

interface HistoryData {
  _id: string;
  titleRegular: string;
  titleBold: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export default function HistoryFrontend() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const res = await fetch('/api/about/vision', { cache: 'no-store' });
        const result = await res.json();
        
        // যদি ডাটা থাকে, তবে সর্বশেষ ক্রিয়েট করা কন্টেন্টটি দেখাবে
        if (result.success && result.data.length > 0) {
          setData(result.data[0]); 
        }
      } catch (err) {
        console.error('Failed to fetch vision:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  // লোডিং অবস্থা
  if (loading) {
    return (
      <div className="w-full bg-[#eaf4ed] py-24 flex justify-center items-center">
        <div className="animate-pulse text-[#00873E] font-medium">Loading Vision...</div>
      </div>
    );
  }

  // যদি কোনো ডাটা না থাকে
  if (!data) {
    return null;
  }

  return (
    <section className="w-full bg-[#eaf4ed] py-12 sm:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Top Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Title Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.15]">
              <span className="text-[#1a1a1a] block font-semibold">
                {data.titleRegular}
              </span>
              <span className="font-bold text-[#00873E] block mt-1">
                {data.titleBold}
              </span>
            </h1>
          </div>

          {/* Right Subtitle & Description Section */}
          <div className="space-y-3 pt-1">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#222222] leading-snug">
              {data.subtitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {data.description}
            </p>
          </div>

        </div>

        {/* Bottom Responsive Image Banner */}
        <div className="w-full overflow-hidden rounded-md shadow-sm border border-emerald-100/50">
          <img
            src={data.imageUrl}
            alt={data.titleBold}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=Image+Not+Found';
            }}
          />
        </div>

      </div>
    </section>
  );
}