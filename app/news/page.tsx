"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulating API call with fake data
    const fakeNews: NewsItem[] = [
      {
        id: 1,
        title: "Curso de Formación y Capacitación a Docentes",
        description: "Programa intensivo de desarrollo profesional para docentes universitarios.",
        date: "20 de abril de 2024",
        image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      },
      {
        id: 2,
        title: "Ceremonia de Inauguración del Evento Académico",
        description: "Apertura oficial del año académico con autoridades universitarias.",
        date: "15 de abril de 2024",
        image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg",
      },
      {
        id: 3,
        title: "Equipamiento para Laboratorio de Electrónica",
        description: "Nueva inversión en equipos de última generación para investigación.",
        date: "10 de abril de 2024",
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
      },
      {
        id: 4,
        title: "Convenio Internacional con Universidad Europea",
        description: "Firma de acuerdo para intercambio estudiantil y colaboración académica.",
        date: "5 de abril de 2024",
        image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
      },
      {
        id: 5,
        title: "Proyecto de Investigación en Energías Renovables",
        description: "Estudiantes desarrollan innovador sistema de energía solar.",
        date: "1 de abril de 2024",
        image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
      },
      {
        id: 6,
        title: "Reconocimiento Internacional en Concurso de Robótica",
        description: "Equipo de estudiantes obtiene primer lugar en competencia internacional.",
        date: "28 de marzo de 2024",
        image: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg",
      }
    ];
    setNews(fakeNews);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-primary-dark">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Todas las Noticias</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}