'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Calendar,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

// Hardcoded Alumni Data
const featuredAlumni = [
  {
    id: 1,
    name: 'Dr. Tanvir Ahmed',
    batch: 'Batch 05 (MBBS)',
    graduationYear: '2012',
    designation: 'Senior Consultant, Cardiology',
    organization: 'National Heart Foundation & Research Institute',
    location: 'Dhaka, Bangladesh',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    quote: 'UAMC laid the solid foundation for my clinical practice and research mindset.'
  },
  {
    id: 2,
    name: 'Dr. Nusrat Jahan',
    batch: 'Batch 08 (MBBS)',
    graduationYear: '2015',
    designation: 'Postdoctoral Research Fellow',
    organization: 'Harvard Medical School',
    location: 'Boston, USA',
    image: 'https://images.unsplash.com/photo-1594824813566-7885a3964405?auto=format&fit=crop&w=600&q=80',
    quote: 'The academic rigor and mentorship at Uttara Adhunik Medical College shaped my global career.'
  },
  {
    id: 3,
    name: 'Dr. Saifullah Kazi',
    batch: 'Batch 03 (MBBS)',
    graduationYear: '2010',
    designation: 'Associate Professor, Neurosurgery',
    organization: 'Dhaka Medical College Hospital',
    location: 'Dhaka, Bangladesh',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    quote: 'Proud to be part of the UAMC legacy that continues to touch thousands of lives daily.'
  },
  {
    id: 4,
    name: 'Dr. Sabina Yasmin',
    batch: 'Batch 10 (MBBS)',
    graduationYear: '2017',
    designation: 'Specialist Pediatrician',
    organization: 'King’s College Hospital',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    quote: 'Forever grateful to my clinical professors for teaching patient care with empathy.'
  }
];

const stats = [
  { label: 'Graduated Doctors', value: '2,500+', icon: GraduationCap },
  { label: 'Global Footprint', value: '18+ Countries', icon: Globe },
  { label: 'Specialist Physicians', value: '1,200+', icon: Award },
  { label: 'Active Alumni Network', value: '100%', icon: Users },
];

