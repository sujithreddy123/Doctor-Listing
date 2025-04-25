import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Extract experience years from the string
  const experienceYears = parseInt(doctor.experience.split(' ')[0]);
  
  // Extract fees amount from the string
  const feesAmount = doctor.fees.replace('₹ ', '');

  return (
    <div data-testid="doctor-card" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-indigo-100">
      <div className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-md"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-100 rounded-full px-3 py-1 shadow-sm text-sm font-medium text-indigo-900">
              {doctor.name_initials}
            </div>
          </div>
          <div className="flex-1">
            <h3 data-testid="doctor-name" className="text-2xl font-bold text-indigo-900 mb-2">
              {doctor.name}
            </h3>
            <div data-testid="doctor-specialty" className="text-indigo-700 font-semibold mb-2">
              {doctor.specialities.map(s => s.name).join(', ')}
            </div>
            <div data-testid="doctor-experience" className="text-indigo-700 font-semibold mb-4">
              {doctor.experience}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-100">
              <div data-testid="doctor-fee" className="text-emerald-700 font-bold text-xl">
                {doctor.fees}
              </div>
              <div className="flex gap-2">
                {doctor.video_consult && (
                  <div className="text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-full text-sm">
                    Video Consult
                  </div>
                )}
                {doctor.in_clinic && (
                  <div className="text-purple-700 font-semibold bg-purple-50 px-4 py-2 rounded-full text-sm">
                    In Clinic
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {doctor.doctor_introduction && (
          <div className="mt-4 pt-4 border-t border-indigo-100">
            <p className="text-indigo-600 text-sm">
              {doctor.doctor_introduction}
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-indigo-100">
          <div className="flex items-center gap-4">
            <div className="text-indigo-600 text-sm">
              <span className="font-semibold">Clinic:</span> {doctor.clinic.name}
            </div>
            <div className="text-indigo-600 text-sm">
              <span className="font-semibold">Location:</span> {doctor.clinic.address.locality}, {doctor.clinic.address.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 