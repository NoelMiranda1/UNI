"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "./ui/button";

const campusImages = [
  {
    url: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    caption: "Biblioteca Central"
  },
  {
    url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    caption: "Campus Principal"
  },
  {
    url: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg",
    caption: "Área de Investigación"
  },
  {
    url: "https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg",
    caption: "Centro de Tecnología"
  }
];

export function MultimediaSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const videoId = "aI7QivWKcMA";
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % campusImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + campusImages.length) % campusImages.length);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative rounded-lg overflow-hidden"
            aria-label="Ver video institucional en YouTube"
          >
            <img
              src={thumbnailUrl}
              alt="Video Institucional Universidad"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white/90 group-hover:bg-white shadow-lg flex items-center justify-center">
                <Play className="h-8 w-8 text-black" />
              </div>
            </div>
          </a>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Si el video no se reproduce aquí, ábrelo en YouTube.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <div className="relative h-[300px] overflow-hidden rounded-lg">
              <img
                src={campusImages[currentImage].url}
                alt={campusImages[currentImage].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-center">{campusImages[currentImage].caption}</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={previousImage}
                className="rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="rounded-full bg-white/80 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {campusImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImage === index ? "bg-[#002D62]" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}