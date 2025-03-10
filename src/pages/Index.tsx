
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedPets from '@/components/FeaturedPets';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add scroll animation handler
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add('appear');
        }
      });
    };
    
    // Initial check for elements in viewport
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedPets />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
