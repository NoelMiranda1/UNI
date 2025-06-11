"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code2, Building2, Cpu, Wrench, Factory, Waves, Database, Network, Radio, TreePine, HardHat, Lightbulb, PenTool, Leaf, FlaskRound as Flask, Cog } from "lucide-react";
import Link from "next/link";

interface Area {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  careers: Career[];
}

interface Career {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  duration: string;
  credits: number;
}

const academicAreas: Area[] = [
  {
    id: "tecnologia",
    title: "Tecnología e Informática",
    description: "Carreras enfocadas en el desarrollo tecnológico y sistemas de información",
    icon: <Cog className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
    careers: [
      {
        id: 1,
        title: "Ingeniería en Computación",
        description: "Desarrollo de software, sistemas computacionales y tecnologías de la información.",
        icon: <Code2 className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
        duration: "5 años",
        credits: 250
      },
      {
        id: 8,
        title: "Ingeniería en Sistemas",
        description: "Desarrollo de sistemas de información y gestión tecnológica.",
        icon: <Database className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        duration: "5 años",
        credits: 245
      },
      {
        id: 9,
        title: "Ingeniería en Telecomunicaciones",
        description: "Redes de comunicación y sistemas de transmisión.",
        icon: <Network className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg",
        duration: "5 años",
        credits: 248
      }
    ]
  },
  {
    id: "industrial",
    title: "Ingeniería Industrial y Manufactura",
    description: "Carreras orientadas a la optimización de procesos y producción industrial",
    icon: <Factory className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
    careers: [
      {
        id: 4,
        title: "Ingeniería Mecánica",
        description: "Diseño y mantenimiento de sistemas mecánicos y térmicos.",
        icon: <Wrench className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg",
        duration: "5 años",
        credits: 248
      },
      {
        id: 5,
        title: "Ingeniería Industrial",
        description: "Optimización de procesos y gestión de la producción.",
        icon: <Factory className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        duration: "5 años",
        credits: 252
      },
      {
        id: 13,
        title: "Ingeniería en Diseño Industrial",
        description: "Diseño de productos y procesos industriales.",
        icon: <PenTool className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg",
        duration: "5 años",
        credits: 248
      }
    ]
  },
  {
    id: "construccion",
    title: "Construcción y Arquitectura",
    description: "Carreras enfocadas en el diseño y construcción de infraestructura",
    icon: <Building2 className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
    careers: [
      {
        id: 2,
        title: "Arquitectura",
        description: "Diseño arquitectónico, urbanismo y planificación de espacios.",
        icon: <Building2 className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
        duration: "5 años",
        credits: 255
      },
      {
        id: 6,
        title: "Ingeniería Civil",
        description: "Diseño y construcción de infraestructura y obras civiles.",
        icon: <HardHat className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg",
        duration: "5 años",
        credits: 255
      }
    ]
  },
  {
    id: "energia",
    title: "Energía y Electricidad",
    description: "Carreras relacionadas con sistemas eléctricos y energías renovables",
    icon: <Lightbulb className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
    careers: [
      {
        id: 3,
        title: "Ingeniería Electrónica",
        description: "Sistemas electrónicos, automatización y control industrial.",
        icon: <Cpu className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg",
        duration: "5 años",
        credits: 245
      },
      {
        id: 10,
        title: "Ingeniería Eléctrica",
        description: "Sistemas eléctricos de potencia y energía.",
        icon: <Radio className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg",
        duration: "5 años",
        credits: 252
      },
      {
        id: 12,
        title: "Ingeniería en Energías Renovables",
        description: "Sistemas de energía limpia y sostenibilidad.",
        icon: <Lightbulb className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
        duration: "5 años",
        credits: 250
      }
    ]
  },
  {
    id: "ambiental",
    title: "Ciencias Ambientales y Química",
    description: "Carreras orientadas al medio ambiente y procesos químicos",
    icon: <Leaf className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
    careers: [
      {
        id: 7,
        title: "Ingeniería Química",
        description: "Procesos químicos industriales y desarrollo de materiales.",
        icon: <Flask className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
        duration: "5 años",
        credits: 250
      },
      {
        id: 11,
        title: "Ingeniería Ambiental",
        description: "Gestión ambiental y desarrollo sostenible.",
        icon: <TreePine className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
        duration: "5 años",
        credits: 245
      }
    ]
  }
];

export default function OfertaAcademica() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academicAreas.map((area) => (
            <Link href={`/oferta-academica/area/${area.id}`} key={area.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
                <div className="h-48 relative">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    {area.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {area.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {area.careers.length} carreras disponibles
                  </p>
                  <Button className="w-full mt-4 bg-[#002D62] hover:bg-[#003185] text-white">
                    Ver carreras
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
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