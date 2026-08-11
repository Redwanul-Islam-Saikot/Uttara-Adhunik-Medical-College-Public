'use client';

import { useEffect, useState } from 'react';
import { Download, Share2, Check, X, Send, Globe, Mail, Copy } from 'lucide-react';

interface IPDFProps {
  category: 'papers' | 'forms' | 'results';
}

export default function PDFFrontend({ category }: IPDFProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [activeShareItem, setActiveShareItem] = useState<{ title: string; url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admission/pdf?category=${category}`, { cache: 'no-store' });
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <div className="w-[98%] sm:w-[95%] max-w-[1400px] mx-auto h-[300px] sm:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 sm:my-10" />;
  }

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  // শেয়ার ডায়ালগ ওপেন করার ফাংশন
  const openShareModal = (pdfUrl: string, title: string) => {
    const fullUrl = pdfUrl?.startsWith('http')
      ? pdfUrl
      : `${window.location.origin}${pdfUrl?.startsWith('/') ? '' : '/'}${pdfUrl || ''}`;

    setActiveShareItem({
      title: title || 'PDF Document',
      url: fullUrl,
    });
    setCopied(false);
  };

  // লিংক কপি করার ফাংশন
  const handleCopyLink = async () => {
    if (activeShareItem) {
      await navigator.clipboard.writeText(activeShareItem.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // নেটিভ সিস্টেম শেয়ার
  const handleNativeShare = async () => {
    if (activeShareItem && navigator.share) {
      try {
        await navigator.share({
          title: activeShareItem.title,
          text: activeShareItem.title,
          url: activeShareItem.url,
        });
      } catch (err) {
        console.log('User cancelled share');
      }
    }
  };

  return (
    <section className="w-full sm:w-[95%] max-w-[1400px] mx-auto bg-white py-4 sm:py-8 px-3 sm:px-6 my-4 sm:my-6 font-sans text-gray-800 relative">
      {/* Header Titles */}
      {data.mainTitle && (
        <div className="text-center space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            {data.mainTitle}
          </h1>
          {data.subTitle && (
            <p className="text-xs sm:text-sm text-gray-500 font-medium px-2">{data.subTitle}</p>
          )}
        </div>
      )}

      {/* Section Sub Header */}
      {data.sectionHeader && (
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <span className="w-1.5 h-6 sm:h-7 bg-[#00873E] inline-block rounded-xs shrink-0" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900 tracking-tight">
            {data.sectionHeader}
          </h2>
        </div>
      )}

      {/* PDF Responsive Table Container */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#EAF3E7] text-gray-800 font-bold border-t border-b border-[#A2B8A6]">
                <th className="py-3 px-3 sm:px-4 w-12 sm:w-16 text-left">No.</th>
                <th className="py-3 px-2 sm:px-4 w-32 sm:w-56 text-left">Date</th>
                <th className="py-3 px-1 sm:px-2 w-4 text-center text-gray-400 font-normal">|</th>
                <th className="py-3 px-4 sm:px-12 text-left min-w-[180px] sm:w-[40%]">Title</th>
                <th className="py-3 px-1 sm:px-2 w-4 text-center text-gray-400 font-normal">|</th>
                <th className="py-3 px-3 sm:px-6 text-right w-24 sm:w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.items.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition">
                  <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-gray-600 text-left font-normal">{item.sl || ''}</td>
                  <td className="py-3.5 sm:py-4 px-2 sm:px-4 text-gray-700 text-left whitespace-nowrap font-normal">{item.date || ''}</td>
                  <td className="py-3.5 sm:py-4 px-1 sm:px-2 text-center text-gray-300 font-light">|</td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-12 text-gray-800 text-left font-normal leading-relaxed">{item.title || ''}</td>
                  <td className="py-3.5 sm:py-4 px-1 sm:px-2 text-center text-gray-300 font-light">|</td>
                  <td className="py-3.5 sm:py-4 px-3 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2.5">
                      {/* Download Button */}
                      <a
                        href={item.pdfUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#E2F0D9] hover:bg-[#d2e8c5] text-[#00873E] rounded-full transition"
                        title="Download PDF"
                      >
                        <Download size={16} className="sm:hidden" />
                        <Download size={18} className="hidden sm:block" />
                      </a>

                      {/* Share Button Trigger */}
                      <button
                        type="button"
                        onClick={() => openShareModal(item.pdfUrl, item.title)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#E2F0D9] hover:bg-[#d2e8c5] text-[#00873E] rounded-full transition active:scale-90 cursor-pointer"
                        title="Share Options"
                      >
                        <Share2 size={16} className="sm:hidden" />
                        <Share2 size={18} className="hidden sm:block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fully Responsive Share Modal */}
      {activeShareItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base sm:text-lg text-gray-800">Share Document</h3>
              <button
                onClick={() => setActiveShareItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X size={18} className="sm:hidden" />
                <X size={20} className="hidden sm:block" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2.5 sm:mt-3 line-clamp-2">{activeShareItem.title}</p>

            {/* App Share Grid Options */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-6">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activeShareItem.title + ' ' + activeShareItem.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-emerald-50 text-emerald-600 transition group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Send size={18} className="ml-0.5 text-emerald-600 sm:hidden" />
                  <Send size={22} className="ml-0.5 text-emerald-600 hidden sm:block" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeShareItem.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-blue-50 text-blue-600 transition group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Globe size={18} className="text-blue-600 sm:hidden" />
                  <Globe size={22} className="text-blue-600 hidden sm:block" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">Facebook</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(activeShareItem.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-sky-50 text-sky-600 transition group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Globe size={18} className="text-sky-600 sm:hidden" />
                  <Globe size={22} className="text-sky-600 hidden sm:block" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(activeShareItem.title)}&body=${encodeURIComponent(activeShareItem.url)}`}
                className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-red-50 text-red-600 transition group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition">
                  <Mail size={18} className="text-red-600 sm:hidden" />
                  <Mail size={22} className="text-red-600 hidden sm:block" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">Email</span>
              </a>

              {/* Mobile Native Share */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-purple-50 text-purple-600 transition group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition">
                    <Share2 size={18} className="text-purple-600 sm:hidden" />
                    <Share2 size={22} className="text-purple-600 hidden sm:block" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-gray-700">More</span>
                </button>
              )}
            </div>

            {/* Direct Copy Link Field */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5 sm:p-2">
              <input
                type="text"
                readOnly
                value={activeShareItem.url}
                className="bg-transparent text-[11px] sm:text-xs text-gray-600 flex-1 outline-none px-2 truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-[#00873E] hover:bg-[#006e32] text-white text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition flex items-center gap-1 shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      {data.footerNote && (
        <div className="mt-6 sm:mt-8 border-l-4 border-[#00873E] bg-gray-50 p-3 sm:p-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <span className="font-bold text-gray-900">Note: </span>
          {data.footerNote}
        </div>
      )}
    </section>
  );
}