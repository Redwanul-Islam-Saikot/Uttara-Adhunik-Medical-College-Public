'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  ArrowRight,
  ArrowUpRight,
  Menu,
} from 'lucide-react';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

// --- Interfaces ---
interface HeaderConfig {
  addressLine1?: string;
  addressLine2?: string;
  email?: string;
  phone?: string;
  collegeName?: string;
  collegeSubtitle?: string;
  logoUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

interface SubDropdownItem {
  name: string;
  href: string;
}

interface DropdownItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: SubDropdownItem[];
}

interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openSubAccordion, setOpenSubAccordion] = useState<string | null>(null);
  const [headerInfo, setHeaderInfo] = useState<HeaderConfig | null>(null);

  // Dynamic API Fetch
  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const res = await fetch('/api/header-info');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setHeaderInfo(json.data[0]);
        } else {
          setHeaderInfo({});
        }
      } catch (err) {
        console.error('Failed fetching header data', err);
        setHeaderInfo({});
      }
    }
    fetchHeaderData();
  }, []);

  // Handlers for Mobile Accordions
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleSubAccordion = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    setOpenSubAccordion(openSubAccordion === name ? null : name);
  };

  // Nav Links Structure
  const navLinks: NavLink[] = [
    { name: 'HOME', href: '/' },
    {
      name: 'ABOUT UAMC',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Overview', href: '/about-uamc/overview' },
        { name: 'History of UAMC', href: '/about-uamc/history' },
        { name: 'Vision & Mission', href: '/about-uamc/vision' },
        { name: 'Aim & Objective', href: '/about-uamc/aims-objective' },
        { name: 'Organizational Structure', href: '/about-uamc/structure' },
        { name: 'Founder Member', href: '/about-uamc/founder-member' },
        { name: 'EC Members', href: '/about-uamc/ec-members' },
        { name: 'GB Members', href: '/about-uamc/gb-members' },       
      ],
    },
    {
      name: 'FACILITIES',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hospital Service', href: '/facilities/hospital-service' },
        { name: 'Departments', href: '/facilities/departments' },
        { name: 'Library', href: '/facilities/library' },
        { name: 'Medical Education Unit', href: '/facilities/me-unit' },
        { name: 'Training', href: '/facilities/training' },
        { name: 'Seminar', href: '/facilities/seminar' },
        { name: 'Hostel', href: '/facilities/hostel' },
        { name: 'Laboratory', href: '/facilities/laboratory' },
        { name: 'Cafeteria', href: '/facilities/cafeteria' },
      ],
    },
    {
      name: 'ADMISSION',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
       { name: 'Admission Procedure & Fees', href: '/admission/admission-procedure' },
       { name: 'Admission Papers', href: '/admission/admission-papers' },
       { name: 'Application Form', href: '/admission/application-form' },
       { name: 'Admission Results', href: '/admission/results' },
       { name: 'Online Registration', href: '/admission/online-registration' },
      ],
    },
    { name: 'NOTICE & MEDIA', href: '/notice-media' },
    { name: 'CAREER', href: '/career' },
  ];

  const portalLinks = [
    { name: 'Student Portal', href: '#' },
    { name: 'Teachers Portal', href: '#' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Events', href: '/events' },
    { name: 'Contact Us', href: '/contactUs' },
  ];

  // Dynamic Content Checkers
  const hasAddress = headerInfo?.addressLine1 || headerInfo?.addressLine2;
  const hasEmail = Boolean(headerInfo?.email);
  const hasPhone = Boolean(headerInfo?.phone);

  const hasFacebook = Boolean(headerInfo?.facebookUrl && headerInfo.facebookUrl !== '#');
  const hasYoutube = Boolean(headerInfo?.youtubeUrl && headerInfo.youtubeUrl !== '#');
  const hasLinkedin = Boolean(headerInfo?.linkedinUrl && headerInfo.linkedinUrl !== '#');
  const hasInstagram = Boolean(headerInfo?.instagramUrl && headerInfo.instagramUrl !== '#');

  const hasSocials = hasFacebook || hasYoutube || hasLinkedin || hasInstagram;

  return (
    <header className="w-full bg-white font-sans text-[#222222] relative z-50">
      {/* ---------------- TOP HEADER BAR (Desktop) ---------------- */}
      <div className="hidden lg:block border-b border-dashed border-gray-200 py-3 px-4 lg:px-8 xl:px-12 w-full">
        <div className="w-full flex flex-col xl:flex-row justify-between items-center gap-2 text-[#555555]">
          {/* Left Contact Info */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-6 gap-y-1.5 text-[13px] min-h-[24px]">
            {hasAddress && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 self-start mt-0.5" />
                <div className="flex flex-col text-[12px] leading-tight">
                  {headerInfo?.addressLine1 && <span>{headerInfo.addressLine1}</span>}
                  {headerInfo?.addressLine2 && <span>{headerInfo.addressLine2}</span>}
                </div>
              </div>
            )}

            {hasEmail && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <a href={`mailto:${headerInfo?.email}`} className="hover:text-[#008751] transition-colors">
                  {headerInfo?.email}
                </a>
              </div>
            )}

            {hasPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                <a href={`tel:${headerInfo?.phone}`} className="hover:text-[#008751] transition-colors">
                  {headerInfo?.phone}
                </a>
              </div>
            )}
          </div>

          {/* Right Portal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-8 gap-y-1.5 font-medium text-[15px] xl:text-[16px]">
            {portalLinks.map((item, idx) => (
              <span key={item.name} className="flex items-center gap-6">
                <Link href={item.href} className="px-1.5 py-1 hover:text-[#008751] transition-colors whitespace-nowrap">
                  {item.name}
                </Link>
                {idx < portalLinks.length - 1 && (
                  <span className="hidden xl:inline text-gray-300 font-light">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- MAIN NAVIGATION BAR ---------------- */}
      <div className="w-full px-4 lg:px-8 xl:px-12 py-3.5 lg:py-4 flex items-center justify-between gap-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0 min-h-[48px]">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            {headerInfo?.logoUrl ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                <img src={headerInfo.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                <img src="/Nav.png" alt="UAMC Logo" className="w-full h-full object-contain" />
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <h1 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-black leading-tight tracking-tight truncate">
                {headerInfo?.collegeName || 'Uttara Adhunik'}
              </h1>
              <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-gray-600 font-medium tracking-wide truncate">
                {headerInfo?.collegeSubtitle || 'Medical College (UAMC)'}
              </p>
            </div>
          </Link>

          {/* Vertical Separator Line */}
          {hasSocials && <div className="hidden md:block h-6 w-[1px] bg-gray-300 mx-1 shrink-0"></div>}

          {/* Dynamic Social Icons */}
          <div className="hidden md:flex items-center gap-3 text-black shrink-0">
            {hasFacebook && (
              <a href={headerInfo?.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#008751] transition-colors">
                <FaFacebookF size={15} />
              </a>
            )}
            {hasYoutube && (
              <a href={headerInfo?.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#008751] transition-colors">
                <FaYoutube size={17} />
              </a>
            )}
            {hasLinkedin && (
              <a href={headerInfo?.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#008751] transition-colors">
                <FaLinkedinIn size={15} />
              </a>
            )}
            {hasInstagram && (
              <a href={headerInfo?.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#008751] transition-colors">
                <FaInstagram size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Center/Right Main Nav Menu */}
        <nav className="hidden lg:flex items-center justify-end flex-1 gap-1 xl:gap-3 pr-4 xl:pr-8">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;

            return (
              <div key={idx} className="relative group py-2 px-1.5 xl:px-2.5">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[13px] xl:text-[14px] font-semibold tracking-wide transition-colors focus:outline-none rounded-sm ${
                    isActive ? 'text-[#008751]' : 'text-gray-800 hover:text-[#008751]'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="stroke-[2.5] transition-transform duration-200 group-hover:rotate-180 text-gray-700 group-hover:text-[#008751]"
                    />
                  )}
                </Link>

                {isActive && (
                  <div className="absolute -bottom-1 left-2 right-2 h-[2px] bg-[#008751] rounded-full"></div>
                )}

                {/* Level 1 Dropdown Menu */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 hidden group-hover:block w-[270px] bg-[#1a1a1e]/95 backdrop-blur-md shadow-2xl border-t-2 border-[#008751] z-50 transition-all duration-200">
                    {link.dropdownItems?.map((subItem, subIdx) => {
                      const hasSubMenu = subItem.hasDropdown && subItem.dropdownItems;

                      return (
                        <div key={subIdx} className="relative group/sub">
                          <Link
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-2.5 text-[13px] font-normal text-white border-b border-white/10 last:border-none hover:bg-[#FFC107] hover:text-black transition-all duration-150"
                          >
                            <span>{subItem.name}</span>
                            {hasSubMenu ? (
                              <ChevronRight size={14} className="text-gray-400 group-hover/sub:text-black" />
                            ) : (
                              <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                                <ArrowRight
                                  size={16}
                                  className="absolute text-white group-hover/sub:opacity-0 transition-all duration-150"
                                />
                                <ArrowUpRight
                                  size={18}
                                  className="absolute text-black stroke-[2.5] opacity-0 group-hover/sub:opacity-100 transition-all duration-150"
                                />
                              </span>
                            )}
                          </Link>

                          {/* Level 2 Dropdown */}
                          {hasSubMenu && (
                            <div className="absolute top-0 left-full hidden group-hover/sub:block w-[240px] bg-[#1a1a1e]/95 backdrop-blur-md shadow-2xl border-l-2 border-[#008751] z-50">
                              {subItem.dropdownItems?.map((nested, nIdx) => (
                                <Link
                                  key={nIdx}
                                  href={nested.href}
                                  className="group/nested flex items-center justify-between px-4 py-2.5 text-[12px] font-normal text-white border-b border-white/10 last:border-none hover:bg-[#FFC107] hover:text-black transition-all duration-150"
                                >
                                  <span>{nested.name}</span>
                                  <ArrowUpRight
                                    size={15}
                                    className="text-black opacity-0 group-hover/nested:opacity-100 transition-all duration-150 stroke-[2.5]"
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Search, Vertical Line & Navigation Menu Icon */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-2">
          <button aria-label="Search" className="text-black hover:text-[#008751] transition-colors p-1 rounded-sm focus:outline-none">
            <Search size={22} className="stroke-[2] sm:w-[24px] sm:h-[24px]" />
          </button>

          {/* Vertical Separator Line */}
          <div className="hidden lg:block h-6 w-[1px] bg-gray-300"></div>

          {/* Menu Icon (Figma Design Icon) */}
          <button 
            aria-label="Toggle Drawer" 
            className="hidden lg:flex items-center justify-center p-1 text-black hover:text-[#008751] transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} className="stroke-[2]" />
          </button>

          {/* Mobile Toggle Button */}
          <button
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-1 rounded-sm focus:outline-none hover:opacity-75 transition-opacity lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={26} className="text-gray-900 stroke-[2]" />
            ) : (
              <Menu size={26} className="text-gray-900 stroke-[2]" />
            )}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE / DRAWER MENU ---------------- */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-[#222222] border-t border-gray-200 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-5 sm:px-6 py-4 space-y-1">
            {navLinks.map((link, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-none py-2">
                {link.hasDropdown ? (
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between py-1 text-left focus:outline-none"
                  >
                    <span className="text-base font-semibold text-gray-800">{link.name}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-500 transition-transform duration-300 ${
                        openAccordion === idx ? 'rotate-180 text-[#008751]' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-1 text-base font-semibold text-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Level 1 Accordion */}
                {link.hasDropdown && link.dropdownItems && openAccordion === idx && (
                  <div className="pl-3 bg-gray-50 rounded-md my-1 border-l-2 border-[#008751] space-y-1 py-1">
                    {link.dropdownItems.map((sub, sIdx) => {
                      const hasNested = sub.hasDropdown && sub.dropdownItems;

                      if (hasNested) {
                        return (
                          <div key={sIdx} className="space-y-1">
                            <button
                              onClick={(e) => toggleSubAccordion(e, sub.name)}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-black"
                            >
                              <span>{sub.name}</span>
                              <ChevronRight
                                size={14}
                                className={`transition-transform duration-200 ${
                                  openSubAccordion === sub.name ? 'rotate-90 text-[#008751]' : ''
                                }`}
                              />
                            </button>

                            {/* Level 2 Accordion */}
                            {openSubAccordion === sub.name && (
                              <div className="ml-3 pl-2 border-l border-emerald-300 space-y-1 py-1">
                                {sub.dropdownItems?.map((nested, nIdx) => (
                                  <Link
                                    key={nIdx}
                                    href={nested.href}
                                    className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-[#FFC107] hover:text-black rounded-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <span>{nested.name}</span>
                                    <ArrowUpRight size={13} className="stroke-[2]" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          className="flex items-center justify-between text-sm font-medium text-gray-700 hover:text-black hover:bg-[#FFC107] px-3 py-2 transition-colors rounded-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{sub.name}</span>
                          <ArrowRight size={15} className="text-gray-400" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-4">
            {portalLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-[#008751] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}