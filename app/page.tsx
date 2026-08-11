import HeroSection from '@/components/hero';
import NoticePublication from '@/components/noticepublication';
import AboutUs from '@/components/AboutUs';
import StatsItems from '@/components/StatsItem';
import Department from '@/components/department';
import Admission from '@/components/UAMCAdmission';
import OurFacilities from '@/components/OurFacilities';
import PrincipalMassage from '@/components/PrincipalMassage';
import CampusLife from '@/components/CampusLife';
import Alumni from '@/components/Alumni';
import News from '@/components/News';
import StudentFeedback from '@/components/StudentFeedback';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 100% Dynamic & Responsive Hero Section */}
      <HeroSection />
      <NoticePublication /> 
      <AboutUs />
      <StatsItems />
      <Department />
      <Admission />
      <OurFacilities />
      <PrincipalMassage />
      <CampusLife />
      <Alumni />
      <News />
      <StudentFeedback />
    </main>
  );
}