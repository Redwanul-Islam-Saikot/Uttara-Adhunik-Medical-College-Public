'use client';

import { useState, useEffect } from 'react';

export default function FrontendEventGallery() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/notice-media');
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setEvents(json.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return null; // অথবা লোডিং স্পিনার

  // অ্যাডমিন প্যানেলে কিছু এড না করা থাকলে একদম Blank দেখাবে
  if (events.length === 0) {
    return null; 
  }

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="w-full max-w-[1536px] mx-auto space-y-8">
        
        {/* Gallery Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#008751]">
            Event Gallery of UAMC
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            You'll find something to spark your curiosity and enhance
          </p>
        </div>

        {/* 3-Column Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {events.map((item) => (
            <div 
              key={item._id} 
              className="bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow group cursor-pointer"
            >
              {/* Aspect Square Image Container */}
              <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Green Bottom Title Bar */}
              <div className="bg-[#008751] text-white px-3 py-2.5">
                <h3 className="text-sm sm:text-base font-bold truncate leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}