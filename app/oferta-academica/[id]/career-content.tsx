"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface Career {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  duration: string;
  credits: number;
  overview: string;
  curriculum: string[];
  jobOpportunities: string[];
  requirements: string[];
}

const careerData: { [key: string]: Career } = {
  "1": {
    id: 1,
    title: "Ingeniería en Computación",
    description: "Desarrollo de software, sistemas computacionales y tecnologías de la información.",
    icon: <BookOpen className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
    duration: "5 años",
    credits: 250,
    overview: "La carrera de Ingeniería en Computación forma profesionales capaces de diseñar, desarrollar e implementar soluciones tecnológicas innovadoras.",
    curriculum: [
      "Fundamentos de Programación",
      "Estructuras de Datos",
      "Bases de Datos",
      "Redes de Computadoras",
      "Ingeniería de Software",
      "Sistemas Operativos",
      "Inteligencia Artificial",
      "Desarrollo Web"
    ],
    jobOpportunities: [
      "Desarrollador de Software",
      "Arquitecto de Sistemas",
      "Analista de Sistemas",
      "Administrador de Bases de Datos",
      "Consultor TI"
    ],
    requirements: [
      "Bachillerato aprobado",
      "Aprobar examen de admisión",
      "Documentación completa",
      "Curso propedéutico"
    ]
  },
  "2": {
    id: 2,
    title: "Arquitectura",
    description: "Diseño arquitectónico, urbanismo y planificación de espacios.",
    icon: <BookOpen className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
    duration: "5 años",
    credits: 255,
    overview: "La carrera de Arquitectura forma profesionales con una sólida base en diseño, planificación y construcción de espacios habitables.",
    curriculum: [
      "Diseño Arquitectónico",
      "Historia de la Arquitectura",
      "Construcción",
      "Urbanismo",
      "Estructuras",
      "Instalaciones",
      "Sustentabilidad",
      "Representación Digital"
    ],
    jobOpportunities: [
      "Arquitecto Proyectista",
      "Diseñador de Interiores",
      "Urbanista",
      "Supervisor de Obra",
      "Consultor Independiente"
    ],
    requirements: [
      "Bachillerato aprobado",
      "Aprobar examen de admisión",
      "Documentación completa",
      "Curso propedéutico"
    ]
  }
};

export default function CareerContent({ id }: { id: string }) {
  const [career, setCareer] = useState<Career | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCareer(careerData[id] || null);
  }, [id]);

  if (!career) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#002D62]">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${career.image}')`,
              opacity: 0.2
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:text-gray-200"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            {career.title}
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            {career.description}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 text-white">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{career.duration}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span>{career.credits} créditos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción General</h2>
              <p className="text-gray-600">{career.overview}</p>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan de Estudios</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {career.curriculum.map((item, index) => (
                  <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
                    <BookOpen className="h-5 w-5 text-primary-dark mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Job Opportunities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Campo Laboral</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {career.jobOpportunities.map((item, index) => (
                  <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
                    <GraduationCap className="h-5 w-5 text-primary-dark mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Requisitos de Admisión</h3>
              <ul className="space-y-4">
                {career.requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-primary-dark rounded-full mr-3" />
                    {req}
                  </li>
                ))}
              </ul>
              
              <Button className="w-full mt-8 bg-primary-dark hover:bg-primary">
                Aplicar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}