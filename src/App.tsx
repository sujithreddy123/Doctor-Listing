import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Doctor, FilterState } from './types/doctor';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { DoctorCard } from './components/DoctorCard';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

// Extract unique specialties from the API response
const getUniqueSpecialties = (doctors: Doctor[]): string[] => {
  const specialties = new Set<string>();
  doctors.forEach(doctor => {
    doctor.specialities.forEach(specialty => {
      specialties.add(specialty.name);
    });
  });
  return Array.from(specialties).sort();
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    consultationType: searchParams.get('consultationType'),
    specialties: searchParams.getAll('specialty'),
    sortBy: (searchParams.get('sortBy') as 'fees' | 'experience' | null) || null,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(API_URL);
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
          setFilteredDoctors(response.data);
        } else {
          setError('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors data');
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams();
    if (filters.consultationType) {
      params.set('consultationType', filters.consultationType);
    }
    filters.specialties.forEach(specialty => {
      params.append('specialty', specialty);
    });
    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    }
    setSearchParams(params);

    // Apply filters
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (filters.consultationType) {
      filtered = filtered.filter(doctor => {
        if (filters.consultationType === 'Video Consult') {
          return doctor.video_consult;
        } else if (filters.consultationType === 'In Clinic') {
          return doctor.in_clinic;
        }
        return true;
      });
    }

    // Apply specialties filter
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialities.some(specialty =>
          filters.specialties.includes(specialty.name)
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'fees') {
          const aFees = parseInt(a.fees.replace('₹ ', ''));
          const bFees = parseInt(b.fees.replace('₹ ', ''));
          return aFees - bFees;
        } else if (filters.sortBy === 'experience') {
          const aExp = parseInt(a.experience.split(' ')[0]);
          const bExp = parseInt(b.experience.split(' ')[0]);
          return bExp - aExp;
        }
        return 0;
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, filters, searchQuery, setSearchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-900 mb-4">Error</h1>
          <p className="text-gray-900 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Find a Doctor
          </h1>
          <p className="text-indigo-600 text-lg">
            Search and filter through our network of qualified healthcare professionals
          </p>
        </div>

        <SearchBar doctors={doctors} onSearch={handleSearch} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                availableSpecialties={getUniqueSpecialties(doctors)}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredDoctors.length === 0 ? (
              <div className="text-center bg-white rounded-xl shadow-md p-8 border border-indigo-100">
                <div className="text-indigo-900 font-semibold text-lg mb-2">
                  No doctors found
                </div>
                <p className="text-indigo-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
