
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Available Pets', path: '/pets' },
    { label: 'Adoption Process', path: '/adopt' },
    { label: 'Donate', path: '/donate' },
    { label: 'Volunteer', path: '/volunteer' },
  ];

  const resources = [
    { label: 'Pet Care Tips', path: '/resources/pet-care' },
    { label: 'Success Stories', path: '/success-stories' },
    { label: 'Events', path: '/events' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/9443b287-dba7-44de-96d4-c7e3bcc53ca9.png" 
                alt="Noah's Ark Logo" 
                className="h-10 w-10"
              />
              <span className="font-manrope font-bold text-xl bg-gradient-to-r from-pawpal-teal to-pawpal-green bg-clip-text text-transparent">
                Noah's Ark
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Noah's Ark Dog and Cat Shelter is dedicated to finding loving homes for pets in need. 
              Our shelter in Pampanga provides care and sanctuary for animals awaiting their forever families.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted p-2 rounded-full text-muted-foreground hover:text-pawpal-teal hover:bg-pawpal-light-teal transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted p-2 rounded-full text-muted-foreground hover:text-pawpal-teal hover:bg-pawpal-light-teal transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-muted p-2 rounded-full text-muted-foreground hover:text-pawpal-teal hover:bg-pawpal-light-teal transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-pawpal-teal transition-colors duration-200 animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-pawpal-teal transition-colors duration-200 animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-pawpal-teal mt-1 mr-2" />
                <span className="text-muted-foreground">
                  123 Shelter Road, San Fernando,<br />
                  Pampanga, Philippines 2000
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-pawpal-teal mr-2" />
                <a 
                  href="tel:+639123456789" 
                  className="text-muted-foreground hover:text-pawpal-teal transition-colors duration-200"
                >
                  +63 912 345 6789
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-pawpal-teal mr-2" />
                <a 
                  href="mailto:info@pawpal.org" 
                  className="text-muted-foreground hover:text-pawpal-teal transition-colors duration-200"
                >
                  info@pawpal.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} Noah's Ark Dog and Cat Shelter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
