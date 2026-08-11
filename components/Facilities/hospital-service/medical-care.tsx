'use client';

import React, { useEffect, useState } from 'react';

export default function HospitalServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Correct API Endpoint Path
  const API_URL = '/api/facilities/hospital-service/emergency-care';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setServices(json.data);
        }
      })
      .catch((err) => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);

  // Admin panel theke kono data na thakle fully blank thakbe
  if (loading || services.length === 0) return null;

  const emergencyList = services.filter((s) => s.category === 'emergency');
  const diagnosticList = services.filter((s) => s.category === 'diagnostic');
  const additionalList = services.filter((s) => s.category === 'additional');

  return (
    /* Sections er majhe boro space: space-y-24 sm:space-y-32 */
    <div className="w-[95%] mx-auto py-16 sm:py-24 space-y-24 sm:space-y-32">
      {/* 1. Emergency & Specialized Care */}
      {emergencyList.length > 0 && (
        <ServiceSection
          title="Emergency & Specialized Care"
          items={emergencyList}
        />
      )}

      {/* 2. Diagnostic & Imaging Services */}
      {diagnosticList.length > 0 && (
        <ServiceSection
          title="Diagnostic & Imaging Services"
          items={diagnosticList}
        />
      )}

      {/* 3. Additional Services */}
      {additionalList.length > 0 && (
        <ServiceSection
          title="Additional Services"
          items={additionalList}
        />
      )}
    </div>
  );
}

function ServiceSection({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="w-full">
      {/* Section Title with bottom margin */}
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 tracking-tight mb-8">
        {title}
      </h2>

      {/* Cards Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-[#EBF4EE] hover:bg-[#DDECE2] transition-colors p-3.5 sm:p-4 rounded-sm flex items-center justify-between text-gray-800 font-medium text-xs sm:text-sm cursor-pointer w-full"
          >
            <span>{item.title}</span>
            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#00873E] text-[10px] font-bold shadow-xs shrink-0 ml-3">
              ➔
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}