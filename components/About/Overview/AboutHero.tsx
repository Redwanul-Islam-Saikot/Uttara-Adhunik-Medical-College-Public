'use client';

import { useState, useEffect } from 'react';

interface HeroBannerData {
  page?: string;
  breadcrumb: string;
  titleRegular: string;
  titleBold: string;
  logoUrl: string;
  bgImageUrl: string;
}

interface HeroBannerSectionProps {
  page?: string; // e.g. 'admission', 'overview', 'facilities', 'notice', 'contact'
  activeTab?: string;
  apiEndpoint?: string;
  defaultBreadcrumb?: string;
  defaultTitleRegular?: string;
  defaultTitleBold?: string;
}

export default function HeroBannerSection({
  page = 'admission',
  activeTab,
  apiEndpoint = '/api/overview/hero-banner',
  defaultBreadcrumb,
  defaultTitleRegular,
  defaultTitleBold = 'UAMC',
}: HeroBannerSectionProps) {
  const [data, setData] = useState<HeroBannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Auto fallback breadcrumb & title based on page prop
  const getPageFallback = (pageKey: string) => {
    switch (pageKey.toLowerCase()) {
      case 'notice':
        return {
          breadcrumb: defaultBreadcrumb || 'HOME > Notice & Media',
          titleRegular: defaultTitleRegular || 'Notice',
        };
      case 'contact':
        return {
          breadcrumb: defaultBreadcrumb || 'HOME > Contact Us',
          titleRegular: defaultTitleRegular || 'Contact',
        };
      case 'facilities':
        return {
          breadcrumb: defaultBreadcrumb || 'HOME > FACILITIES >> ',
          titleRegular: defaultTitleRegular || 'FACILITIES',
        };
      case 'overview':
        return {
          breadcrumb: defaultBreadcrumb || 'HOME > ABOUT UAMC >> ',
          titleRegular: defaultTitleRegular || 'About',
        };
      default:
        return {
          breadcrumb: defaultBreadcrumb || 'HOME > ADMISSION >> ',
          titleRegular: defaultTitleRegular || 'Admission',
        };
    }
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);

        const targetPage = (page || 'admission').toLowerCase();
        const requestUrl = apiEndpoint.includes('?')
          ? `${apiEndpoint}&page=${targetPage}`
          : `${apiEndpoint}?page=${targetPage}`;

        const res = await fetch(requestUrl, { cache: 'no-store' });

        if (!res.ok) {
          setData(null);
          return;
        }

        const result = await res.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          // Fallback Data
          const fallback = getPageFallback(targetPage);
          setData({
            breadcrumb: fallback.breadcrumb,
            titleRegular: fallback.titleRegular,
            titleBold: defaultTitleBold,
            logoUrl: '',
            bgImageUrl: '',
          });
        }
      } catch (err) {
        console.error('Failed to load hero banner:', err);
        const fallback = getPageFallback(page);
        setData({
          breadcrumb: fallback.breadcrumb,
          titleRegular: fallback.titleRegular,
          titleBold: defaultTitleBold,
          logoUrl: '',
          bgImageUrl: '',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [apiEndpoint, page]);

  if (loading) {
    return <div className="w-full h-48 bg-gray-100 animate-pulse" />;
  }

  if (!data) {
    return null;
  }

  const breadcrumbParts = data.breadcrumb ? data.breadcrumb.split('>>') : [];
  const mainBreadcrumb = breadcrumbParts[0] ? `${breadcrumbParts[0]}${breadcrumbParts.length > 1 ? ' >> ' : ''}` : data.breadcrumb;
  const currentActiveTab = activeTab
    ? activeTab.toUpperCase()
    : (breadcrumbParts[1] || '').trim();

  return (
    <section
      className="relative w-full bg-[#f1f8f5] py-8 sm:py-12 px-4 sm:px-8 md:px-16 bg-cover bg-center"
      style={{ backgroundImage: data.bgImageUrl ? `url(${data.bgImageUrl})` : 'none' }}
    >
      <div className="max-w-7xl mx-auto bg-[#a3d9be]/90 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs rounded-lg">
        {/* Left Side Info */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-bold tracking-wide text-gray-800 uppercase">
            <span>{mainBreadcrumb}</span>
            {currentActiveTab && (
              <span className="text-[#008751] font-bold">{currentActiveTab}</span>
            )}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-gray-800 tracking-tight">
            <span className="font-light">{data.titleRegular} </span>
            <span className="font-bold text-[#008751]">{data.titleBold}</span>
          </h1>
        </div>

        {/* Right Side Logo */}
        {data.logoUrl && (
          <div className="shrink-0 self-end md:self-center">
            <img
              src={data.logoUrl}
              alt="Logo"
              className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}