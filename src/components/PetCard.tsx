
import { Pet } from '@/lib/types';
import { Heart, Clock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PetCardProps {
  pet: Pet;
  featured?: boolean;
}

const PetCard = ({ pet, featured = false }: PetCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const statusColors = {
    Available: 'bg-green-100 text-green-800',
    Adopted: 'bg-blue-100 text-blue-800',
    'In Treatment': 'bg-amber-100 text-amber-800',
  };

  const handleMeetMeClick = () => {
    // Navigate to the pet details page
    navigate(`/pets/${pet.id}`);
    
    // Show a toast notification if the pet is available
    if (pet.status === 'Available') {
      toast({
        title: `Meet ${pet.name}`,
        description: `We're excited for you to meet ${pet.name}! You'll be redirected to their profile.`,
        duration: 3000,
      });
    }
  };

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-2xl bg-white border border-border transition-all duration-300 hover:shadow-highlight hover-scale group",
        featured && "md:col-span-2 lg:col-span-1"
      )}
    >
      <div className="relative overflow-hidden aspect-square md:aspect-[4/3]">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
            statusColors[pet.status]
          )}>
            {pet.status === 'Available' ? <Check size={12} className="mr-1" /> : 
             pet.status === 'In Treatment' ? <Clock size={12} className="mr-1" /> : 
             <Heart size={12} className="mr-1" />}
            {pet.status}
          </span>
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{pet.name}</h3>
            <p className="text-muted-foreground text-sm">{pet.breed}</p>
          </div>
          <div className="bg-pawpal-light-yellow p-2 rounded-full">
            <Heart 
              className="h-5 w-5 text-pawpal-yellow transition-transform duration-300 hover:scale-110 cursor-pointer" 
              fill={featured ? "#F9C80E" : "none"}
              onClick={() => {
                toast({
                  title: `${pet.name} added to favorites`,
                  description: "You can view your favorites in your profile.",
                  duration: 3000,
                });
              }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-muted rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground">Age</p>
            <p className="font-medium">{pet.age}</p>
          </div>
          <div className="bg-muted rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground">Gender</p>
            <p className="font-medium">{pet.gender}</p>
          </div>
          <div className="bg-muted rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground">Size</p>
            <p className="font-medium">{pet.size}</p>
          </div>
          <div className="bg-muted rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium">{pet.type}</p>
          </div>
        </div>
        
        {featured && (
          <p className="mt-4 text-muted-foreground line-clamp-2">{pet.description}</p>
        )}
        
        <div className="mt-5">
          <Button
            onClick={handleMeetMeClick}
            className={cn(
              "w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg font-medium transition-colors duration-300",
              pet.status === 'Available'
                ? "bg-pawpal-teal hover:bg-pawpal-dark-teal text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {pet.status === 'Available' ? 'Meet Me' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
