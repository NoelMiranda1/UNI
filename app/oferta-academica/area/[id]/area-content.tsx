"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { academicAreas } from '../../data';

interface Career {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  duration: string;
  credits: number;
}

interface AcademicArea {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  careers: Career[];
}

export function AreaContent({ id }: { id: string }) {
  const [area, setArea] = useState<AcademicArea | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundArea = academicAreas.find(a => a.id === id);
    setArea(foundArea || null);
  }, [id]);

  if (!area) {
    return <div>Loading...</div>;
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
              <img
                src={area.image}
                alt={area.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002D62] to-blue-800 mix-blend-multiply" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <div className="bg-white/10 p-4 rounded-full mr-6 text-white">
                  {area.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {area.title}
                  </h1>
                  <p className="mt-6 text-xl text-gray-100 max-w-3xl">
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {area.careers.map((career) => (
            <Link href={`/oferta-academica/${career.id}`} key={career.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 relative">
                  <img
                    src={career.image}
                    alt={career.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    {career.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {career.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {career.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{career.duration}</span>
                    </div>
                    <span>{career.credits} créditos</span>
                  </div>
                  <Button className="w-full mt-4 bg-[#002D62] hover:bg-[#003185] text-white">
                    Ver más
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}