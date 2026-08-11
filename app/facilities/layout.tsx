'use client';

import React, { useState } from 'react';
import HeroBannerSection from '@/components/About/Overview/AboutHero';
import SubMenuTabs from '@/components/Facilities/buttons';

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('facilities');

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <HeroBannerSection
        activeTab={activeTab}
        apiEndpoint="/api/overview/hero-banner"
        defaultBreadcrumb="HOME > FACILITIES >> "
      />

      {/* 2. SubMenu Buttons */}
      <SubMenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Page Content */}
      <main className="w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeTab } as any);
          }
          return child;
        })}
      </main>
    </div>
  );
}