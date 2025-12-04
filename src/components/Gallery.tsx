"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryModal from "./GalleryModal";

const galleryItems = [
  {
    image: "/assets/gallery-wedding.jpg",
    images: [
      "/assets/gallery-wedding.jpg",
      "/assets/gallery-wedding-2.jpg",
      "/assets/gallery-wedding-3.jpg",
    ],
    title: "Elegant Wedding Reception",
    category: "Weddings",
  },
  {
    image: "/assets/gallery-babyshower.jpg",
    images: [
      "/assets/gallery-babyshower.jpg",
      "/assets/gallery-babyshower-2.jpg",
      "/assets/gallery-babyshower-3.jpg",
    ],
    title: "Garden Baby Shower",
    category: "Baby Showers",
  },
  {
    image: "/assets/gallery-corporate.jpg",
    images: [
      "/assets/gallery-corporate.jpg",
      "/assets/gallery-corporate-2.jpg",
      "/assets/gallery-corporate-3.jpg",
    ],
    title: "Corporate Gala Evening",
    category: "Corporate",
  },
  {
    image: "/assets/gallery-social.jpg",
    images: [
      "/assets/gallery-social.jpg",
      "/assets/gallery-social-2.jpg",
      "/assets/gallery-social-3.jpg",
    ],
    title: "Intimate Dinner Party",
    category: "Social Events",
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold mb-4 sm:mb-6">
            Our Work
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            A glimpse into the memorable moments we've helped create for our cherished clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(item)}
              className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs tracking-widest uppercase text-gold-light mb-1 sm:mb-2">
                  {item.category}
                </p>
                <h3 className="font-serif text-lg sm:text-2xl text-cream">
                  {item.title}
                </h3>
              </div>
              {/* Click indicator */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs tracking-wider uppercase text-cream/80 bg-warm-black/50 px-2 sm:px-3 py-1 rounded-full">
                  View Gallery
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        images={selectedItem?.images || []}
        title={selectedItem?.title || ""}
        category={selectedItem?.category || ""}
      />
    </section>
  );
};

export default Gallery;
