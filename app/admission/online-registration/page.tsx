'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard,
  FileText
} from 'lucide-react';

interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  fatherName: string;
  motherName: string;
  religion: string;
  bloodGroup: string;
  phone: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  sscRoll: string;
  sscBoard: string;
  sscGpa: string;
  hscRoll: string;
  hscBoard: string;
  hscGpa: string;
  appliedCourse: string;
  photo: File | null;
  signature: File | null;
  agreed: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  dob: '',
  gender: 'Male',
  fatherName: '',
  motherName: '',
  religion: 'Islam',
  bloodGroup: '',
  phone: '',
  email: '',
  presentAddress: '',
  permanentAddress: '',
  sscRoll: '',
  sscBoard: 'Dhaka',
  sscGpa: '',
  hscRoll: '',
  hscBoard: 'Dhaka',
  hscGpa: '',
  appliedCourse: '',
  photo: null,
  signature: null,
  agreed: false,
};

export default function OnlineRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'photo' | 'signature') => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.files![0] }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the terms & declaration first.');
      return;
    }

    setSubmitting(true);

    const templateParams = {
      fullName: formData.fullName,
      dob: formData.dob,
      gender: formData.gender,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      religion: formData.religion,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      email: formData.email,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      sscRoll: formData.sscRoll,
      sscBoard: formData.sscBoard,
      sscGpa: formData.sscGpa,
      hscRoll: formData.hscRoll,
      hscBoard: formData.hscBoard,
      hscGpa: formData.hscGpa,
      appliedCourse: formData.appliedCourse,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      alert('Registration Submitted & Email Sent Successfully!');
      setFormData(initialFormData);
      setStep(1);
    } catch (err) {
      console.error('EmailJS Error:', err);
      alert('Failed to send email. Please check configuration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-2xl shadow-sm font-sans">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Online Admission Registration</h2>
      <p className="text-xs text-gray-500 text-center mb-8">Fill in all the required fields step-by-step.</p>

      {/* PROGRESS BAR */}
      <div className="flex items-center justify-between mb-8 relative px-4">
        {[
          { num: 1, title: 'Personal' },
          { num: 2, title: 'Contact' },
          { num: 3, title: 'Academic' },
          { num: 4, title: 'Documents' },
          { num: 5, title: 'Review & Pay' },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
                step >= s.num ? 'bg-[#00873E] text-white' : 'bg-gray-100 text-gray-400 border'
              }`}
            >
              {step > s.num ? <CheckCircle size={18} /> : s.num}
            </div>
            <span className="text-[11px] font-semibold text-gray-600 mt-2 hidden sm:block">{s.title}</span>
          </div>
        ))}
        <div className="absolute top-4 left-8 right-8 h-[2px] bg-gray-200 -z-0">
          <div
            className="h-full bg-[#00873E] transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <User size={16} className="text-[#00873E]" /> Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block mb-1 text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. MD. ALIM HOQUE"
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="e.g. A+"
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  required
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  required
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT DETAILS */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <Phone size={16} className="text-[#00873E]" /> Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block mb-1 text-gray-700">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700">Present Address *</label>
                <textarea
                  name="presentAddress"
                  rows={2}
                  required
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-gray-700">Permanent Address *</label>
                <textarea
                  name="permanentAddress"
                  rows={2}
                  required
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ACADEMIC DETAILS */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <GraduationCap size={16} className="text-[#00873E]" /> Academic Background
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="border p-4 rounded-xl bg-gray-50 space-y-3">
                <p className="font-bold text-gray-800">SSC / Equivalent Info</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="sscRoll"
                    placeholder="SSC Roll"
                    value={formData.sscRoll}
                    onChange={handleChange}
                    className="border p-2.5 rounded-lg bg-white"
                  />
                  <select name="sscBoard" value={formData.sscBoard} onChange={handleChange} className="border p-2.5 rounded-lg bg-white">
                    <option value="Dhaka">Dhaka Board</option>
                    <option value="Rajshahi">Rajshahi Board</option>
                    <option value="Chittagong">Chittagong Board</option>
                  </select>
                  <input
                    type="text"
                    name="sscGpa"
                    placeholder="GPA"
                    value={formData.sscGpa}
                    onChange={handleChange}
                    className="border p-2.5 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="border p-4 rounded-xl bg-gray-50 space-y-3">
                <p className="font-bold text-gray-800">HSC / Equivalent Info</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="hscRoll"
                    placeholder="HSC Roll"
                    value={formData.hscRoll}
                    onChange={handleChange}
                    className="border p-2.5 rounded-lg bg-white"
                  />
                  <select name="hscBoard" value={formData.hscBoard} onChange={handleChange} className="border p-2.5 rounded-lg bg-white">
                    <option value="Dhaka">Dhaka Board</option>
                    <option value="Rajshahi">Rajshahi Board</option>
                    <option value="Chittagong">Chittagong Board</option>
                  </select>
                  <input
                    type="text"
                    name="hscGpa"
                    placeholder="GPA"
                    value={formData.hscGpa}
                    onChange={handleChange}
                    className="border p-2.5 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-bold">Applying For Course / Program *</label>
                <select
                  name="appliedCourse"
                  required
                  value={formData.appliedCourse}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-[#00873E]"
                >
                  <option value="">Select Course</option>
                  <option value="MBBS">MBBS Program</option>
                  <option value="BSc Nursing">BSc Nursing</option>
                  <option value="Diploma in Pharmacy">Diploma in Pharmacy</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DOCUMENT UPLOAD */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <Upload size={16} className="text-[#00873E]" /> Document Uploads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="border-2 border-dashed p-6 text-center rounded-xl bg-gray-50 flex flex-col items-center justify-center">
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="font-bold text-gray-700 mb-1">Upload Applicant Photo</p>
                <p className="text-[10px] text-gray-400 mb-3">PNG, JPG up to 2MB (300x300 px)</p>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} className="text-xs text-gray-500" />
              </div>

              <div className="border-2 border-dashed p-6 text-center rounded-xl bg-gray-50 flex flex-col items-center justify-center">
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="font-bold text-gray-700 mb-1">Upload Signature</p>
                <p className="text-[10px] text-gray-400 mb-3">PNG, JPG up to 1MB (300x80 px)</p>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'signature')} className="text-xs text-gray-500" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & PAYMENT */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <FileText size={16} className="text-[#00873E]" /> Review Information & Submit
            </h3>

            <div className="bg-gray-50 border p-4 rounded-xl text-xs space-y-2">
              <p><strong>Name:</strong> {formData.fullName || 'N/A'}</p>
              <p><strong>Course:</strong> {formData.appliedCourse || 'N/A'}</p>
              <p><strong>Phone:</strong> {formData.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
            </div>

            <div className="border p-4 rounded-xl bg-emerald-50 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#00873E]">
                <CreditCard size={18} /> Application Fee: 1,000 BDT
              </div>
              <p className="text-gray-600 text-[11px]">You can pay via Online Payment Gateway after clicking submit.</p>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={formData.agreed}
                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                className="mt-0.5 rounded text-[#00873E] focus:ring-[#00873E]"
              />
              <span>I hereby declare that all given information is correct and true.</span>
            </label>
          </div>
        )}

        {/* STEP NAVIGATION BUTTONS */}
        <div className="mt-8 pt-4 border-t flex justify-between gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2.5 rounded-xl border bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <div className="ml-auto flex gap-2">
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-1 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#00873E] text-white hover:bg-[#006e33] transition"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !formData.agreed}
                className="flex items-center gap-1 text-xs font-bold px-6 py-2.5 rounded-xl bg-[#00873E] text-white hover:bg-[#006e33] disabled:opacity-50 transition"
              >
                {submitting ? 'Submitting...' : 'Submit & Pay'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}