'use client';

import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactData {
  phone?: string;
  email?: string;
  location?: string;
  openHoursWeekday?: string;
  openHoursWeekend?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch('/api/contact-info')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setContactData(json.data);
        }
      })
      .catch((err) => console.error('Error fetching contact info:', err));
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert('Please agree to the UAMC privacy notice.');
      return;
    }

    if (!formRef.current) return;

    setLoading(true);
    setStatusMsg(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setStatusMsg({ type: 'success', text: 'Message sent successfully!' });
          formRef.current?.reset();
          setAgreed(false);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatusMsg({ type: 'error', text: 'Failed to send message. Please try again.' });
        }
      )
      .finally(() => setLoading(false));
  };

  const hasContactDetails =
    contactData &&
    (contactData.phone ||
      contactData.email ||
      contactData.location ||
      contactData.openHoursWeekday ||
      contactData.openHoursWeekend ||
      contactData.facebook ||
      contactData.youtube ||
      contactData.linkedin ||
      contactData.instagram);

  const hasSocials =
    contactData &&
    (contactData.facebook || contactData.youtube || contactData.linkedin || contactData.instagram);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDE: Dynamic Contact Information */}
        <div className="lg:col-span-4 bg-[#E8F3EE] p-6 md:p-8 rounded-xl space-y-6">
          <h3 className="text-xl font-bold text-[#00873E] border-b border-[#00873E]/20 pb-3">
            Contact Information
          </h3>

          {hasContactDetails ? (
            <div className="space-y-4 text-sm text-gray-800">
              {contactData.phone && (
                <div>
                  <p className="font-bold text-gray-700">Phone No:</p>
                  <p className="text-gray-600">{contactData.phone}</p>
                </div>
              )}

              {contactData.email && (
                <div>
                  <p className="font-bold text-gray-700">Email:</p>
                  <p className="text-gray-600">{contactData.email}</p>
                </div>
              )}

              {contactData.location && (
                <div>
                  <p className="font-bold text-gray-700">Location:</p>
                  <p className="text-gray-600 leading-snug">{contactData.location}</p>
                </div>
              )}

              {(contactData.openHoursWeekday || contactData.openHoursWeekend) && (
                <div>
                  <p className="font-bold text-gray-700">Open Hours:</p>
                  {contactData.openHoursWeekday && (
                    <p className="text-gray-600">{contactData.openHoursWeekday}</p>
                  )}
                  {contactData.openHoursWeekend && (
                    <p className="text-gray-600">{contactData.openHoursWeekend}</p>
                  )}
                </div>
              )}

              {hasSocials && (
                <div className="pt-2">
                  <p className="font-bold text-gray-700 mb-2">Social Media:</p>
                  <div className="flex gap-4 text-gray-700 text-base">
                    {contactData.facebook && (
                      <a
                        href={contactData.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#00873E] transition"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {contactData.youtube && (
                      <a
                        href={contactData.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#00873E] transition"
                        aria-label="YouTube"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                    {contactData.linkedin && (
                      <a
                        href={contactData.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#00873E] transition"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {contactData.instagram && (
                      <a
                        href={contactData.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#00873E] transition"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-400 py-4 text-center italic">
              No contact information available.
            </div>
          )}
        </div>

        {/* RIGHT SIDE: EmailJS Contact Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-l-4 border-[#00873E] pl-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Keep In Touch, We Want To Hear From You - Send Us Message
            </h2>
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-lg text-sm font-semibold ${
                statusMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="Enter Your First Name"
                  className="w-full bg-[#E8F3EE] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00873E]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Enter Your Last Name"
                  className="w-full bg-[#E8F3EE] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00873E]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter Your Valid Email Address"
                  className="w-full bg-[#E8F3EE] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00873E]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="user_phone"
                  required
                  placeholder="Enter Your Valid Contact Number"
                  className="w-full bg-[#E8F3EE] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00873E]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Write your Message Here
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Write your message here..."
                className="w-full bg-[#E8F3EE] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#00873E]/40"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="privacy"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#00873E] cursor-pointer"
              />
              <label htmlFor="privacy" className="text-xs text-gray-600 cursor-pointer">
                By submitting this form, you agree to the UAMC privacy notice.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#00873E] hover:bg-[#006e33] text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send you message →'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}