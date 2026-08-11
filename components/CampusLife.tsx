'use client';

import { useEffect, useState } from 'react';

interface CampusCard {
  _id: string;
  cardTitle: string;
  cardImage: string;
  cardLink: string;
}

export default function CampusLifeSection() {
  const [cards, setCards] = useState<CampusCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campus-life')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCards(data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ডাটা না থাকলে সেকশনটি সম্পূর্ণ অদৃশ্য (Blank) থাকবে
  if (loading || cards.length === 0) return null;

  return (
    <section className="bg-[#008744] py-10 px-4 sm:px-8 md:px-12 relative overflow-hidden flex items-center justify-center font-serif text-white w-full">
      
      {/* Background Shapes */}
      <div className="absolute top-8 left-1/4 opacity-20 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="absolute top-10 right-1/5 opacity-20 pointer-events-none">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 22h20" />
          <path d="M12 2v20" />
          <path d="M2 12h20" />
        </svg>
      </div>

      {/* Max Width 1400px দিয়ে হালকা ছোট ও ব্যালেন্সড করা হয়েছে */}
      <div className="max-w-[1400px] mx-auto w-full space-y-10">
        
        {/* Centered Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center md:text-left">
          <p className="max-w-xs sm:max-w-sm text-emerald-100 text-xs sm:text-sm font-sans leading-relaxed tracking-wide">
            Building a vibrant community of creative and accomplished people from around the world
          </p>

          <div className="relative text-center md:text-right">
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-5 flex gap-1">
                <span className="w-1 h-2.5 bg-[#FFC72C] transform rotate-45 rounded-full"></span>
                <span className="w-1 h-3.5 bg-[#FFC72C] transform rotate-12 rounded-full"></span>
                <span className="w-1 h-2.5 bg-[#FFC72C] transform -rotate-12 rounded-full"></span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white font-serif">
                Campus
              </h2>
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white font-serif mt-0.5">
              Life
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <a
              key={card._id}
              href={card.cardLink || '#'}
              className="group block space-y-3 cursor-pointer"
            >
              <div className="overflow-hidden rounded-none h-[220px] sm:h-[260px] lg:h-[300px] w-full bg-emerald-800">
                <img
                  src={card.cardImage}
                  alt={card.cardTitle}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Title & Arrow Icon */}
              <div className="pt-1 flex items-center">
                <div className="inline-flex items-center gap-4">
                  <h3 className="text-lg sm:text-xl font-normal text-white font-serif tracking-wide">
                    {card.cardTitle}
                  </h3>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}