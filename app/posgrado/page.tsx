"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, Brain, GraduationCap, Users, Lightbulb, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PostgradoPage() {
  const benefits = [
    {
      icon: <Brain className="h-8 w-8 text-primary-dark" />,
      title: "Especialización Avanzada",
      description: "Profundiza tus conocimientos con programas diseñados para profesionales que buscan la excelencia."
    },
    {
      icon: <Users className="h-8 w-8 text-primary-dark" />,
      title: "Networking Profesional",
      description: "Conecta con expertos y profesionales de tu área, expandiendo tus oportunidades laborales."
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary-dark" />,
      title: "Reconocimiento Internacional",
      description: "Obtén un título de postgrado reconocido internacionalmente y avalado por instituciones prestigiosas."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary-dark" />,
      title: "Investigación Innovadora",
      description: "Participa en proyectos de investigación que impactan directamente en el desarrollo del país."
    }
  ];

  const programs = [
    {
      title: "Maestrías",
      description: "Programas especializados con duración de 2 años",
      icon: <GraduationCap className="h-12 w-12 text-white" />,
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
    },
    {
      title: "Doctorados",
      description: "Investigación avanzada y desarrollo académico",
      icon: <BookOpen className="h-12 w-12 text-white" />,
      image: "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg"
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
              backgroundImage: "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')",
              opacity: 0.2
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Estudios de Postgrado
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Eleva tu carrera profesional con nuestros programas de postgrado diseñados para formar líderes en ingeniería y tecnología
          </p>
          <div className="mt-10">
            <Link href="https://posgrado.uni.edu.ni/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-primary-dark hover:bg-gray-100 group">
                Explorar Programas
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
              </div>
              <div className="relative p-8 flex flex-col items-center text-center text-white">
                <div className="bg-primary-dark/50 p-4 rounded-full mb-4">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-200">{program.description}</p>
                <Link href="https://posgrado.uni.edu.ni/" target="_blank" rel="noopener noreferrer">
                  <Button className="mt-6 bg-white text-primary-dark hover:bg-gray-100 group">
                    Ver Programas
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir un postgrado en la UNI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Da el siguiente paso en tu carrera profesional
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre nuestros programas de postgrado y comienza tu camino hacia la excelencia académica y profesional
          </p>
          <Link href="https://posgrado.uni.edu.ni/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-primary-dark hover:bg-gray-100 group">
              Aplicar Ahora
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}