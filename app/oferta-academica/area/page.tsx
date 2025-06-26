"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Clock, Cog } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { AreaConocimiento, extractDescriptionText, getFirstImage } from "@/lib/types";
import { buildImageUrl } from "@/lib/utils";
import Image from 'next/image';

export default function AreaPage() {
  const [area, setArea] = useState<AreaConocimiento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const areaData = searchParams.get('data');
      if (!areaData) {
        setError('No se encontraron datos del área');
        setLoading(false);
        return;
      }

      const parsedArea = JSON.parse(decodeURIComponent(areaData)) as AreaConocimiento;
      setArea(parsedArea);
    } catch (err) {
      console.error('Error parsing area data:', err);
      setError('Error al cargar los datos del área');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Cargando área de conocimiento...</p>
        </div>
      </div>
    );
  }

  if (error || !area) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar datos</h3>
            <p className="text-red-600">{error || 'No se encontró el área solicitada'}</p>
            <Button 
              onClick={() => router.push('/oferta-academica')} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Volver a oferta académica
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="relative py-16 mb-12">
          <div className="relative">
            <div className="absolute inset-0">
              <Image
                src={buildImageUrl(getFirstImage(area.carrerasRelacionadas[0]?.imagenes || []) ?? 'https://placehold.co/1920x1080.png')}
                alt={area.nombre}
                className="h-full w-full object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002D62] to-blue-800 mix-blend-multiply" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <div className="bg-white/10 p-4 rounded-full mr-6 text-white">
                  <Cog className="h-12 w-12" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {area.nombre}
                  </h1>
                  <p className="mt-6 text-xl text-gray-100 max-w-3xl">
                    Área de conocimiento con {area.carrerasRelacionadas.length} carreras disponibles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {area?.carrerasRelacionadas?.map((carrera) => (
            <Card key={carrera.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 relative">
                <Image
                  src={buildImageUrl(getFirstImage(carrera.imagenes) ?? 'https://placehold.co/600x400.png')}
                  alt={carrera.nombre}
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
                  {carrera.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {extractDescriptionText(carrera.descripcion)}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 años</span>
                  </div>
                </div>
                {carrera.urlPerfilAcademico && (
                  <Button 
                    className="w-full mt-4 bg-[#002D62] hover:bg-[#003185] text-white"
                    onClick={() => window.open(carrera.urlPerfilAcademico, '_blank')}
                  >
                    Ver perfil académico
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 