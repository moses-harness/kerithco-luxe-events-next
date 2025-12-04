const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-gold mb-6">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
            Where Vision Meets Elegance
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              At Kerith & Co. Events, we believe every celebration deserves intentional design 
              and meticulous attention to detail. Founded with a passion for creating meaningful 
              experiences, we specialize in transforming your vision into breathtaking reality.
            </p>
            <p>
              Our approach combines timeless elegance with modern sophistication, ensuring each 
              event reflects the unique story of our clients. From intimate gatherings to grand 
              celebrations, we curate every element with care, clarity, and creativity.
            </p>
            <p>
              We are committed to serving clients of all backgrounds, cultures, and event styles, 
              bringing the same level of dedication and excellence to every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { number: "250+", label: "Events Curated" },
              { number: "8+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-4xl text-gold mb-2">{stat.number}</p>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
