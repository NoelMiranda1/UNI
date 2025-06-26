"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Cog, Loader2 } from "lucide-react";
import Link from "next/link";
import { AreaConocimiento, getFirstImage } from "@/lib/types";
import Image from "next/image";
import { createEndpoint } from "@/services/api";
import { useEffect, useState } from "react";
import { buildImageUrl } from "@/lib/utils";

export default function OfertaAcademica() {
  const [areasConocimiento, setAreasConocimiento] = useState<AreaConocimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreasConocimiento = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(createEndpoint('areas-de-conocimiento'));
        
        if (!response.ok) {
          throw new Error(`Error al cargar las áreas de conocimiento: ${response.status}`);
        }
        
        const data = await response.json();
        setAreasConocimiento(data.docs);
      } catch (err) {
        console.error('Error fetching areas de conocimiento:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchAreasConocimiento();
  }, []);

  const handleAreaClick = (area: AreaConocimiento) => {
    const areaData = encodeURIComponent(JSON.stringify(area));
    window.location.href = `/oferta-academica/area?data=${areaData}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#002D62]" />
          <p className="mt-4 text-lg text-gray-600">Cargando áreas de conocimiento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar datos</h3>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#002D62]">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')",
              opacity: 0.2
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Oferta Académica
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Descubre nuestras áreas de estudio y forma parte de la próxima generación de profesionales
            </p>
          </div>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {areasConocimiento.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay áreas disponibles</h3>
            <p className="text-gray-600">Por el momento no hay áreas de conocimiento disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areasConocimiento?.map((area) => (
              <Card 
                key={area.id} 
                className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full cursor-pointer"
                onClick={() => handleAreaClick(area)}
              >
                <div className="h-48 relative">
                  <Image
                    src={buildImageUrl(getFirstImage(area.carrerasRelacionadas[0]?.imagenes || []) ?? 'https://placehold.co/600x400.png')}
                    alt={area.nombre}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    <Cog className="h-12 w-12" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {area.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Área de conocimiento con {area.carrerasRelacionadas.length} carreras disponibles
                  </p>
                  <p className="text-sm text-gray-500">
                    {area.carrerasRelacionadas.length} carreras disponibles
                  </p>
                  <Button className="w-full mt-4 bg-[#002D62] hover:bg-[#003185] text-white">
                    Ver carreras
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ¿Necesitas más información?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nuestro equipo de admisiones está disponible para resolver tus dudas
            </p>
            <Button className="mt-8 bg-[#002D62] hover:bg-[#003185] text-white">
              Contactar Admisiones
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}