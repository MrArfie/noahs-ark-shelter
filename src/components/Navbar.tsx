
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Pets', path: '/pets' },
    { label: 'Adopt', path: '/adopt' },
    { label: 'Donate', path: '/donate' },
    { label: 'Volunteer', path: '/volunteer' },
  ];

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            aria-label="Noah's Ark Dog and Cat Shelter Home"
          >
            <img 
              src="/lovable-uploads/9443b287-dba7-44de-96d4-c7e3bcc53ca9.png" 
              alt="Noah's Ark Logo" 
              className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="font-manrope font-bold text-xl tracking-tight relative overflow-hidden">
              <span className="bg-gradient-to-r from-pawpal-teal to-pawpal-green bg-clip-text text-transparent">
                Noah's Ark
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pawpal-teal to-pawpal-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  pathname === item.path
                    ? 'text-pawpal-teal after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-pawpal-teal after:rounded-full'
                    : 'text-foreground/80 hover:text-pawpal-teal'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/adopt"
              className="bg-pawpal-teal hover:bg-pawpal-dark-teal text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-highlight transform hover:-translate-y-0.5"
            >
              Adopt Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'py-3 text-lg font-medium border-b border-muted transition-colors',
                pathname === item.path
                  ? 'text-pawpal-teal border-pawpal-teal'
                  : 'text-foreground border-transparent'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/adopt"
            className="mt-4 bg-pawpal-teal text-white py-3 rounded-lg text-center font-medium"
          >
            Adopt Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
