'use client';

import React, { useEffect, useState } from 'react';

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // cache: 'no-store' যুক্ত করা হয়েছে যাতে তাজা ডাটা ফেচ হয়
    fetch('/api/facilities/departments', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setDepartments(json.data);
        }
      })
      .catch((err) => console.error('Frontend Fetch Error:', err))
      .finally(() => setLoading(false));
  }, []);

  // Admin panel থেকে কিছু add না করলে বা লোডিং অবস্থায় Blank থাকবে
  if (loading || departments.length === 0) return null;

  return (
    <section className="bg-[#EBF4EE] py-16 sm:py-24 min-h-screen">
      <div className="w-[95%] max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Departments
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide uppercase">
            Title and date options filled with fallback text
          </p>
        </div>

        {/* 4 Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-gray-100"
            >
              <div className="space-y-3">
                {/* Image */}
                <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {item.establishedDate}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="pt-4">
                <a
                  href={item.btnLink || '#'}
                  className="inline-block bg-[#00873E] hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}