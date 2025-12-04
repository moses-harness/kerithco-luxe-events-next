"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-image.jpg"
          alt="Elegant event table setting with flowers and candles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-20 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-foreground/80 mb-4 sm:mb-6 animate-fade-up opacity-0 delay-100">
            Luxury Event Planning
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 sm:mb-8 leading-tight animate-fade-up opacity-0 delay-200 px-2">
            Kerith & Co.
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mt-1 sm:mt-2 italic">
              Events
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-up opacity-0 delay-300 px-4">
            Crafting unforgettable moments through intentional design, 
            seamless coordination, and elevated experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up opacity-0 delay-400 px-4">
            <Button variant="luxury" size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/booking">Book Your Consultation</Link>
            </Button>
            <Button variant="luxury-outline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-fade-up opacity-0 delay-500">
        <a href="#about" className="flex flex-col items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-foreground/30" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
