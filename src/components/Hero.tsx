import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, Users } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex items-center" ref={heroRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-pawpal-light-yellow/50 to-white"></div>
      
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-pawpal-teal/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-pawpal-yellow/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 animate-on-scroll">
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pawpal-light-teal text-pawpal-teal font-medium animate-fade-in">
                <Heart size={14} className="mr-1.5 animate-heartbeat" />
                Saving Lives, Creating Families
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Your Perfect <br />
              <span className="bg-gradient-to-r from-pawpal-teal to-pawpal-green bg-clip-text text-transparent">
                Furry Companion
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Noah's Ark Dog and Cat Shelter connects loving homes with pets in need. Our shelter in Pampanga provides care, 
              medical attention, and a safe haven for animals awaiting their forever families.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/pets" 
                className="bg-pawpal-teal hover:bg-pawpal-dark-teal text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-highlight transform hover:-translate-y-0.5"
              >
                Meet Our Pets
              </Link>
              <Link 
                to="/donate" 
                className="bg-white hover:bg-pawpal-light-yellow text-foreground border border-pawpal-yellow/30 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-highlight transform hover:-translate-y-0.5"
              >
                Make a Donation
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-on-scroll">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-highlight animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=1000" 
                  alt="Happy pets from PawPal shelter" 
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 glass-card p-4 rounded-2xl animate-slide-in-right shadow-highlight">
                <div className="flex items-center gap-3">
                  <div className="bg-pawpal-light-yellow p-3 rounded-full">
                    <Home className="h-5 w-5 text-pawpal-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adopted</p>
                    <p className="text-lg font-bold">250+ Pets</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-5 -right-5 glass-card p-4 rounded-2xl animate-slide-in-right shadow-highlight">
                <div className="flex items-center gap-3">
                  <div className="bg-pawpal-light-teal p-3 rounded-full">
                    <Users className="h-5 w-5 text-pawpal-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volunteers</p>
                    <p className="text-lg font-bold">50+ Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
