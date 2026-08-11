'use client';

import React from 'react';

// Overview Tab Components
import AboutUs from '@/components/AboutUs';
import VisitingSection from '@/components/About/Overview/Visiting';
import StatsItem from '@/components/StatsItem';
import AdmissionAidSection from '@/components/About/Overview/AdmissionAid';
import Sustainability from '@/components/About/Overview/Sustainability';
import PrincipalMessage from '@/components/PrincipalMassage';
import UAMCAdmission from '@/components/UAMCAdmission';
import StudentFeedback from '@/components/StudentFeedback';

export default function OverviewPage() {
  return (
    <div className="w-full">
      <AboutUs />
      <VisitingSection />
      <StatsItem />
      <AdmissionAidSection />
      <Sustainability />
      <PrincipalMessage />
      <UAMCAdmission />
      <StudentFeedback />
    </div>
  );
}