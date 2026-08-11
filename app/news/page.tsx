'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Calendar, Search, ArrowLeft } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  date: string;
  link?: string;
}

export default function AllNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNews(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Unique category list for filter buttons
  const categories = ['All', ...Array.from(new Set(news.map((item) => item.category)))];

  // Filter news based on search query and category
  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F6FAF7] py-12 px-4 sm:px-8 md:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Back Button & Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#008751] hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#008751]">
                All Latest News
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Explore all our articles, updates, and educational insights.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-emerald-100 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 outline-none focus:border-[#008751] shadow-xs"
              />
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#008751] text-white'
                  : 'bg-white text-slate-600 hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center text-sm text-slate-500 font-medium">
            Loading all news articles...
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="py-20 text-center space-y-2">
            <h3 className="text-lg font-bold text-slate-700">No news found</h3>
            <p className="text-xs text-slate-500">
              Try searching with different keywords or category filters.
            </p>
          </div>
        )}

        {/* News Cards Grid */}
        {!loading && filteredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredNews.map((item) => (
              <div
                key={item._id}
                className="border-2 border-dashed border-[#88C4A6] p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 hover:shadow-md transition"
              >
                {/* Image Box */}
                <div className="w-full sm:w-48 h-48 sm:h-44 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Box */}
                <div className="flex flex-col justify-between h-full space-y-3 flex-1 w-full">
                  <div className="space-y-2">
                    {/* Category Yellow Badge */}
                    <span className="inline-block bg-[#FFCC00] text-slate-900 text-[11px] font-bold px-2.5 py-1 uppercase tracking-wide">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-base sm:text-lg font-bold text-[#2D3748] leading-snug line-clamp-2 hover:text-[#008751] cursor-pointer transition">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-[#008751]" />
                      <span>{item.author}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#008751]" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}