'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function PublicationSection() {
  // Publication States
  const [journalList, setJournalList] = useState<any[]>([]);
  const [tendersList, setTendersList] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Active Tab State ('journal' | 'tenders')
  const [pubTab, setPubTab] = useState<'journal' | 'tenders'>('journal');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

  const activePubItems = getActivePubItems();

  const handleItemClick = (pdfUrl?: string) => {
    if (pdfUrl && pdfUrl.trim() !== '') {
      window.open(pdfUrl, '_blank');
    }
  };

  // ২ কলামে ডাটা ভাগ করার জন্য Logic
  const halfIndex = Math.ceil(activePubItems.length / 2);
  const leftColumnItems = activePubItems.slice(0, halfIndex);
  const rightColumnItems = activePubItems.slice(halfIndex);

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
            Publication
          </h2>
        </div>

        {/* Tab Navigation (Journal & Tenders) */}
        <div className="bg-[#eaedf4] p-1 flex items-center justify-between text-xs sm:text-sm md:text-base font-bold text-gray-800 rounded-none">
          {[
            { id: 'journal', label: 'Journal' },
            { id: 'tenders', label: 'Tenders' },
          ].map((tab, idx, arr) => (
            <div key={tab.id} className="flex-1 flex items-center relative">
              <button
                onClick={() => setPubTab(tab.id as any)}
                className={`w-full py-3.5 px-2 text-center transition-all whitespace-nowrap uppercase tracking-wider ${
                  pubTab === tab.id
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

        {/* Publication Cards Grid — 2 Columns Display */}
        <div className="max-h-[600px] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="p-8 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
              Loading publications...
            </div>
          ) : activePubItems && activePubItems.length > 0 ? (
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
              No publications found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}