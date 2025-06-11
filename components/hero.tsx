"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  {
    url: "https://images.pexels.com/photos/2305098/pexels-photo-2305098.jpeg",
    caption: "Campus Principal UNI"
  },
  {
    url: "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg",
    caption: "Biblioteca Central"
  },
  {
    url: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg",
    caption: "Centro de Investigación"
  },
  {
    url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    caption: "Auditorio Principal"
  }
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image.url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 relative z-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Universidad Nacional de Ingeniería
            </h1>
            <p className="mt-4 text-xl text-gray-100">
              Formando los líderes del mañana en ingeniería y tecnología
            </p>
          </div>
          <div className="mt-10">
            <Link href="/quienes-somos">
              <Button className="group bg-white text-[#002D62] hover:bg-gray-100">
                Conoce más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === index ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}