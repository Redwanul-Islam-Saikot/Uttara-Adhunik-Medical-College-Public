'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Calendar, ArrowUpRight } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  date: string;
  link?: string;
}

export default function LatestNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNews(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || news.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 md:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#008751]">
              Read Our Latest News
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              You'll find something to spark your curiosity and enhance
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#008751] hover:underline underline-offset-4 transition"
          >
            <span>View All</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {news.slice(0, 2).map((item) => (
            <div
              key={item._id}
              className="border-2 border-dashed border-[#88C4A6] p-5 sm:p-6 rounded-none flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 bg-white hover:shadow-sm transition"
            >
              {/* Image Box */}
              <div className="w-full sm:w-48 h-48 sm:h-44 shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Box */}
              <div className="flex flex-col justify-between h-full space-y-3 flex-1 w-full">
                <div className="space-y-2">
                  {/* Category Yellow Badge */}
                  <span className="inline-block bg-[#FFCC00] text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wide">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#2D3748] leading-snug line-clamp-2 hover:text-[#008751] cursor-pointer transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Author & Date Metadata */}
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-[#008751]" />
                    <span>{item.author}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#008751]" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}