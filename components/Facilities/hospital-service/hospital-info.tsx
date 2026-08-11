'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HospitalInfoSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facilities/hospital-service/hospital-info')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data.length > 0) {
          setData(resData.data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) return null;

  return (
    <section className="w-full bg-[#EBF4EC] py-16 sm:py-20 md:py-24 flex justify-center">
      {/* 95% width container */}
      <div className="w-[95%] max-w-[1800px] mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-4 md:col-span-1">
            {data.icon && (
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                <Image src={data.icon} alt="Hospital Icon" fill className="object-contain" />
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 leading-tight">
              {data.title ? (
                <>
                  {data.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-[#00873E] font-medium">
                    {data.title.split(' ').slice(-1)[0]}
                  </span>
                </>
              ) : (
                <>
                  About the <br />
                  <span className="text-[#00873E] font-medium">Hospital</span>
                </>
              )}
            </h2>
          </div>

          <div className="md:col-span-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
              {data.boldHeader && (
                <strong className="font-bold text-gray-900 block sm:inline mb-1 sm:mb-0 mr-2">
                  {data.boldHeader}
                </strong>
              )}
              {data.description}
            </p>
          </div>
        </div>

        {/* Main Banner Image */}
        {data.mainImage && (
          <div className="relative w-full h-[300px] sm:h-[450px] md:h-[520px] rounded-2xl overflow-hidden shadow-md">
            <Image src={data.mainImage} alt={data.title || 'Hospital Banner'} fill className="object-cover" />
          </div>
        )}

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-20 pt-4 text-center">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#00873E]">
              {data.stat1Number}
            </span>
            {data.stat1Subtext && (
              <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1">{data.stat1Subtext}</span>
            )}
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mt-1">
              {data.stat1Label}
            </span>
          </div>

          <div className="hidden sm:block w-[1.5px] h-16 bg-gray-300" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#00873E]">
              {data.stat2Number}
            </span>
            {data.stat2Subtext && (
              <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1">{data.stat2Subtext}</span>
            )}
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mt-1">
              {data.stat2Label}
            </span>
          </div>
        </div>

        {/* Bottom Note */}
        {data.additionalStructures && (
          <div className="text-center pt-4 border-t border-gray-200/60">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              <span className="font-bold text-gray-900">Additional Structures:</span>{' '}
              {data.additionalStructures}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}