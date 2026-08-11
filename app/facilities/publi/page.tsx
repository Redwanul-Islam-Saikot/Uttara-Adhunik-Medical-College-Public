'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function PublicationSection() {
  // Publication States
  const [journalList, setJournalList] = useState<any[]>([]);
  const [tendersList, setTendersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Active Tab
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

  return (
    /* Top & Bottom padding বাড়িয়ে py-16 md:py-24 করা হয়েছে */
    <section className="w-full bg-white py-16 md:py-24 font-sans">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-[95%] max-w-[1536px] mx-auto space-y-8">
        {/* Header Title */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#008751]">
            Publication
          </h2>
        </div>

        {/* Tabs + Items Container (Space-y বাড়িয়ে 6 করা হয়েছে) */}
        <div className="space-y-6">
          {/* Publication Tabs */}
          <div className="bg-[#eaedf4] p-2 flex items-center justify-between text-base sm:text-lg font-bold text-gray-800">
            {[
              { id: 'journal', label: 'Journal' },
              { id: 'tenders', label: 'Tenders' },
            ].map((tab, idx, arr) => (
              <div key={tab.id} className="flex-1 flex items-center relative">
                <button
                  onClick={() => setPubTab(tab.id as any)}
                  className={`w-full py-5 sm:py-6 px-2 text-center transition-all whitespace-nowrap ${
                    pubTab === tab.id
                      ? 'bg-white text-[#008751] font-bold border-b-2 border-[#008751] shadow-xs'
                      : 'text-gray-700 hover:text-black font-semibold'
                  }`}
                >
                  {tab.label}
                </button>
                {idx < arr.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-gray-300 shrink-0"></span>
                )}
              </div>
            ))}
          </div>

          {/* List Wrapper */}
          <div className="max-h-[500px] overflow-y-auto no-scrollbar space-y-3 pr-0.5">
            {loading ? (
              <div className="p-12 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                Loading publications...
              </div>
            ) : activePubItems && activePubItems.length > 0 ? (
              activePubItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  onClick={() => handleItemClick(item.pdfUrl)}
                  className={`bg-[#eaedf4] hover:bg-[#dfe3ed] transition-colors py-4 px-5 md:px-6 flex items-center gap-6 ${
                    item.pdfUrl ? 'cursor-pointer' : ''
                  }`}
                >
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center shrink-0 w-[80px]">
                    <span className="text-3xl md:text-4xl font-black text-gray-900 leading-none mb-1">
                      {item.day || '12'}
                    </span>
                    <span className="bg-[#008751] text-white text-xs md:text-sm font-bold px-3 py-0.5 rounded-xs">
                      {item.monthYear || 'Mar 25'}
                    </span>
                  </div>

                  {/* Title & Time */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-1 leading-snug">
                      "{item.title}"
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600">
                      <Clock size={16} className="text-gray-600 stroke-[2.5]" />
                      <span>{item.time || '3.40 PM'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500 font-bold text-lg bg-[#eaedf4]/50">
                No publications found
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}