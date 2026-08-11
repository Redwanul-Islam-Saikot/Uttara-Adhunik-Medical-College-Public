'use client';

import { useState, useEffect } from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function NoticeBoardPublicationSection() {
  // Notice States
  const [generalList, setGeneralList] = useState<any[]>([]);
  const [admissionList, setAdmissionList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [jobList, setJobList] = useState<any[]>([]);

  // Publication States
  const [journalList, setJournalList] = useState<any[]>([]);
  const [tendersList, setTendersList] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Active Tabs
  const [noticeTab, setNoticeTab] = useState<'general' | 'admission' | 'reports' | 'job-circular'>('general');
  const [pubTab, setPubTab] = useState<'journal' | 'tenders'>('journal');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Notices
        const noticeRes = await fetch('/api/notice');
        const noticeJson = await noticeRes.json();
        if (noticeJson?.success && Array.isArray(noticeJson.data)) {
          const allNotices = noticeJson.data;
          setGeneralList(allNotices.filter((item: any) => item.category === 'General Notice'));
          setAdmissionList(allNotices.filter((item: any) => item.category === 'Admission Notice'));
          setReportsList(allNotices.filter((item: any) => item.category === 'Reports'));
          setJobList(allNotices.filter((item: any) => item.category === 'Job Circular'));
        }

        // 2. Fetch Publications
        const pubRes = await fetch('/api/publication');
        const pubJson = await pubRes.json();
        if (pubJson?.success && Array.isArray(pubJson.data)) {
          const allPubs = pubJson.data;
          setJournalList(allPubs.filter((item: any) => item.category === 'Journal'));
          setTendersList(allPubs.filter((item: any) => item.category === 'Tenders'));
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

  const getActivePubItems = () => {
    switch (pubTab) {
      case 'journal':
        return journalList;
      case 'tenders':
        return tendersList;
      default:
        return [];
    }
  };

  const activeNoticeItems = getActiveNoticeItems();
  const activePubItems = getActivePubItems();

  const handleItemClick = (pdfUrl?: string) => {
    if (pdfUrl && pdfUrl.trim() !== '') {
      window.open(pdfUrl, '_blank');
    }
  };

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

      <div className="w-full max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
        
        {/* ================= Notice Board Column ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#008751]">
              Notice Board
            </h2>
            <Link
              href="/notice"
              className="inline-flex items-center gap-1 text-lg font-bold text-[#008751] underline underline-offset-4 hover:opacity-80"
            >
              View All <ArrowUpRight size={20} className="stroke-[2.5]" />
            </Link>
          </div>

          {/* Tabs + List wrapper — tight gap between them */}
          <div>
            {/* Notice Tabs (taller padding) */}
            <div className="bg-[#eaedf4] p-1.5 flex items-center justify-between text-base sm:text-lg font-bold text-gray-800">
              {[
                { id: 'general', label: 'General Notice' },
                { id: 'admission', label: 'Admission Notice' },
                { id: 'reports', label: 'Reports' },
                { id: 'job-circular', label: 'Job Circular' },
              ].map((tab, idx, arr) => (
                <div key={tab.id} className="flex-1 flex items-center relative">
                  <button
                    onClick={() => setNoticeTab(tab.id as any)}
                    className={`w-full py-4 sm:py-5 px-2 text-center transition-all whitespace-nowrap ${
                      noticeTab === tab.id
                        ? 'bg-white text-[#008751] font-bold border-b-2 border-[#008751] shadow-xs'
                        : 'text-gray-700 hover:text-black font-semibold'
                    }`}
                  >
                    {tab.label}
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-[1px] bg-gray-300 shrink-0"></span>
                  )}
                </div>
              ))}
            </div>

            {/* Notice List — slightly narrower than tab bar, closer gap */}
            <div className="mt-2 mx-3 max-h-[440px] overflow-y-auto no-scrollbar space-y-3">
              {loading ? (
                <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                  Loading notices...
                </div>
              ) : activeNoticeItems && activeNoticeItems.length > 0 ? (
                activeNoticeItems.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => handleItemClick(item.pdfUrl)}
                    className={`bg-[#eaedf4] hover:bg-[#dfe3ed] transition-colors p-4 flex items-center gap-5 ${
                      item.pdfUrl ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Date Box */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-[76px]">
                      <span className="text-4xl font-black text-gray-900 leading-none mb-1.5">
                        {item.day || '12'}
                      </span>
                      <span className="bg-[#008751] text-white text-sm font-bold px-2.5 py-0.5 rounded-xs">
                        {item.monthYear || 'Mar 25'}
                      </span>
                    </div>

                    {/* Title & Time */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                        "{item.title}"
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-600">
                        <Clock size={17} className="text-gray-600 stroke-[2.5]" />
                        <span>{item.time || '3.40 PM'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                  No notices found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= Publication Column ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#008751]">
              Publication
            </h2>
            <Link
              href="/publications"
              className="inline-flex items-center gap-1 text-lg font-bold text-[#008751] underline underline-offset-4 hover:opacity-80"
            >
              View All <ArrowUpRight size={20} className="stroke-[2.5]" />
            </Link>
          </div>

          {/* Tabs + List wrapper — tight gap between them */}
          <div>
            {/* Publication Tabs (taller padding) */}
            <div className="bg-[#eaedf4] p-1.5 flex items-center justify-between text-base sm:text-lg font-bold text-gray-800">
              {[
                { id: 'journal', label: 'Journal' },
                { id: 'tenders', label: 'Tenders' },
              ].map((tab, idx, arr) => (
                <div key={tab.id} className="flex-1 flex items-center relative">
                  <button
                    onClick={() => setPubTab(tab.id as any)}
                    className={`w-full py-4 sm:py-5 px-2 text-center transition-all whitespace-nowrap ${
                      pubTab === tab.id
                        ? 'bg-white text-[#008751] font-bold border-b-2 border-[#008751] shadow-xs'
                        : 'text-gray-700 hover:text-black font-semibold'
                    }`}
                  >
                    {tab.label}
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-[1px] bg-gray-300 shrink-0"></span>
                  )}
                </div>
              ))}
            </div>

            {/* Publication List — slightly narrower than tab bar, closer gap */}
            <div className="mt-2 mx-3 max-h-[440px] overflow-y-auto no-scrollbar space-y-3">
              {loading ? (
                <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                  Loading publications...
                </div>
              ) : activePubItems && activePubItems.length > 0 ? (
                activePubItems.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => handleItemClick(item.pdfUrl)}
                    className={`bg-[#eaedf4] hover:bg-[#dfe3ed] transition-colors p-4 flex items-center gap-5 ${
                      item.pdfUrl ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Date Box */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-[76px]">
                      <span className="text-4xl font-black text-gray-900 leading-none mb-1.5">
                        {item.day || '12'}
                      </span>
                      <span className="bg-[#008751] text-white text-sm font-bold px-2.5 py-0.5 rounded-xs">
                        {item.monthYear || 'Mar 25'}
                      </span>
                    </div>

                    {/* Title & Time */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                        "{item.title}"
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-600">
                        <Clock size={17} className="text-gray-600 stroke-[2.5]" />
                        <span>{item.time || '3.40 PM'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                  No publications found
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}