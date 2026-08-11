'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap, Building2, BookOpen, Loader2, X, CheckCircle2 } from 'lucide-react';

interface IAboutData {
  _id?: string;
  tagline: string;
  taglineLogo?: string;
  titlePrefix: string;
  titleHighlight: string;
  description1Bold?: string;
  description1: string;
  description2: string;
  knowledgeText?: string;
  knowledgeLogo?: string;
  missionText: string;
  missionLogo?: string;
  visionText: string;
  visionLogo?: string;
  buttonText: string;
  buttonLink: string;
  image1: string;
  image2: string;
  logo: string;
}

export default function AboutUs() {
  const [aboutData, setAboutData] = useState<IAboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('/api/about', { cache: 'no-store' });

        if (!res.ok) {
          setAboutData(null);
          return;
        }

        const text = await res.text();
        if (!text) {
          setAboutData(null);
          return;
        }

        const result = JSON.parse(text);

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setAboutData(result.data[0]);
        } else if (Array.isArray(result) && result.length > 0) {
          setAboutData(result[0]);
        } else if (
          result &&
          typeof result === 'object' &&
          !Array.isArray(result)
        ) {
          setAboutData(result.data || result);
        } else {
          setAboutData(null);
        }
      } catch (error) {
        console.error('Failed to load About section data:', error);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="py-40 flex justify-center items-center bg-white">
        <Loader2 className="animate-spin text-[#008751]" size={48} />
      </section>
    );
  }

  if (!aboutData || (!aboutData.image1 && !aboutData.titlePrefix)) {
    return null;
  }

  return (
    <section className="py-32 md:py-48 bg-white overflow-hidden w-full relative">
      <div className="max-w-[1700px] mx-auto px-8 sm:px-16 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* LEFT SIDE: Image Gallery & Dynamic Center Badge Logo */}
          <div className="lg:col-span-6 relative flex items-center">
            <div className="relative grid grid-cols-2 gap-8 items-center w-full min-h-[580px] sm:min-h-[700px]">
              
              {/* Image 1 */}
              {aboutData.image1 && (
                <div className="h-[480px] sm:h-[600px] w-full rounded-none overflow-hidden shadow-lg mt-16 group">
                  <img
                    src={aboutData.image1}
                    alt="Campus Image 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Image 2 */}
              {aboutData.image2 && (
                <div className="h-[480px] sm:h-[600px] w-full rounded-none overflow-hidden shadow-lg mb-16 group">
                  <img
                    src={aboutData.image2}
                    alt="Campus Image 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Main Overlapping Center Logo */}
              {aboutData.logo && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-56 h-56 sm:w-80 sm:h-80 flex items-center justify-center p-3">
                  <img
                    src={aboutData.logo}
                    alt="College Badge Logo"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              )}

            </div>
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-between py-4">
            
            <div className="space-y-8">
              {/* Tagline & Main Title */}
              <div className="space-y-4">
                {aboutData.tagline && (
                  <div className="flex items-center gap-3 text-[#008751]">
                    {aboutData.taglineLogo ? (
                      <img
                        src={aboutData.taglineLogo}
                        alt="Tagline Logo"
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <GraduationCap size={32} className="text-[#008751]" />
                    )}
                    <span className="text-base sm:text-lg font-bold tracking-widest text-[#008751] uppercase">
                      {aboutData.tagline}
                    </span>
                  </div>
                )}

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-[1.15]">
                  {aboutData.titlePrefix}
                  {aboutData.titleHighlight && (
                    <span className="font-extrabold text-[#EAB308] ml-4 inline-block">
                      {aboutData.titleHighlight}
                    </span>
                  )}
                </h2>
              </div>

              {/* Paragraph Descriptions */}
              <div className="space-y-5 text-slate-600 text-lg sm:text-xl leading-relaxed">
                {(aboutData.description1Bold || aboutData.description1) && (
                  <p className="text-slate-800 text-lg sm:text-2xl leading-snug">
                    {aboutData.description1Bold && (
                      <strong className="font-extrabold text-slate-900 mr-2">
                        {aboutData.description1Bold}
                      </strong>
                    )}
                    <span className="font-normal text-slate-600">
                      {aboutData.description1}
                    </span>
                  </p>
                )}

                {aboutData.description2 && (
                  <p className="font-normal text-slate-500">
                    {aboutData.description2}
                  </p>
                )}
              </div>
            </div>

            {/* Cards & Action Button Block */}
            <div className="space-y-8 pt-6">
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Knowledge Box */}
                {aboutData.knowledgeText && (
                  <div className="group p-6 sm:p-8 border-2 border-dashed border-[#008751] bg-white hover:bg-[#EAB308] hover:border-transparent transition-all duration-300 flex items-center gap-5 cursor-pointer shadow-sm hover:shadow-md">
                    <div className="shrink-0 flex items-center justify-center w-14 h-14">
                      {aboutData.knowledgeLogo ? (
                        <img
                          src={aboutData.knowledgeLogo}
                          alt="Knowledge Logo"
                          className="w-full h-full object-contain group-hover:brightness-0 transition-all duration-300"
                        />
                      ) : (
                        <BookOpen size={44} className="text-[#008751] group-hover:text-slate-900 transition-colors duration-300" strokeWidth={1.5} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#008751] group-hover:text-slate-900 transition-colors duration-300 leading-snug">
                        {aboutData.knowledgeText}
                      </h4>
                    </div>
                  </div>
                )}

                {/* Mission Box */}
                {aboutData.missionText && (
                  <div className="group p-6 sm:p-8 border-2 border-dashed border-[#008751] bg-white hover:bg-[#EAB308] hover:border-transparent transition-all duration-300 flex items-center gap-5 cursor-pointer shadow-sm hover:shadow-md">
                    <div className="shrink-0 flex items-center justify-center w-14 h-14">
                      {aboutData.missionLogo ? (
                        <img
                          src={aboutData.missionLogo}
                          alt="Mission Logo"
                          className="w-full h-full object-contain group-hover:brightness-0 transition-all duration-300"
                        />
                      ) : (
                        <GraduationCap size={44} className="text-[#008751] group-hover:text-slate-900 transition-colors duration-300" strokeWidth={1.5} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#008751] group-hover:text-slate-900 transition-colors duration-300 leading-snug">
                        {aboutData.missionText}
                      </h4>
                    </div>
                  </div>
                )}

                {/* Vision Box */}
                {aboutData.visionText && (
                  <div className="group p-6 sm:p-8 border-2 border-dashed border-[#008751] bg-white hover:bg-[#EAB308] hover:border-transparent transition-all duration-300 flex items-center gap-5 cursor-pointer shadow-sm hover:shadow-md">
                    <div className="shrink-0 flex items-center justify-center w-14 h-14">
                      {aboutData.visionLogo ? (
                        <img
                          src={aboutData.visionLogo}
                          alt="Vision Logo"
                          className="w-full h-full object-contain group-hover:brightness-0 transition-all duration-300"
                        />
                      ) : (
                        <Building2 size={44} className="text-[#008751] group-hover:text-slate-900 transition-colors duration-300" strokeWidth={1.5} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#008751] group-hover:text-slate-900 transition-colors duration-300 leading-snug">
                        {aboutData.visionText}
                      </h4>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Button: Opens Modal */}
              {aboutData.buttonText && (
                <div className="pt-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-4 bg-[#008751] hover:bg-[#007043] text-white font-semibold text-base sm:text-lg px-10 py-5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>{aboutData.buttonText}</span>
                    <ArrowRight size={22} />
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* Program Details Modal Card */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Content / Card Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#008751]/10 rounded-xl text-[#008751]">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008751]">Academic Program</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">MBBS Course Details</h3>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Uttara Adhunik Medical College offers a comprehensive 5-year Bachelor of Medicine and Bachelor of Surgery (MBBS) degree followed by a mandatory 1-year logbook-based rotating internship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Duration</span>
                  <p className="text-lg font-bold text-slate-800">5 Years + 1 Year Internship</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Affiliation</span>
                  <p className="text-lg font-bold text-slate-800">University of Dhaka</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-slate-900">Key Highlights:</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#008751]" /> Approved by BM&DC (Bangladesh Medical and Dental Council)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#008751]" /> Modern Laboratories & High-tech Clinical Facilities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#008751]" /> Experienced Faculty & Dedicated Teaching Staff
                  </li>
                </ul>
              </div>

              {/* Action Inside Modal */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}