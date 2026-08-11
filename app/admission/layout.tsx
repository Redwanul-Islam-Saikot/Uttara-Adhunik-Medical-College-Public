'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AboutHero from '@/components/About/Overview/AboutHero';
import SubMenuTabs from '@/components/Admission/buttons';

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // URL-এর ওপর ভিত্তি করে activeTab নির্ণয়
  const getActiveTabName = () => {
    if (pathname.includes('/admission-papers')) return 'Admission Papers';
    if (pathname.includes('/application-form')) return 'Application Form';
    if (pathname.includes('/results')) return 'Admission Results';
    if (pathname.includes('/online-registration')) return 'Online Registration';
    return 'Admission Procedure & Fees'; // default tab
  };

  const activeTab = getActiveTabName();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Banner (URL অনুযায়ী ডায়নামিক পাঠাবে) */}
      <AboutHero activeTab={activeTab} />

      {/* 2. SubMenu Buttons */}
      <SubMenuTabs />

      {/* 3. Page Content */}
      <main className="w-full">{children}</main>
    </div>
  );
}