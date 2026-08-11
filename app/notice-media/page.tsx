import AboutHero from '@/components/About/Overview/AboutHero';
import LatestNews from '@/components/LatestNews';
import Notice from '@/components/Notice';
import Publications from '@/components/Publications';
import Alumni from '@/components/Alumni';
import Events from '@/components/Events';

export default function NoticePage() {
  return (
    <main>
      <AboutHero page="notice" />
      <LatestNews />
      <Notice />
      <Publications />
      <Alumni />
      <Events />
    </main>
  );
}