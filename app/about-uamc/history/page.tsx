import HistoryFrontend from '@/components/About/history/historyUAMC';
import StatsItem from '@/components/StatsItem';
import Timeline from '@/components/About/history/timeline';
import UAMCAdmission from '@/components/UAMCAdmission';

export default function HistoryPage() {
  return (
    <div className="w-full">
      <HistoryFrontend />
      <StatsItem />
      <Timeline />
      <UAMCAdmission />
    </div>
  );
}