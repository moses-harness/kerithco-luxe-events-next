import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-wide">
              Kerith & Co. Events
            </Link>
            <p className="text-background/70 mt-4 max-w-md leading-relaxed">
              Creating unforgettable moments through intentional design, 
              seamless coordination, and elevated experiences.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:hello@kerithandco.com"
                className="w-10 h-10 flex items-center justify-center border border-background/30 text-background/70 hover:text-gold hover:border-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-background/70 hover:text-gold transition-colors text-sm"
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
            <h4 className="font-serif text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "Weddings",
                "Baby Showers",
                "Social Events",
                "Corporate Events",
                "Specialty Events",
              ].map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Kerith & Co. Events. All rights reserved.
          </p>
          <p className="text-background/50 text-sm">
            Crafted with intention and elegance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
