import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Kerith & Co. exceeded every expectation. Our wedding was absolutely flawless, and every detail was exactly as we envisioned. They made the entire process stress-free and magical.",
    name: "Sarah & Michael",
    event: "Wedding Celebration",
  },
  {
    quote:
      "The attention to detail and professionalism was outstanding. Our corporate gala was a huge success, and our guests are still talking about it months later.",
    name: "Jennifer Adams",
    event: "Corporate Gala",
  },
  {
    quote:
      "They transformed my vision into reality for my daughter's baby shower. The elegance and thoughtfulness in every element was beyond beautiful.",
    name: "Amanda Chen",
    event: "Baby Shower",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold mb-4 sm:mb-6">
            Client Love
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            The greatest reward is seeing our clients' dreams come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 sm:p-8 md:p-10 border border-border"
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-gold/40 mb-4 sm:mb-6" strokeWidth={1} />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4 sm:pt-6">
                <p className="font-serif text-base sm:text-lg text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs sm:text-sm text-gold">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
