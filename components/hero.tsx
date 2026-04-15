"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { apiHelpers } from "@/services/api";
import { safeImageUrl } from '@/lib/utils';

// Interfaz para el tipo de imagen
interface Imagen {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

// Interfaz para el tipo de banner
interface Banner {
  imagen: Imagen;
  id: string;
}

// Interfaz para la respuesta del API
interface InicioResponse {
  docs: Array<{
    id: string;
    titulo: string;
    imagenesFondo: Array<Banner & { alt?: string }>;
    descripcion?: Array<{
      children: Array<{
        text: string;
      }>;
    }>;
    descripcionPlano?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [titulo, setTitulo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await apiHelpers.get<InicioResponse>('/inicio');
        if (response.data?.docs?.[0]) {
          const data = response.data.docs[0];
          
          // Establecer título y descripción
          setTitulo(data.titulo || 'Universidad Nacional de Ingeniería');
          setDescripcion(data.descripcionPlano || 'Formando los líderes del mañana en ingeniería y tecnología');
          
          // Procesar banners
          if (data.imagenesFondo && data.imagenesFondo.length > 0) {
            const bannersData = data.imagenesFondo;
            setBanners(bannersData);
            setImagesLoaded(new Array(bannersData.length).fill(false));
            
            // Precargar imágenes
            bannersData.forEach((banner, index) => {
              const img = new Image();
              img.onload = () => {
                setImagesLoaded(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              };
              img.src = safeImageUrl(banner.imagen.url);
            });
          }
        }
      } catch {
        // Error silencioso - usar valores por defecto
        setTitulo('Universidad Nacional de Ingeniería');
        setDescripcion('Formando los líderes del mañana en ingeniería y tecnología');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const imagesToShow = banners.map(banner => ({
    url: safeImageUrl(banner.imagen.url),
    caption: banner.imagen.filename
  }));

  // Verificar si todas las imágenes están cargadas
  const allImagesLoaded = imagesLoaded.length > 0 && imagesLoaded.every(loaded => loaded);

  return (
    <div className="relative overflow-hidden">
      {/* Loading Skeleton */}
      {(loading || !allImagesLoaded) && (
        <div className="absolute inset-0 z-0">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>
      )}

      {/* Image Carousel */}
      {!loading && banners.length > 0 && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          allImagesLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          {imagesToShow.map((image, index) => (
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
      )}

      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 relative z-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {titulo || 'Universidad Nacional de Ingeniería'}
            </h1>
            <p className="mt-4 text-xl text-gray-100">
              {descripcion || 'Formando los líderes del mañana en ingeniería y tecnología'}
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

        {/* Image Indicators - Solo mostrar cuando las imágenes estén cargadas */}
        {!loading && banners.length > 0 && allImagesLoaded && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {imagesToShow.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-white w-4" : "bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}