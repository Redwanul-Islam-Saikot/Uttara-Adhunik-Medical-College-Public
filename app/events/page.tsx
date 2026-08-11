'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Search, ChevronRight, X, Users, CalendarDays, Loader2, User } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  status: 'Upcoming' | 'Past';
  speaker?: string;
  description: string;
  image?: string;
}

export default function UAMCEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  
  // বড় করে কার্ড দেখার জন্য Modal স্টেট
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const categories = ['All', 'Academic', 'Workshop', 'Seminar', 'Cultural', 'Sports'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/uamc-events');
        const data = await res.json();
        if (Array.isArray(data)) setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((evt) => {
    const matchesSearch = evt.title.toLowerCase().includes(search.toLowerCase()) ||
                          evt.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesTab = evt.status === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
      <section className="bg-gradient-to-br from-[#00873E] to-[#005a29] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20">
            <CalendarDays size={14} className="text-amber-300" /> Campus Activities & Seminars
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Events & Academic Conferences</h1>
          <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
            Stay updated with medical workshops, scientific seminars, cultural programs, and academic events at Uttara Adhunik Medical College.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex bg-gray-200/70 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('Upcoming')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'Upcoming' ? 'bg-[#00873E] text-white shadow-sm' : 'text-gray-600'}`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('Past')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'Past' ? 'bg-[#00873E] text-white shadow-sm' : 'text-gray-600'}`}
            >
              Past Events
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search event title or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#00873E]"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-[#00873E] text-white shadow-sm' : 'bg-white text-gray-600 border'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#00873E]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((evt) => (
                <div key={evt._id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition">
                  <div>
                    <div className="h-44 bg-gray-100 relative overflow-hidden">
                      {evt.image ? (
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      ) : (
                        <div className="w-full h-full bg-emerald-900/10 flex items-center justify-center text-[#00873E]/30">
                          <CalendarDays size={56} />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] uppercase font-bold text-[#00873E] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md">
                        {evt.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-2">
                        <Calendar size={14} />
                        <span>{evt.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#00873E] transition line-clamp-2">{evt.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{evt.description}</p>
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2"><Clock size={13} className="text-gray-400" /><span>{evt.time}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={13} className="text-gray-400" /><span className="truncate">{evt.location}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-700 hover:bg-[#00873E] hover:text-white transition flex items-center justify-center gap-1 mt-4"
                    >
                      View Event Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dashed border-gray-200 text-gray-500 my-4">
                <CalendarDays className="mx-auto text-gray-300 mb-2" size={40} />
                <p className="font-bold text-gray-800 text-sm">No Events Found</p>
                <p className="text-xs text-gray-400 mt-1">There are currently no {activeTab.toLowerCase()} events published for this category.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* EVENT DETAILS LARGER MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full transition z-10"
            >
              <X size={18} />
            </button>

            {/* EXPANDED IMAGE HEADER */}
            <div className="h-64 sm:h-80 bg-gray-900 relative flex-shrink-0">
              {selectedEvent.image ? (
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-emerald-950 flex items-center justify-center text-white/20">
                  <CalendarDays size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#00873E] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider">
                  {selectedEvent.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            {/* EXPANDED DETAILS BODY */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-emerald-950">
                  <Calendar className="text-[#00873E]" size={18} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Date</p>
                    <p className="font-bold">{selectedEvent.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-emerald-950">
                  <Clock className="text-[#00873E]" size={18} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Time</p>
                    <p className="font-bold">{selectedEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-emerald-950 sm:col-span-2 mt-1">
                  <MapPin className="text-[#00873E]" size={18} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Venue Location</p>
                    <p className="font-bold">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              {selectedEvent.speaker && (
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border">
                  <div className="bg-[#00873E]/10 p-2.5 rounded-xl text-[#00873E]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium">Keynote Speaker / Chief Guest</p>
                    <p className="font-bold text-gray-900">{selectedEvent.speaker}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">About This Event</h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  {selectedEvent.description}
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-gray-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}