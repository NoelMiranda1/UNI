"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Book, Users, Coffee } from "lucide-react";

export default function RecintoPage() {
  const facilities = [
    {
      title: "Biblioteca Central",
      icon: <Book className="h-8 w-8 text-primary-dark" />,
      description: "Amplia colección de recursos académicos y espacios de estudio",
      image: "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg"
    },
    {
      title: "Laboratorios",
      icon: <Users className="h-8 w-8 text-primary-dark" />,
      description: "Equipamiento moderno para prácticas e investigación",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
    },
    {
      title: "Áreas Comunes",
      icon: <Coffee className="h-8 w-8 text-primary-dark" />,
      description: "Espacios de recreación y encuentro estudiantil",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg"
    },
    {
      title: "Campus Principal",
      icon: <MapPin className="h-8 w-8 text-primary-dark" />,
      description: "Infraestructura moderna y ambiente académico",
      image: "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#002D62]">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg')",
              opacity: 0.2
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nuestro Recinto
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Un espacio diseñado para el aprendizaje, la investigación y el desarrollo profesional
          </p>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 relative">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {facility.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {facility.title}
                    </h3>
                    <p className="text-gray-600">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ubicación</h2>
            <p className="mt-4 text-xl text-gray-600">
              Avenida Universitaria, Managua, Nicaragua
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.664321064889!2d-86.27539788518742!3d12.133799991422095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71598e0f9d3c8d%3A0x3fb0ce0b57cb8cb2!2sUniversidad%20Nacional%20de%20Ingenier%C3%ADa!5e0!3m2!1ses!2sni!4v1647881234567!5m2!1ses!2sni"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}