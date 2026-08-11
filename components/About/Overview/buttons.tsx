'use client';

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Props Interface যুক্ত করা হয়েছে (Optional হিসেবে)
interface SubMenuTabsProps {
  activeTab?: string;
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

export default function SubMenuTabs({ activeTab, setActiveTab }: SubMenuTabsProps) {
  const pathname = usePathname();

  const topRowItems = [
    { name: 'Overview', href: '/about-uamc/overview' },
    { name: 'History of UAMC', href: '/about-uamc/history' },
    { name: 'Vision & Mission', href: '/about-uamc/vision' },
    { name: 'Aim & Objective', href: '/about-uamc/aims-objective' },
    { name: 'Organizational Structure', href: '/about-uamc/structure' },
  ];

  const bottomRowItems = [
    { name: 'Founder Member', href: '/about-uamc/founder-member' },
    { name: 'EC Members', href: '/about-uamc/ec-members' },
    { name: 'GB Members', href: '/about-uamc/gb-members' },
  ];

  return (
    <div className="w-full bg-white py-8 px-6 flex justify-center items-center">
      <div className="flex flex-col gap-6 max-w-6xl w-full items-center">
        
        {/* উপরের সারি */}
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {topRowItems.map((item) => {
            const isActive = pathname === item.href || activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab && setActiveTab(item.name)}
                className={`w-52 py-3.5 px-4 text-sm font-medium rounded-md transition-all duration-200 flex items-center justify-center text-center ${
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

        {/* নিচের সারি */}
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {bottomRowItems.map((item) => {
            const isActive = pathname === item.href || activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab && setActiveTab(item.name)}
                className={`w-52 py-3.5 px-4 text-sm font-medium rounded-md transition-all duration-200 flex items-center justify-center text-center ${
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

      </div>
    </div>
  );
}