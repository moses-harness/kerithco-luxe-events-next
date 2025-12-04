import { Heart, Baby, Users, Briefcase, Sparkles } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Weddings",
    description:
      "From intimate ceremonies to lavish celebrations, we craft every detail of your perfect day with love and precision.",
  },
  {
    icon: Baby,
    title: "Baby Showers",
    description:
      "Celebrate new beginnings with elegantly designed baby showers that honor this special milestone.",
  },
  {
    icon: Users,
    title: "Social Events",
    description:
      "Birthdays, anniversaries, and milestone celebrations designed to create lasting memories.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description:
      "Professional gatherings, galas, and corporate functions executed with sophistication and style.",
  },
  {
    icon: Sparkles,
    title: "Signature Specialty",
    description:
      "Unique, bespoke events tailored to your vision—from themed parties to exclusive gatherings.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-6">
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every event is an opportunity to create something extraordinary. 
            We offer comprehensive planning services tailored to your unique vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-background p-8 md:p-10 border border-border hover:border-gold/30 transition-all duration-500 hover:shadow-elegant"
            >
              <div className="w-14 h-14 flex items-center justify-center border border-gold/30 text-gold mb-6 group-hover:bg-gold group-hover:text-background transition-all duration-500">
                <service.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
