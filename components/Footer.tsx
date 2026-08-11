'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Calendar, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// .env.local থেকে ভ্যালুগুলো নেওয়া হচ্ছে
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface Settings {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  phone: string;
  copyrightText: string;
}

interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
  link?: string;
}

export default function Footer() {
  const [data, setData] = useState<{ settings: Settings | null; posts: Post[] }>({
    settings: null,
    posts: [],
  });
  
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData({ settings: res.settings, posts: res.posts || [] });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, message: '' });

    const templateParams = {
      user_email: email,
      message: `New newsletter subscription from: ${email}`,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus({
          type: 'success',
          message: 'Thank you for subscribing!',
        });
        setEmail('');
      })
      .catch((error) => {
        console.error('EmailJS Error Detail:', error);
        setStatus({
          type: 'error',
          message: error?.text || 'Failed to send. Please check your credentials.',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const settings = data.settings || {
    logo: '',
    title: 'Uttara Adhunik',
    subtitle: 'Medical College (UAMC)',
    description: 'We are passionate education dedicated to providing high-quality resources learners all backgrounds.',
    address: 'Park, Melbourne, Australia',
    phone: '485-826-710',
    copyrightText: 'Copyright @ 2024. All Rights Reserved by Unipix',
  };

  return (
    <footer className="bg-[#050B08] text-slate-300 font-sans border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Subscribe To Newsletter
          </h2>

          <div className="flex flex-col w-full md:w-auto items-end gap-2">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full md:w-auto border border-emerald-600/60 rounded-sm overflow-hidden bg-black"
            >
              <input
                type="email"
                placeholder="Enter Your mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type) setStatus({ type: null, message: '' });
                }}
                disabled={submitting}
                className="bg-transparent px-4 py-3 text-sm text-white focus:outline-none w-full md:w-80 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-white text-slate-900 font-semibold text-xs px-6 py-3 flex items-center gap-2 hover:bg-[#008751] hover:text-white transition duration-300 shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span>Submitting</span>
                    <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>

            {status.message && (
              <div
                className={`flex items-center gap-2 text-xs font-medium mt-1 ${
                  status.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {status.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                <span>{status.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white">
                U
              </div>
            )}
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{settings.title}</h3>
              <p className="text-xs text-slate-400">{settings.subtitle}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">{settings.description}</p>
          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2.5 hover:text-red-500 transition duration-300 cursor-pointer">
              <MapPin size={14} className="text-slate-400 shrink-0" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center gap-2.5 hover:text-red-500 transition duration-300 cursor-pointer">
              <Phone size={14} className="text-slate-400 shrink-0" />
              <span>{settings.phone}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6 border-b border-slate-800 pb-2 inline-block">
            Our Campus
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            {['Academic', 'Athletics', 'Campus life', 'Research', 'Academic Area'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-red-500 transition duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6 border-b border-slate-800 pb-2 inline-block">
            Our Pages
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            {['About', 'Tution Fee', 'Alumni', 'Faculty Staff', 'Event'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-red-500 transition duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6 border-b border-slate-800 pb-2 inline-block">
            Recent Posts
          </h4>
          <div className="space-y-4">
            {data.posts.slice(0, 2).map((post) => (
              <a key={post._id} href={post.link || '#'} className="flex gap-3 group">
                <img src={post.image} alt="" className="w-16 h-14 object-cover rounded-md shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-slate-200 group-hover:text-red-500 transition duration-300 line-clamp-2">
                    {post.title}
                  </h5>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>{settings.copyrightText}</p>
      </div>
    </footer>
  );
}