import HospitalService from '@/components/Facilities/hospital-service/hospital-info';
import UAMCFacilities from '@/components/Facilities/hospital-service/uamc-facilities';
import MedicalServices from '@/components/Facilities/hospital-service/medical-services';
import MedicalCare from '@/components/Facilities/hospital-service/medical-care';

export default function HospitalServicePage() {
  return (
    <div className="w-full">
      <HospitalService />
      <UAMCFacilities />
      <MedicalServices />
      <MedicalCare />
    </div>
  );
}