"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  category: string;
}

const GalleryModal = ({ isOpen, onClose, images, title, category }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl w-[95vw] sm:w-[90vw] h-[85vh] sm:h-[90vh] p-0 bg-warm-black border-none overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-warm-black/50 text-cream hover:bg-warm-black/80 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="relative w-full h-full flex flex-col">
          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-full max-h-full">
              <Image
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain animate-fade-in"
                key={currentIndex}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-warm-black/50 text-cream hover:bg-warm-black/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-warm-black/50 text-cream hover:bg-warm-black/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 sm:p-6 bg-gradient-to-t from-warm-black to-transparent">
            <p className="text-xs tracking-widest uppercase text-gold mb-1 sm:mb-2">
              {category}
            </p>
            <h3 className="font-serif text-lg sm:text-2xl text-cream mb-2 sm:mb-3">{title}</h3>
            
            {/* Dot Indicators */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-gold" : "bg-cream/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
