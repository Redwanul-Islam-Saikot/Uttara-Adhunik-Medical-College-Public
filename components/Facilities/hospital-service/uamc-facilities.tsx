'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FacilityServicesSection() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facilities/hospital-service/uamc-facilities')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setFacilities(json.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || facilities.length === 0) return null;

  const currentItem = facilities[activeTab] || facilities[0];

  return (
    <section className="w-full py-16 flex justify-center bg-white">
      <div className="w-[90%] max-w-[1400px] space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 tracking-tight">
            <span className="text-[#00873E] font-bold">UAMCH</span> Facilities & Services
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Patients requiring intensive care receive specialized attention in
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {/* Left Navigation Tabs */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col space-y-2 md:pt-16">
            {facilities.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item._id || index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left py-3.5 px-5 rounded-md text-xs sm:text-sm transition-all duration-300 font-bold ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00873E] via-[#00873E] to-emerald-50/10 text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#00873E] bg-transparent'
                  }`}
                >
                  {item.tabTitle || item.title}
                </button>
              );
            })}
          </div>

          {/* Right Detailed Card Box */}
          <div className="md:col-span-8 lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row items-stretch">
            
            {/* Image Section */}
            {currentItem.image ? (
              <div className="relative w-full md:w-1/2 min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title || 'Facility Image'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full md:w-1/2 min-h-[320px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}

            {/* Content Details Section - Exact Positioned like image */}
            <div className="w-full md:w-1/2 pt-10 pb-10 px-8 sm:px-10 flex flex-col justify-start space-y-8">
              
              {/* Title & Description Block */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight leading-snug">
                  {currentItem.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {currentItem.description}
                </p>
              </div>

              {/* Action Button */}
              {currentItem.buttonText && (
                <div className="pt-2">
                  <Link
                    href={currentItem.buttonUrl || '#'}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#00873E] hover:bg-[#007033] text-white text-xs sm:text-sm font-medium px-6 py-3 rounded transition-all shadow-sm"
                  >
                    <span>{currentItem.buttonText}</span>
                    <span className="text-base leading-none">&rarr;</span>
                  </Link>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}