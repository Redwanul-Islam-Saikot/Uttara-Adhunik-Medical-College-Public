'use client';

import { useEffect, useState } from 'react';

const API_PATH = '/api/admission/admission-procedure/students';

interface IFeeItem {
  sl: string;
  particulars: string;
  amount: string;
}

interface ISubSection {
  title: string;
  content?: string;
  bulletPoints?: string[];
}

interface IStudentCategory {
  categoryTitle: string;
  subSections?: ISubSection[];
  highlightNote?: string;
  feeSessionTitle?: string;
  fees?: IFeeItem[];
  totalPayable?: string;
  additionalNotes?: string[];
}

interface IStudentsData {
  _id?: string;
  categories?: IStudentCategory[];
  contactInfo?: {
    title?: string;
    collegeName?: string;
    address?: string;
  };
}

export default function StudentsFrontendPage() {
  const [data, setData] = useState<IStudentsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_PATH, { cache: 'no-store' });
        const result = await res.json();
        
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error('Failed to fetch students data:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ডাটা লোড হওয়ার সময় স্কেলেটন লোডার
  if (loading) {
    return (
      <div className="w-[98%] sm:w-[95%] max-w-[1400px] h-[500px] mx-auto bg-gray-100 animate-pulse my-10 rounded-xl" />
    );
  }

  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  return (
    <section className="w-[98%] sm:w-[95%] max-w-[1400px] mx-auto bg-white py-10 px-2 sm:px-4 md:px-6 my-6 rounded-xl">
      <div className="w-full font-sans text-gray-800 space-y-12">
        {/* Categories Loop */}
        {data.categories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            {/* Category Main Header with Green Accent Bar */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#00873E] inline-block rounded-xs shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                {cat.categoryTitle}
              </h2>
            </div>

            {/* SubSections (Eligibility, Selection, Quotas, etc.) */}
            {cat.subSections && cat.subSections.length > 0 && (
              <div className="space-y-5">
                {cat.subSections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    {sub.title && (
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{sub.title}</h3>
                    )}
                    {sub.content && (
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{sub.content}</p>
                    )}
                    {sub.bulletPoints && sub.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 space-y-1.5 pl-1 leading-relaxed">
                        {sub.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx}>{bp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Highlight Note */}
            {cat.highlightNote && (
              <div className="border-l-4 border-[#00873E] bg-white py-2 pl-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
                {cat.highlightNote}
              </div>
            )}

            {/* Fee Structure Table */}
            {cat.fees && cat.fees.length > 0 && (
              <div className="space-y-3 pt-2">
                {cat.feeSessionTitle && (
                  <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900">
                    {cat.feeSessionTitle}
                  </h3>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className="bg-[#EAF4EE] text-gray-800 font-semibold border-b border-gray-200">
                        <th className="p-3 w-16">Sl.</th>
                        <th className="p-3">Particulars</th>
                        <th className="p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cat.fees.map((fee, fIdx) => (
                        <tr key={fIdx} className="hover:bg-gray-50/50 transition">
                          <td className="p-3 text-gray-600">{fee.sl}</td>
                          <td className="p-3 text-gray-800">{fee.particulars}</td>
                          <td className="p-3 text-right font-medium text-gray-900">{fee.amount}</td>
                        </tr>
                      ))}
                      {cat.totalPayable && (
                        <tr className="border-t-2 border-gray-200 font-bold text-gray-900 bg-gray-50/30">
                          <td colSpan={2} className="p-3 text-right">
                            Total Payable
                          </td>
                          <td className="p-3 text-right text-gray-900">{cat.totalPayable}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Additional Notes */}
            {cat.additionalNotes && cat.additionalNotes.length > 0 && (
              <div className="border-l-4 border-[#00873E] pl-3 py-1 my-3 text-xs sm:text-sm space-y-1.5 text-gray-900 font-sans">
                {cat.additionalNotes.map((note, nIdx) => (
                  <p key={nIdx} className="leading-snug">
                    {note}
                  </p>
                ))}
              </div>
            )}

            {/* Divider between categories (Fix applied here) */}
            {data.categories && idx < data.categories.length - 1 && (
              <hr className="my-10 border-gray-200" />
            )}
          </div>
        ))}

        {/* Contact for Admission Section */}
        {data.contactInfo && (data.contactInfo.collegeName || data.contactInfo.address) && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#00873E] inline-block rounded-xs shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                {data.contactInfo.title || 'Contact for Admission'}
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-gray-700 space-y-1.5 pl-4 border-l-2 border-gray-200">
              {data.contactInfo.collegeName && (
                <p className="font-bold text-gray-900 text-sm sm:text-base">
                  {data.contactInfo.collegeName}
                </p>
              )}
              {data.contactInfo.address && (
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {data.contactInfo.address}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}