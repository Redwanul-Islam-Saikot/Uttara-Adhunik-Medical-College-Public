import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function LibraryFeaturesWithSpacing() {
  const features = [
    {
      title: 'Reading Space',
      description: 'Accommodation for 105 students and teachers at a time in a quiet, focused environment.',
    },
    {
      title: 'Internet Access',
      description: 'High-speed internet is available for research and study.',
    },
    {
      title: 'Book Lending',
      description: 'Textbooks can be borrowed for on-campus or at-home use.',
    },
    {
      title: 'Photocopying',
      description: 'A photocopy machine is available for quick access to academic materials.',
    },
  ];

  return (
    // mt-12 এবং pt-24/pt-32 দিয়ে উপরের সেকশন থেকে বড় একটি গ্যাপ তৈরি করা হয়েছে
    <section className="bg-white pt-24 md:pt-32 pb-16 mt-12">
      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 px-4 md:px-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#EAF5EF] p-6 rounded-sm flex items-center justify-between gap-5 transition hover:shadow-md border border-[#C6DFC6]/50"
          >
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <strong className="font-bold text-gray-900">{item.title}: </strong>
              {item.description}
            </p>
            
            <div className="bg-white p-3 rounded-sm flex-shrink-0 shadow-xs flex items-center justify-center border border-gray-100">
              <ArrowRight className="w-4 h-4 text-[#00873E]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}