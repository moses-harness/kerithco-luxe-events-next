import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const packages = [
  {
    name: "Essential",
    description: "Perfect for intimate gatherings",
    features: [
      "Initial consultation",
      "Venue sourcing assistance",
      "Vendor recommendations",
      "Day-of coordination (6 hours)",
      "Event timeline creation",
    ],
    highlight: false,
  },
  {
    name: "Signature",
    description: "Our most popular package",
    features: [
      "Everything in Essential",
      "Full event design & styling",
      "Complete vendor management",
      "Unlimited consultations",
      "Full-day coordination",
      "Guest management",
      "Post-event wrap-up",
    ],
    highlight: true,
  },
  {
    name: "Luxe",
    description: "The ultimate experience",
    features: [
      "Everything in Signature",
      "Bespoke design concepts",
      "Multi-day event support",
      "Destination event planning",
      "Welcome party coordination",
      "VIP concierge services",
      "Dedicated planning team",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-6">
            Investment
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            What's Included
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailored packages designed to meet your unique needs. 
            Contact us for custom pricing based on your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-8 md:p-10 border ${
                pkg.highlight
                  ? "border-gold bg-secondary/20 shadow-elegant"
                  : "border-border bg-background"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-background text-xs tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {pkg.name}
              </h3>
              <p className="text-muted-foreground mb-8">{pkg.description}</p>
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.highlight ? "gold" : "luxury-outline"}
                className="w-full"
                asChild
              >
                <Link href="/booking">Inquire Now</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 text-sm">
          All packages are customizable. Schedule a consultation to discuss your specific needs.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
