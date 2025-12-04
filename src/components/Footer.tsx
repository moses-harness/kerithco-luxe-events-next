import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-wide">
              Kerith & Co. Events
            </Link>
            <p className="text-background/70 mt-3 sm:mt-4 max-w-md leading-relaxed text-sm sm:text-base">
              Creating unforgettable moments through intentional design, 
              seamless coordination, and elevated experiences.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a
                href="mailto:hello@kerithandco.com"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-background/70 hover:text-gold transition-colors text-xs sm:text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Weddings",
                "Baby Showers",
                "Social Events",
                "Corporate Events",
                "Specialty Events",
              ].map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-xs sm:text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-background/50 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Kerith & Co. Events. All rights reserved.
          </p>
          <p className="text-background/50 text-xs sm:text-sm text-center sm:text-right">
            Crafted with intention and elegance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