const upcomingEvents = [
  {
    title: 'UAMC Global Alumni Grand Reunion 2026',
    date: 'December 20, 2026',
    location: 'UAMC Auditorium & Ground, Dhaka',
    time: '09:00 AM - 09:00 PM',
    description: 'Join us for a day of nostalgia, networking, cultural programs, and gala dinner with former classmates and professors.'
  },
  {
    title: 'Medical Career Guidance Webinar: Practicing Abroad',
    date: 'September 15, 2026',
    location: 'Online via Zoom',
    time: '07:30 PM - 09:30 PM',
    description: 'Special guidance session by overseas UAMC alumni on USMLE, PLAB, and AMC licensing examinations.'
  }
];

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [registered, setRegistered] = useState(false);

  // Form State
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    batch: '',
    passingYear: '',
    email: '',
    phone: '',
    currentPosition: '',
    hospitalOrg: '',
    country: 'Bangladesh'
  });

  const batches = ['All', 'Batch 03 (MBBS)', 'Batch 05 (MBBS)', 'Batch 08 (MBBS)', 'Batch 10 (MBBS)'];

  const filteredAlumni = featuredAlumni.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || person.batch === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
      {/* HERO BANNER SECTION */}
      <section className="relative bg-gradient-to-br from-[#00873E] via-[#006e33] to-[#004d24] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 text-amber-300">
            <GraduationCap size={16} /> UAMC Alumni Network & Guild
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Connecting Generations of Healthcare Leaders
          </h1>
          <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to the official alumni portal of Uttara Adhunik Medical College. Reconnect with peers, celebrate global achievements, and mentor future medical pioneers.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a 
              href="#register-section"
              className="bg-amber-400 text-gray-950 px-6 py-3 rounded-xl font-bold text-xs hover:bg-amber-300 transition shadow-lg flex items-center gap-2"
            >
              <UserPlus size={16} /> Join Alumni Directory
            </a>
            <a 
              href="#alumni-directory"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-bold text-xs transition backdrop-blur-sm"
            >
              Explore Notable Alumni
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
                <div className="p-3 bg-emerald-50 text-[#00873E] rounded-xl flex-shrink-0">
                  <IconComponent size={24} />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-black text-gray-900">{stat.value}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ALUMNI DIRECTORY / FEATURED ALUMNI */}
      <section id="alumni-directory" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-[#00873E] font-bold text-xs uppercase tracking-widest">Global Network</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">Notable Alumni Spotlight</h2>
            <p className="text-xs text-gray-500 mt-1">Discover where UAMC graduates are making a difference around the world.</p>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-3 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search name, hospital or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#00873E]"
              />
            </div>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
            >
              {batches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ALUMNI CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((person) => (
              <div key={person.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group flex flex-col justify-between">
                <div>
                  <div className="h-56 bg-gray-100 relative overflow-hidden">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="bg-[#00873E] text-[9px] font-bold px-2 py-0.5 rounded text-white tracking-wide">
                        {person.batch}
                      </span>
                      <h3 className="font-bold text-sm mt-1">{person.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-gray-700">
                      <Briefcase size={14} className="text-[#00873E] flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">{person.designation}</span>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">
                      <Building2 size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{person.organization}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <span>{person.location}</span>
                    </div>

                    <p className="text-[11px] text-gray-500 italic bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-3">
                      "{person.quote}"
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="text-[10px] text-right text-gray-400 font-medium border-t pt-2">
                    Graduation Year: <strong className="text-gray-700">{person.graduationYear}</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dashed text-gray-400">
              <Users size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-bold text-gray-700">No Alumni Found</p>
              <p className="text-xs">Try clearing search filter or selecting a different batch.</p>
            </div>
          )}
        </div>
      </section>

      {/* UPCOMING REUNIONS & EVENTS */}
      <section className="bg-emerald-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Reunions & Meetups</span>
            <h2 className="text-2xl md:text-4xl font-extrabold mt-1">Upcoming Alumni Events</h2>
            <p className="text-xs text-emerald-200/80 mt-2">Get together, share experiences, and relive campus memories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-amber-400/50 transition">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold bg-amber-400/10 px-3 py-1 rounded-full">
                    <Calendar size={13} /> {evt.date}
                  </div>
                  <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">{evt.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-amber-400" />
                    <span>{evt.location}</span>
                  </div>
                  <button className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                    RSVP / Join Event <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI REGISTRATION FORM SECTION */}
      <section id="register-section" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white border rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
            <div className="w-12 h-12 bg-emerald-50 text-[#00873E] rounded-2xl flex items-center justify-center mx-auto mb-2">
              <HeartHandshake size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Join the Official UAMC Alumni Guild</h2>
            <p className="text-xs text-gray-500">
              Are you a former student of UAMC? Register your profile to get invited to exclusive reunions, clinical workshops, and alumni networking opportunities.
            </p>
          </div>

          {registered ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3 max-w-lg mx-auto">
              <CheckCircle2 size={48} className="text-[#00873E] mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Registration Request Submitted!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Thank you for connecting with Uttara Adhunik Medical College Alumni Association. Our team will verify your credentials and send a confirmation email shortly.
              </p>
              <button
                onClick={() => setRegistered(false)}
                className="bg-[#00873E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#006e33] transition"
              >
                Register Another Graduate
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Full Name (Dr.) *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Dr. Mahmudul Hasan"
                    value={registrationForm.fullName}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Batch Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Batch 06 (MBBS)"
                    value={registrationForm.batch}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, batch: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Passing / Graduation Year *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 2014"
                    value={registrationForm.passingYear}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, passingYear: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. doctor@example.com"
                    value={registrationForm.email}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Current Designation / Role *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Medical Officer / FCPS Trainee"
                    value={registrationForm.currentPosition}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, currentPosition: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Hospital / Institute Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. BSMMU / Square Hospital"
                    value={registrationForm.hospitalOrg}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, hospitalOrg: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Phone Number *</label>
                  <input
                    required
                    type="text"
                    placeholder="+880 1700-000000"
                    value={registrationForm.phone}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Current Country of Practice</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangladesh / UK / USA"
                    value={registrationForm.country}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, country: e.target.value })}
                    className="w-full border p-3 rounded-xl outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#00873E] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#006e33] transition shadow-md flex items-center justify-center gap-2"
                >
                  <UserPlus size={16} /> Submit Alumni Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER CALLOUT */}
      <section className="bg-gray-100 py-8 text-center text-xs text-gray-500 border-t">
        <p>Uttara Adhunik Medical College Alumni Association &copy; {new Date().getFullYear()}. All Rights Reserved.</p>
        <p className="mt-1">For Alumni Office inquiries, email: <a href="mailto:alumni@uamc.edu.bd" className="text-[#00873E] font-semibold hover:underline">alumni@uamc.edu.bd</a></p>
      </section>
    </div>
  );
}