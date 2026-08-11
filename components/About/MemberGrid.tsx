'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Member {
  _id: string;
  name: string;
  designation: string;
  description?: string;
  image: string;
  category: 'founder' | 'ec' | 'gb';
  order: number;
}

interface MemberGridProps {
  category: 'founder' | 'ec' | 'gb';
  title: string;
}

export default function MemberGrid({ category, title }: MemberGridProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // ডাইনামিক ক্যাটাগরি দিয়ে API কল করা হচ্ছে
        const res = await fetch(`/api/about/members?category=${category}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            const sortedData = data.data.sort(
              (a: Member, b: Member) => (a.order || 0) - (b.order || 0)
            );
            setMembers(sortedData);
          }
        }
      } catch (err) {
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [category]);

  // ১. লোড হওয়া পর্যন্ত বা ডাটা না থাকলে পুরো সেকশন হাইড থাকবে
  if (loading || members.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        {title}
      </h2>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-[#D5E7DA] px-6 py-12 flex flex-col justify-between"
          >
            {/* Image Container with Hover Overlay */}
            <div className="relative w-full h-[440px] overflow-hidden group">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Green Overlay on Hover */}
              <div className="absolute inset-0 bg-[#7BAE41]/95 text-white p-6 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
                <p className="text-xs md:text-sm leading-relaxed font-light whitespace-pre-line">
                  {member.description || 'No description available.'}
                </p>
              </div>
            </div>

            {/* Name & Designation */}
            <div className="mt-8 pt-1">
              <h3 className="font-serif font-bold text-gray-900 text-base md:text-lg leading-snug">
                {member.name}
              </h3>
              <p className="text-[#00873E] text-xs font-semibold mt-1.5">
                {member.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}