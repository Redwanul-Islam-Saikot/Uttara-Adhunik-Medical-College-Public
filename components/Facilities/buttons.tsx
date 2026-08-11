'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Props Types ডিফাইন করা হলো
interface SubMenuTabsProps {
  activeTab?: string;
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

export default function SubMenuTabs({ activeTab, setActiveTab }: SubMenuTabsProps) {
  const pathname = usePathname();

  // প্রথম সারির ৬টি বাটন
  const topRowItems = [
    { name: 'Hospital Service', href: '/facilities/hospital-service' },
    { name: 'Departments', href: '/facilities/departments' },
    { name: 'Library', href: '/facilities/library' },
    { name: 'Medical Education Unit', href: '/facilities/me-unit' },
    { name: 'Training', href: '/facilities/training' },
    { name: 'Publications', href: '/facilities/publi' },
  ];

  // দ্বিতীয় সারির ৪টি বাটন
  const bottomRowItems = [
    { name: 'Seminar', href: '/facilities/seminar' },
    { name: 'Hostel', href: '/facilities/hostel' },
    { name: 'Laboratory', href: '/facilities/laboratory' },
    { name: 'Cafeteria', href: '/facilities/cafeteria' },
  ];

  return (
    <div className="w-full bg-white py-12 flex justify-center items-center">
      {/* 90% Width Container */}
      <div className="w-[90%] max-w-[1700px] mx-auto flex flex-col gap-6 items-center">
        
        {/* প্রথম সারি (৬টি আইটেম) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full">
          {topRowItems.map((item) => {
            const isActive = pathname === item.href || activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab && setActiveTab(item.name)}
                className={`w-full py-5 px-4 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center text-center ${
                  isActive
                    ? 'bg-[#00873E] text-white outline outline-2 outline-dashed outline-[#00873E] outline-offset-2 shadow-sm'
                    : 'bg-[#73777B] hover:bg-[#00873E] hover:text-white hover:outline hover:outline-2 hover:outline-dashed hover:outline-[#00873E] hover:outline-offset-2 text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* দ্বিতীয় সারি (৪টি আইটেম - ১ম এবং ৬ষ্ঠ পজিশন ফাঁকা) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full">
          {/* ১ম ফাঁকা স্পেস */}
          <div className="hidden md:block"></div>

          {bottomRowItems.map((item) => {
            const isActive = pathname === item.href || activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab && setActiveTab(item.name)}
                className={`w-full py-5 px-4 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center text-center ${
                  isActive
                    ? 'bg-[#00873E] text-white outline outline-2 outline-dashed outline-[#00873E] outline-offset-2 shadow-sm'
                    : 'bg-[#73777B] hover:bg-[#00873E] hover:text-white hover:outline hover:outline-2 hover:outline-dashed hover:outline-[#00873E] hover:outline-offset-2 text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* ৬ষ্ঠ ফাঁকা স্পেস */}
          <div className="hidden md:block"></div>
        </div>

      </div>
    </div>
  );
}