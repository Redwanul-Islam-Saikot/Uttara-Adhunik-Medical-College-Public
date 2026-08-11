'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, X, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OurFacilityData {
  _id: string;
  title: string;
  slug: string;
  heading: string;
  fullDescription?: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export default function OurFacilitiesSection() {
  const [facilities, setFacilities] = useState<OurFacilityData[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal display state

  useEffect(() => {
    fetch('/api/our-facilities')
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.success && resData?.data?.length > 0) {
          const uniqueData = resData.data.reduce((acc: OurFacilityData[], current: OurFacilityData) => {
            const baseSlug = current.slug ? current.slug.split('-')[0] : current.title.toLowerCase();
            const isExist = acc.find((item) => {
              const itemBaseSlug = item.slug ? item.slug.split('-')[0] : item.title.toLowerCase();
              return itemBaseSlug === baseSlug;
            });

            if (!isExist) {
              acc.push(current);
            }
            return acc;
          }, []);

          setFacilities(uniqueData);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || facilities.length === 0) return null;

  const activeData = facilities[activeTab];

  return (
    <section className="w-full py-24 px-4 md:px-12 bg-[#FAF8F5] relative">
      {/* Extra Large Container Width */}
      <div className="max-w-[1700px] mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/About.knowledge.logo.png"
              alt="Knowledge Logo"
              className="w-7 h-7 object-contain"
            />
            <span className="text-lg font-semibold text-[#008751] lowercase">
              knowledge meets innovation
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 tracking-tight">
            Our Facilities
          </h2>
        </div>

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-[#FAF8F5]">
          
          {/* Left Sub-sections List */}
          <div className="lg:col-span-4 py-0 pl-12 pr-16 flex flex-col justify-between h-full relative z-20">
            {facilities.map((facility, index) => {
              const isActive = activeTab === index;
              return (
                <div key={facility._id} className="relative flex items-center">
                  
                  {/* Larger Fixed Size Non-rounded Button */}
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`w-[310px] xl:w-[350px] h-[64px] shrink-0 flex items-center justify-between px-6 font-serif font-bold text-lg bg-white relative z-20 rounded-none transition-colors duration-300 ${
                      isActive
                        ? 'text-[#008751] shadow-none'
                        : 'text-slate-900 shadow-sm hover:text-[#008751]'
                    }`}
                  >
                    <span className="truncate pr-2">{facility.title}</span>

                    {/* Arrow Icon disappears when Active */}
                    <AnimatePresence mode="wait">
                      {!isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="w-9 h-9 rounded-none bg-[#EBF7ED] flex items-center justify-center text-[#008751] shrink-0"
                        >
                          <ArrowRight size={18} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Non-rounded Extension Bridge to Center Image */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ originX: 0 }}
                        className="absolute left-[310px] xl:left-[350px] right-[-4rem] h-[64px] bg-white z-10 hidden lg:block rounded-none"
                      />
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

          {/* Center Dynamic Image */}
          <div className="lg:col-span-4 min-h-[550px] lg:min-h-[680px] bg-slate-200 relative overflow-hidden z-10">
            <AnimatePresence mode="wait">
              {activeData.image ? (
                <motion.img
                  key={activeData._id}
                  src={activeData.image}
                  alt={activeData.heading}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                  No Image Available
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Details Text Area */}
          <div className="lg:col-span-4 bg-white p-12 lg:p-16 flex flex-col justify-between space-y-10 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-6"
              >
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#008751] leading-snug">
                  {activeData.heading}
                </h3>

                {activeData.fullDescription && (
                  <p className="text-base text-slate-500 leading-relaxed font-normal whitespace-pre-line line-clamp-4">
                    {activeData.fullDescription}
                  </p>
                )}

                {/* View Details Button Triggering Modal */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 text-base font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
                  >
                    <span>View Details ...</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4">
              <a
                href={activeData.buttonLink || '#'}
                className="inline-flex items-center gap-3 bg-[#008751] hover:bg-[#007043] text-white text-base md:text-lg font-semibold px-9 py-4 rounded-none transition-colors duration-200"
              >
                <span>{activeData.buttonText || 'View Details'}</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Pop-up Card (Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100"
            >
              {/* Image Banner Header */}
              {activeData.image && (
                <div className="w-full h-48 sm:h-64 relative overflow-hidden bg-slate-100">
                  <img
                    src={activeData.image}
                    alt={activeData.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute bottom-4 left-6 text-white text-sm font-semibold uppercase tracking-wider bg-[#008751] px-3 py-1 rounded-full">
                    {activeData.title}
                  </span>
                </div>
              )}

              {/* Close Icon Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full transition-colors z-20 backdrop-blur-md shadow-md"
              >
                <X size={20} />
              </button>

              {/* Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {activeData.heading}
                  </h3>
                </div>

                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 text-slate-600 text-base leading-relaxed">
                  {activeData.fullDescription ? (
                    <p className="whitespace-pre-line">{activeData.fullDescription}</p>
                  ) : (
                    <p className="italic text-slate-400">No additional details available for this facility.</p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}