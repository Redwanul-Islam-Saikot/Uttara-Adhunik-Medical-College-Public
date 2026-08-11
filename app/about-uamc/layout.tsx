'use client';

import React, { useState } from 'react';
import AboutHero from '@/components/About/Overview/AboutHero';
import SubMenuTabs from '@/components/About/Overview/buttons';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <AboutHero activeTab={activeTab} />

      {/* 2. SubMenu Buttons */}
      <SubMenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Page Content */}
      <main className="w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeTab } as Record<string, unknown>);
          }
          return child;
        })}
      </main>
    </div>
  );
}