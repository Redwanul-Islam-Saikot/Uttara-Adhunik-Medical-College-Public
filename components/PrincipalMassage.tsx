'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrincipalData {
  _id: string;
  subHeading: string;
  titleBlack: string;
  titleYellow: string;
  honorableText: string;
  name: string;
  designationMain: string;
  designationSub: string;
  tagline: string;
  description: string;
  signatureImage: string;
  principalImage: string;
  buttonText: string;
  buttonLink: string;
}

export default function PrincipalMessageSection() {
  const [data, setData] = useState<PrincipalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal display state

  useEffect(() => {
    fetch('/api/principal-message')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setData(Array.isArray(resData.data) ? resData.data[0] : resData.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) return null;

  return (
    <section className="w-full bg-[#EBF4EC] py-16 px-4 sm:px-8 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/About.knowledge.logo.png"
              alt="Knowledge Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm md:text-base font-semibold text-[#008751] lowercase">
              {data.subHeading || 'knowledge meets innovation'}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-slate-900">
            {data.titleBlack || 'Message from the'}{' '}
            <span className="text-[#FFC107]">{data.titleYellow || 'Principal'}</span>
          </h2>
        </div>

        {/* Dynamic Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Details Column */}
          <div className="lg:col-span-6 space-y-5">
            {data.signatureImage && (
              <div className="w-40 h-16 relative">
                <img
                  src={data.signatureImage}
                  alt="Signature"
                  className="w-full h-full object-contain object-left"
                />
              </div>
            )}

            <div>
              <p className="text-sm font-serif font-black text-slate-800">
                {data.honorableText || 'Honorable'}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#008751]">
                {data.name}
              </h3>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-serif font-black text-slate-800 leading-tight">
                {data.designationMain}{' '}
                <span className="text-xs font-normal text-slate-500">
                  {data.designationSub}
                </span>
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {data.tagline}
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify whitespace-pre-line line-clamp-4">
              {data.description}
            </p>

            {/* Read More Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#008751] hover:bg-[#007043] text-white text-xs md:text-sm font-semibold px-6 py-3 rounded transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>{data.buttonText || 'Read More'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[360px] md:h-[480px] overflow-hidden shadow-md rounded-lg">
              <img
                src={data.principalImage}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Principal Message Modal Card */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Modal Inner Scroll Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Principal Info Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-6">
                  {data.principalImage && (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-2 border-[#008751] shadow-md">
                      <img
                        src={data.principalImage}
                        alt={data.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="text-center sm:text-left space-y-1">
                    <p className="text-xs font-serif font-bold text-slate-500 uppercase tracking-wider">
                      {data.honorableText || 'Honorable'}
                    </p>
                    <h3 className="text-2xl font-bold text-[#008751]">
                      {data.name}
                    </h3>
                    <p className="text-base font-serif font-black text-slate-800">
                      {data.designationMain}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        {data.designationSub}
                      </span>
                    </p>
                    <p className="text-xs font-semibold text-slate-600">
                      {data.tagline}
                    </p>
                  </div>
                </div>

                {/* Full Description / Message */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 border-l-4 border-[#008751] pl-3">
                    Full Message
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {data.description}
                  </p>
                </div>

                {/* Signature View */}
                {data.signatureImage && (
                  <div className="pt-2 border-t border-slate-100 flex flex-col items-start">
                    <img
                      src={data.signatureImage}
                      alt="Signature"
                      className="h-14 object-contain"
                    />
                    <span className="text-xs text-slate-400 mt-1">Authorized Signature</span>
                  </div>
                )}

              </div>

              {/* Modal Footer Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}