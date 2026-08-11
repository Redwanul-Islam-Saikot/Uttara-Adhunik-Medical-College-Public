'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MedicalServicesSection() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facilities/hospital-service/medical-service')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setServices(json.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || services.length === 0) return null;

  const section1 = services.filter(
    (s) => s.categoryGroup === 'main' || s.categoryNumber === '01'
  );
  const section2Medicine = services.filter(
    (s) => s.categoryGroup === 'clinical_medicine'
  );
  const section2Surgical = services.filter(
    (s) => s.categoryGroup === 'clinical_surgical'
  );

  return (
    <section className="w-full py-12 bg-white flex justify-center">
      {/* Container Width: w-[95%] */}
      <div className="w-[95%] space-y-12">
        {/* Header Title */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-serif text-gray-800 tracking-wide">
            <span className="text-[#00873E] font-bold">UAMCH</span> Facilities &
            Services
          </h2>
        </div>

        {/* --- SECTION 01: MEDICAL SERVICES --- */}
        {section1.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl sm:text-7xl font-serif font-extrabold text-transparent [-webkit-text-stroke:2px_#A3D9B1]">
                01
              </span>
              <div className="flex flex-col text-left font-serif font-bold text-gray-900 leading-tight tracking-wider text-xl sm:text-2xl">
                <span>MEDICAL</span>
                <span>SERVICES</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {section1.map((item, index) => (
                <Card
                  key={item._id || index}
                  item={item}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- SECTION 02: CLINICAL DEPARTMENTS --- */}
        {(section2Medicine.length > 0 || section2Surgical.length > 0) && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl sm:text-7xl font-serif font-extrabold text-transparent [-webkit-text-stroke:2px_#A3D9B1]">
                02
              </span>
              <div className="flex flex-col text-left font-serif font-bold text-gray-900 leading-tight tracking-wider text-xl sm:text-2xl">
                <span>CLINICAL</span>
                <span>DEPARTMENTS</span>
              </div>
            </div>

            {/* Medicine Related Sub-Section */}
            {section2Medicine.length > 0 && (
              <div className="bg-[#EBF4EE] p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row gap-8 items-center w-full">
                {/* Left Side Icon + Title */}
                <div className="md:w-1/4 flex flex-row items-center justify-center gap-3 text-left">
                  <div className="w-16 h-16 relative shrink-0">
                    <Image
                      src="/pill-icon.png"
                      alt="Medicine Related"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-serif font-extrabold text-base sm:text-lg tracking-wider text-gray-900 uppercase leading-snug">
                    MEDICINE
                    <br />
                    RELATED
                  </h3>
                </div>

                {/* Right Side Cards */}
                <div className="md:w-3/4 space-y-5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {section2Medicine.slice(0, 3).map((item, index) => (
                      <Card
                        key={item._id || index}
                        item={item}
                        isFirst={index === 0}
                      />
                    ))}
                  </div>

                  {section2Medicine.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {section2Medicine.slice(3).map((item, index) => (
                        <Card
                          key={item._id || index + 3}
                          item={item}
                          isFirst={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Surgical Related Sub-Section */}
            {section2Surgical.length > 0 && (
              <div className="bg-[#EBF4EE] p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row gap-8 items-center w-full">
                {/* Left Side Cards */}
                <div className="md:w-3/4 space-y-5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {section2Surgical.slice(0, 3).map((item, index) => (
                      <Card
                        key={item._id || index}
                        item={item}
                        isFirst={index === 0}
                      />
                    ))}
                  </div>

                  {section2Surgical.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {section2Surgical.slice(3).map((item, index) => (
                        <Card
                          key={item._id || index + 3}
                          item={item}
                          isFirst={false}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side Icon + Title */}
                <div className="md:w-1/4 flex flex-row items-center justify-center gap-3 text-right order-first md:order-last">
                  <h3 className="font-serif font-extrabold text-base sm:text-lg tracking-wider text-gray-900 uppercase leading-snug">
                    SURGICAL
                    <br />
                    RELATED
                  </h3>
                  <div className="w-16 h-16 relative shrink-0">
                    <Image
                      src="/logo45.png"
                      alt="Surgical"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

{/* Simple Card Component */}
function Card({ item, isFirst }: { item: any; isFirst: boolean }) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col justify-between min-h-[160px] space-y-4 ${
        isFirst
          ? 'bg-[#00873E] text-white'
          : 'bg-[#DDECE2]/60 border border-dashed border-[#8EC3A1]'
      }`}
    >
      {/* Circle Icon Wrapper */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center p-2.5 ${
          isFirst ? 'bg-white' : 'bg-[#00873E]'
        }`}
      >
        {item.logo ? (
          <div className="relative w-6 h-6">
            <Image
              src={item.logo}
              alt={item.title || 'Icon'}
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
        ) : (
          <div
            className={`w-3 h-3 rounded-full ${
              isFirst ? 'bg-[#00873E]' : 'bg-white'
            }`}
          />
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-1.5">
        <h4
          className={`font-bold text-sm sm:text-base leading-tight ${
            isFirst ? 'text-[#00873E]' : 'text-gray-900'
          }`}
        >
          {item.title}
        </h4>
        <p
          className={`text-xs leading-relaxed line-clamp-2 ${
            isFirst ? 'text-white/90' : 'text-gray-600'
          }`}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}