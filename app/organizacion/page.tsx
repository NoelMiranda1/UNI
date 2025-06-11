"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, BookOpen } from "lucide-react";

export default function OrganizacionPage() {
  const sections = [
    {
      title: "Misión Organizacional",
      icon: <Target className="h-8 w-8 text-primary-dark" />,
      content: "Formar profesionales en el campo de la ingeniería con alta calidad científica, tecnológica y humanística, siguiendo un modelo educativo centrado en las personas."
    },
    {
      title: "Estructura Organizativa",
      icon: <Users className="h-8 w-8 text-primary-dark" />,
      content: "Contamos con una estructura organizativa eficiente que incluye consejos facultativos, departamentos académicos y unidades administrativas que trabajan en conjunto para garantizar la excelencia educativa."
    },
    {
      title: "Acreditaciones",
      icon: <Award className="h-8 w-8 text-primary-dark" />,
      content: "La UNI mantiene acreditaciones nacionales e internacionales que avalan la calidad de nuestros programas académicos y procesos administrativos."
    },
    {
      title: "Normativas y Reglamentos",
      icon: <BookOpen className="h-8 w-8 text-primary-dark" />,
      content: "Disponemos de un marco normativo claro que regula todas las actividades académicas y administrativas, asegurando transparencia y eficiencia en nuestra gestión."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Organización Institucional</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce la estructura y organización que hace posible nuestra excelencia académica
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">
                      {section.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Autoridades Universitarias</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Rectoría",
              "Vice Rectoría Académica",
              "Vice Rectoría de Investigación",
              "Secretaría General",
              "Decanatura",
              "Dirección de Postgrado"
            ].map((authority, index) => (
              <div key={index} className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900">{authority}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}