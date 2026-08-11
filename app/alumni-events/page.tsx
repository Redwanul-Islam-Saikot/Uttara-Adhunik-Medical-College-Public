'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  link?: string;
}

export default function AllAlumniEventsPage() {
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

  return (
    <div className="min-h-screen bg-[#EAF5EC] py-16 px-4 sm:px-8 md:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#008751]">
            All Alumni Events
          </h1>
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-[#008751] transition"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((item, idx) => (
              <a
                key={item._id}
                href={item.link || '#'}
                className="bg-[#F6FAF7] hover:bg-white p-6 transition duration-300 space-y-3 group shadow-xs hover:shadow-md border border-emerald-50/60 cursor-pointer"
              >
                <div className="text-3xl font-serif font-normal text-emerald-700/60 group-hover:text-[#008751] transition">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <h2 className="text-base font-bold text-emerald-900 group-hover:text-[#008751] transition line-clamp-2">
                  {item.title}
                </h2>
                
                <div className="space-y-1.5 text-xs text-slate-500 pt-2">
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
                    <span className="underline decoration-slate-300">{item.location}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}