
import { useState, useEffect } from 'react';
import { Pet } from '@/lib/types';
import PetCard from '@/components/PetCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, X } from 'lucide-react';

// Sample data for pets
const samplePets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    age: '2 years',
    breed: 'Tabby Cat',
    gender: 'Female',
    size: 'Medium',
    type: 'Cat',
    description: 'Luna is a friendly and playful Tabby cat who loves to cuddle. She gets along well with other pets and is looking for a loving home.',
    imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    goodWith: ['Children', 'Other Cats'],
    personality: ['Playful', 'Affectionate', 'Curious'],
    dateAdded: '2023-10-01'
  },
  {
    id: '2',
    name: 'Max',
    age: '3 years',
    breed: 'Golden Retriever',
    gender: 'Male',
    size: 'Large',
    type: 'Dog',
    description: 'Max is a gentle and loving Golden Retriever who enjoys outdoor activities. He is great with children and would make a perfect family companion.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    goodWith: ['Children', 'Other Dogs', 'Cats'],
    personality: ['Loyal', 'Friendly', 'Energetic'],
    dateAdded: '2023-09-15'
  },
  {
    id: '3',
    name: 'Bella',
    age: '1 year',
    breed: 'Beagle Mix',
    gender: 'Female',
    size: 'Medium',
    type: 'Dog',
    description: 'Bella is a curious and friendly Beagle mix. She loves exploring and is eager to please. She would thrive in an active household.',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    goodWith: ['Children', 'Other Dogs'],
    personality: ['Smart', 'Curious', 'Active'],
    dateAdded: '2023-10-05'
  },
  {
    id: '4',
    name: 'Charlie',
    age: '4 years',
    breed: 'Domestic Shorthair',
    gender: 'Male',
    size: 'Medium',
    type: 'Cat',
    description: 'Charlie is a laid-back cat who enjoys lounging and occasional play sessions. He\'s looking for a quiet home where he can relax.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    status: 'Adopted',
    goodWith: ['Adults', 'Seniors'],
    personality: ['Calm', 'Independent', 'Gentle'],
    dateAdded: '2023-09-10'
  },
  {
    id: '5',
    name: 'Daisy',
    age: '6 months',
    breed: 'Labrador Mix',
    gender: 'Female',
    size: 'Medium',
    type: 'Dog',
    description: 'Daisy is a playful puppy full of energy and affection. She\'s quick to learn and would benefit from training and socialization.',
    imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    goodWith: ['Children', 'Other Dogs'],
    personality: ['Playful', 'Energetic', 'Smart'],
    dateAdded: '2023-10-10'
  },
  {
    id: '6',
    name: 'Oliver',
    age: '5 years',
    breed: 'Maine Coon Mix',
    gender: 'Male',
    size: 'Large',
    type: 'Cat',
    description: 'Oliver is a majestic Maine Coon with a gentle personality. He loves attention and would make a wonderful companion.',
    imageUrl: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e0e?auto=format&fit=crop&q=80&w=800',
    status: 'In Treatment',
    goodWith: ['Adults', 'Seniors', 'Other Cats'],
    personality: ['Friendly', 'Gentle', 'Affectionate'],
    dateAdded: '2023-09-20'
  }
];

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: [] as string[],
    status: [] as string[],
    size: [] as string[],
    gender: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPets(samplePets);
      setFilteredPets(samplePets);
      setIsLoading(false);
    }, 800);

    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter pets based on search query and filters
    let results = pets;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(pet => 
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.type.length) {
      results = results.filter(pet => filters.type.includes(pet.type));
    }
    
    if (filters.status.length) {
      results = results.filter(pet => filters.status.includes(pet.status));
    }
    
    if (filters.size.length) {
      results = results.filter(pet => filters.size.includes(pet.size));
    }
    
    if (filters.gender.length) {
      results = results.filter(pet => filters.gender.includes(pet.gender));
    }

    setFilteredPets(results);
  }, [searchQuery, filters, pets]);

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(item => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      status: [],
      size: [],
      gender: []
    });
    setSearchQuery('');
  };

  const filterOptions = {
    type: ['Dog', 'Cat', 'Other'],
    status: ['Available', 'Adopted', 'In Treatment'],
    size: ['Small', 'Medium', 'Large'],
    gender: ['Male', 'Female']
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Meet Our <span className="text-pawpal-teal">Pets</span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Browse our available pets and find your perfect match. Each one has been cared for, 
              vaccinated, and is ready to find their forever home.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or breed..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-pawpal-teal/20 focus:border-pawpal-teal transition-all"
                />
              </div>
              
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              {/* Clear filters */}
              {(searchQuery || Object.values(filters).some(f => f.length > 0)) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-pawpal-red border border-pawpal-red/20 hover:bg-red-50 transition-colors"
                >
                  <X size={18} className="mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="bg-muted p-4 rounded-lg mb-8 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-medium capitalize">{category}</h3>
                      <div className="space-y-1">
                        {options.map(option => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters[category as keyof typeof filters].includes(option)}
                              onChange={() => handleFilterChange(category as keyof typeof filters, option)}
                              className="h-4 w-4 rounded border-gray-300 text-pawpal-teal focus:ring-pawpal-teal"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <div className="mb-6 animate-fade-in">
            <p className="text-muted-foreground">
              Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse h-[400px]"></div>
              ))}
            </div>
          ) : filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400" 
                alt="No pets found" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 grayscale opacity-50"
              />
              <h3 className="text-xl font-semibold mb-2">No pets found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any pets matching your search criteria. Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-pawpal-teal text-white hover:bg-pawpal-dark-teal transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pets;
