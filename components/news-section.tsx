"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export function NewsSection() {
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
    ];
    setNews(fakeNews);
  }, []);

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Últimas Noticias</h2>
        <Link href="/news">
          <Button variant="outline" className="text-primary-dark hover:text-primary">
            Ver más
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}