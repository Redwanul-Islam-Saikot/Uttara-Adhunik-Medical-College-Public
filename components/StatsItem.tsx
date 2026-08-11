'use client';

import { useState, useEffect } from 'react';

interface IStat {
  _id: string;
  value: string;
  label: string;
  bgImage?: string;
}

export default function StatsBanner() {
  const [stats, setStats] = useState<IStat[]>([]);
  const [sectionBg, setSectionBg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' });
        if (!res.ok) return;

        const result = await res.json();
        if (result?.success) {
          setStats(result.data || []);
          if (result.sectionBg) {
            setSectionBg(result.sectionBg);
          }
        }
      } catch (err) {
        console.error('Failed to fetch stats banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !stats || stats.length === 0) return null;

  const bgUrl = sectionBg || '/doctors-bg.jpg';

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-16 sm:py-20">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />

      {/* Stats Container */}
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deeper Green Blur Overlay (55% Opacity) */}
        <div className="bg-[#1C8246]/55 backdrop-blur-md py-10 px-6 sm:px-12 rounded-none border border-emerald-400/30 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-emerald-300/40">
            {stats.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center justify-center text-center px-4 pt-6 md:pt-0 first:pt-0"
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide mb-3 drop-shadow-md">
                  {item.value}
                </h2>
                <p className="text-[#FFC107] font-bold uppercase text-xs sm:text-sm tracking-wider max-w-[260px] leading-snug drop-shadow-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}