import { FilterState } from '../types/doctor';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableSpecialties: string[];
}

export const FilterPanel = ({ filters, onFilterChange, availableSpecialties }: FilterPanelProps) => {
  const handleConsultationTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      consultationType: filters.consultationType === type ? null : type,
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({
      ...filters,
      specialties: newSpecialties,
    });
  };

  const handleSortChange = (sortBy: 'fees' | 'experience' | null) => {
    onFilterChange({
      ...filters,
      sortBy: filters.sortBy === sortBy ? null : sortBy,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
      {/* Consultation Type Filter */}
      <div className="mb-8">
        <h3 data-testid="filter-header-moc" className="text-lg font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">
          Consultation Mode
        </h3>
        <div className="space-y-3">
          <label className="flex items-center text-indigo-700 font-medium hover:text-blue-700 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
              className="mr-3 h-4 w-4 text-blue-700"
            />
            Video Consult
          </label>
          <label className="flex items-center text-indigo-700 font-medium hover:text-purple-700 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
              className="mr-3 h-4 w-4 text-purple-700"
            />
            In Clinic
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-8">
        <h3 data-testid="filter-header-speciality" className="text-lg font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">
          Speciality
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {availableSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center text-indigo-700 font-medium hover:text-indigo-900 cursor-pointer transition-colors duration-200">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="mr-3 h-4 w-4 text-indigo-700"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 data-testid="filter-header-sort" className="text-lg font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">
          Sort By
        </h3>
        <div className="space-y-3">
          <label className="flex items-center text-indigo-700 font-medium hover:text-emerald-700 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="mr-3 h-4 w-4 text-emerald-700"
            />
            Fees (Low to High)
          </label>
          <label className="flex items-center text-indigo-700 font-medium hover:text-blue-700 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="mr-3 h-4 w-4 text-blue-700"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
}; 