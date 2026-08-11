'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function NoticeBoardPublicationSection() {
  const [generalList, setGeneralList] = useState<any[]>([]);
  const [admissionList, setAdmissionList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [jobList, setJobList] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [noticeTab, setNoticeTab] = useState<'general' | 'admission' | 'reports' | 'job-circular'>('general');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const noticeRes = await fetch('/api/notice');
        const noticeJson = await noticeRes.json();
        if (noticeJson?.success && Array.isArray(noticeJson.data)) {
          const allNotices = noticeJson.data;
          setGeneralList(allNotices.filter((item: any) => item.category === 'General Notice'));
          setAdmissionList(allNotices.filter((item: any) => item.category === 'Admission Notice'));
          setReportsList(allNotices.filter((item: any) => item.category === 'Reports'));
          setJobList(allNotices.filter((item: any) => item.category === 'Job Circular'));
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getActiveNoticeItems = () => {
    switch (noticeTab) {
      case 'general':
        return generalList;
      case 'admission':
        return admissionList;
      case 'reports':
        return reportsList;
      case 'job-circular':
        return jobList;
      default:
        return [];
    }
  };

  const activeNoticeItems = getActiveNoticeItems();

  const handleItemClick = (pdfUrl?: string) => {
    if (pdfUrl && pdfUrl.trim() !== '') {
      window.open(pdfUrl, '_blank');
    }
  };

  // ২ কলামে ডাটা ভাগ করার জন্য logic
  const halfIndex = Math.ceil(activeNoticeItems.length / 2);
  const leftColumnItems = activeNoticeItems.slice(0, halfIndex);
  const rightColumnItems = activeNoticeItems.slice(halfIndex);

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-8 lg:px-12 font-sans">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full max-w-[1536px] mx-auto space-y-6">
        {/* Title Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#008751]">
            Notice Board
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#eaedf4] p-1 flex items-center justify-between text-xs sm:text-sm md:text-base font-bold text-gray-800 rounded-none">
          {[
            { id: 'general', label: 'General Notice' },
            { id: 'admission', label: 'Admission Notice' },
            { id: 'reports', label: 'Reports' },
            { id: 'job-circular', label: 'Job Circular' },
          ].map((tab, idx, arr) => (
            <div key={tab.id} className="flex-1 flex items-center relative">
              <button
                onClick={() => setNoticeTab(tab.id as any)}
                className={`w-full py-3.5 px-2 text-center transition-all whitespace-nowrap uppercase tracking-wider ${
                  noticeTab === tab.id
                    ? 'bg-white text-[#008751] font-extrabold border-b-2 border-[#008751] shadow-xs'
                    : 'text-gray-600 hover:text-black font-semibold'
                }`}
              >
                {tab.label}
              </button>
              {idx < arr.length - 1 && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-[1px] bg-gray-300 shrink-0"></span>
              )}
            </div>
          ))}
        </div>

        {/* Notice Items Display — 2 Columns like the image */}
        <div className="max-h-[600px] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
              Loading notices...
            </div>
          ) : activeNoticeItems && activeNoticeItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column */}
              <div className="space-y-3">
                {leftColumnItems.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => handleItemClick(item.pdfUrl)}
                    className={`bg-[#eaedf4] hover:bg-[#dfe3ed] transition-colors p-4 flex items-center gap-4 sm:gap-5 ${
                      item.pdfUrl ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Date Box */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-[72px]">
                      <span className="text-3xl font-black text-gray-900 leading-none mb-1">
                        {item.day || '12'}
                      </span>
                      <span className="bg-[#008751] text-white text-xs font-bold px-2 py-0.5 rounded-xs whitespace-nowrap">
                        {item.monthYear || 'Mar 25'}
                      </span>
                    </div>

                    {/* Title & Time */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                        "{item.title}"
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                        <Clock size={14} className="text-gray-600 stroke-[2.5]" />
                        <span>{item.time || '3.40 PM'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {rightColumnItems.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => handleItemClick(item.pdfUrl)}
                    className={`bg-[#eaedf4] hover:bg-[#dfe3ed] transition-colors p-4 flex items-center gap-4 sm:gap-5 ${
                      item.pdfUrl ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Date Box */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-[72px]">
                      <span className="text-3xl font-black text-gray-900 leading-none mb-1">
                        {item.day || '12'}
                      </span>
                      <span className="bg-[#008751] text-white text-xs font-bold px-2 py-0.5 rounded-xs whitespace-nowrap">
                        {item.monthYear || 'Mar 25'}
                      </span>
                    </div>

                    {/* Title & Time */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                        "{item.title}"
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                        <Clock size={14} className="text-gray-600 stroke-[2.5]" />
                        <span>{item.time || '3.40 PM'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
              No notices found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}