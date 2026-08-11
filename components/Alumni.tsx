'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  eventImage?: string;
  link?: string;
}

export default function AlumniEventSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/alumni-events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || events.length === 0) return null;

  const displayEvents = events.slice(0, 3);
  // চেক করা হচ্ছে অ্যাডমিন প্যানেল থেকে কোনো ইমেজ আপলোড করা আছে কি না
  const featuredImage = events[0]?.eventImage?.trim() ? events[0].eventImage : null;

  return (
    <section className="w-full bg-[#EAF5EC] py-14 px-4 sm:px-8 md:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header & View All Link */}
        <div className="flex items-center justify-between border-b border-emerald-100/60 pb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#008751]">
            Alumni Event
          </h2>
          <Link
            href="/alumni-events"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#008751] hover:underline underline-offset-4 transition"
          >
            <span>View All</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Cards Section (ছবি না থাকলে lg:col-span-12 হয়ে পুরো জায়গা নিবে) */}
          <div className={`${featuredImage ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between gap-4 h-full`}>
            {displayEvents.map((item, index) => (
              <a
                key={item._id}
                href={item.link || '#'}
                className="bg-[#F6FAF7] hover:bg-white px-8 py-6 transition-all duration-300 flex items-center gap-8 shadow-xs hover:shadow-md group cursor-pointer flex-1 rounded-xs border border-emerald-50/50"
              >
                {/* Outlined Number Style */}
                <div 
                  className="text-6xl sm:text-7xl font-serif font-light text-transparent select-none shrink-0"
                  style={{
                    WebkitTextStroke: '1.5px #008751',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#008751] line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <span className="underline decoration-slate-300 underline-offset-2">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right Image Banner (ছবি থাকলে কেবল তখনই রেন্ডার হবে) */}
          {featuredImage && (
            <div className="lg:col-span-6 h-full min-h-[420px] lg:min-h-full">
              <div className="w-full h-full overflow-hidden shadow-xs rounded-xs">
                <img
                  src={featuredImage}
                  alt="Alumni Event Banner"
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}