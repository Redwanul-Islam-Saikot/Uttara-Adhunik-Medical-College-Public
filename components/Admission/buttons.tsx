'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubMenuTabs() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Admission Procedure & Fees', href: '/admission/admission-procedure' },
    { name: 'Admission Papers', href: '/admission/admission-papers' },
    { name: 'Application Form', href: '/admission/application-form' },
    { name: 'Admission Results', href: '/admission/results' },
    { name: 'Online Registration', href: '/admission/online-registration' }, // target বাদ দেওয়া হয়েছে
  ];

  return (
    <div className="w-full bg-white py-8 flex justify-center items-center">
      <div className="w-[70%] max-w-[1700px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full py-4 px-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center text-center min-h-[60px] ${
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