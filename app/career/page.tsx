'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  Search, 
  ChevronRight, 
  X, 
  Upload, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  GraduationCap, 
  Send,
  FileText,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  deadline: string;
  experience: string;
  description: string;
  requirements: string[];
}

export default function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>('');

  const departments = ['All', 'Medical', 'Nursing', 'Diagnostics', 'Administration'];

  // API থেকে Dynamic Data Fetching
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (Array.isArray(data)) {
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
      }
      if (file.size > 50 * 1024) { 
        alert('PDF size exceeds 50KB EmailJS limit. Please use Google Drive Link input below instead!');
        return;
      }
      setPdfFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const templateParams = {
      job_title: applyJob?.title || 'N/A',
      department: applyJob?.department || 'N/A',
      applicant_name: fullName,
      applicant_email: email,
      applicant_phone: phone,
      cv_link: driveLink || 'No Link Provided',
      content: pdfBase64 || '', 
    };

    try {
      await emailjs.send(
        'service_fp59dko',
        'template_oafgtg5',
        templateParams,
        'xOrgCmyABEIdMRKXp'
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setApplyJob(null);
        setFullName('');
        setEmail('');
        setPhone('');
        setDriveLink('');
        setPdfFile(null);
        setPdfBase64('');
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send application. Please try pasting Google Drive Link of your CV.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#00873E] to-[#005a29] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/20">
            <Building2 size={14} /> Join Uttara Adhunik Medical College
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Build Your Career with Us
          </h1>
          <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto font-light">
            Explore exciting clinical, academic, and administrative opportunities to shape the future of healthcare.
          </p>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-[#00873E]">
              <HeartHandshake size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Supportive Environment</h4>
              <p className="text-xs text-gray-500 mt-1">Work in an inclusive and patient-centered workspace.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-[#00873E]">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Growth & Mentorship</h4>
              <p className="text-xs text-gray-500 mt-1">Continuous clinical learning and medical education support.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-[#00873E]">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Competitive Package</h4>
              <p className="text-xs text-gray-500 mt-1">Attractive remuneration, health benefits, and allowances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOB SEARCH & FILTER */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Open Vacancies</h2>
            <p className="text-xs text-gray-500 mt-0.5">Find the right role for your medical/administrative career.</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-[#00873E] focus:ring-1 focus:ring-[#00873E]"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedDept === dept
                  ? 'bg-[#00873E] text-white shadow-sm'
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* DYNAMIC JOB CARDS / LOADING / EMPTY STATE */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#00873E]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#00873E] bg-emerald-50 px-2.5 py-1 rounded-md">
                        {job.department}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={13} /> {job.type}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base mb-2">{job.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-600 font-medium mb-6">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-gray-400" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" /> Deadline: {job.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold border text-gray-700 hover:bg-gray-50 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setApplyJob(job)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#00873E] text-white hover:bg-[#006e33] transition flex items-center justify-center gap-1"
                    >
                      Apply Now <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border text-gray-500 text-xs">
                No open positions match your search criteria.
              </div>
            )}
          </div>
        )}
      </section>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] uppercase font-bold text-[#00873E] bg-emerald-50 px-2.5 py-1 rounded-md">
              {selectedJob.department}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-2">{selectedJob.title}</h3>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 my-3">
              <span>{selectedJob.location}</span> • <span>Exp: {selectedJob.experience}</span> • <span>{selectedJob.type}</span>
            </div>

            <hr className="my-3" />

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Job Description:</h4>
                <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">Requirements:</h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00873E] mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setApplyJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#00873E] text-white hover:bg-[#006e33]"
              >
                Apply For Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION FORM MODAL */}
      {applyJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-xl relative animate-fadeIn">
            <button
              onClick={() => setApplyJob(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 size={48} className="text-[#00873E] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-500">Your application has been sent to HR email successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-gray-900">Apply for Position</h3>
                <p className="text-xs text-[#00873E] font-medium mb-4">{applyJob.title}</p>

                <form onSubmit={handleApplySubmit} className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Rahim Ahmed"
                      className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-1 focus:ring-[#00873E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahim@example.com"
                      className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-1 focus:ring-[#00873E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-1 focus:ring-[#00873E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Google Drive CV Link (Recommended)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 text-gray-400" size={14} />
                      <input
                        type="url"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-9 pr-3 p-2.5 rounded-lg bg-gray-50 border outline-none focus:ring-1 focus:ring-[#00873E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">OR Upload PDF (Under 50KB)</label>
                    <label
                      htmlFor="cv-upload"
                      className="border-2 border-dashed rounded-xl p-3 text-center bg-gray-50 cursor-pointer hover:bg-emerald-50/50 transition flex flex-col items-center justify-center block"
                    >
                      {pdfFile ? (
                        <div className="flex items-center gap-2 text-[#00873E]">
                          <FileText size={18} />
                          <span className="font-bold truncate max-w-[200px]">{pdfFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={18} className="text-gray-400 mb-1" />
                          <span className="text-[10px] text-gray-500">Upload PDF File</span>
                        </>
                      )}
                      <input
                        type="file"
                        id="cv-upload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#00873E] text-white rounded-xl font-bold hover:bg-[#006e33] transition flex items-center justify-center gap-1.5 mt-4 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending Application...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Application
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}