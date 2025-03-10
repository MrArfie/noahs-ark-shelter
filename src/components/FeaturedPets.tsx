
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import { Pet } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

// Sample data for featured pets
const sampleFeaturedPets: Pet[] = [
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
  }
];

const FeaturedPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setPets(sampleFeaturedPets);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Meet Our <span className="text-pawpal-teal">Featured Pets</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              These lovable companions are waiting for their forever homes. Each one has a unique 
              personality and story to share.
            </p>
          </div>
          <Link
            to="/pets"
            className="group inline-flex items-center text-pawpal-teal font-medium hover:text-pawpal-dark-teal transition-colors"
          >
            View all pets
            <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-muted animate-pulse h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} featured />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPets;
