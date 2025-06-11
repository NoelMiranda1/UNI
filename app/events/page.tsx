"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulating API call with fake data
    const fakeEvents: Event[] = [
      {
        id: 1,
        title: "Conferencia de Innovación Tecnológica",
        date: "20 NOV",
        time: "9:00 AM",
        location: "Auditorio Principal",
        description: "Únete a nosotros para explorar las últimas tendencias en innovación tecnológica y su impacto en la ingeniería moderna."
      },
      {
        id: 2,
        title: "Feria de Empleabilidad",
        date: "25 NOV",
        time: "10:00 AM",
        location: "Campus Central",
        description: "Conecta con empresas líderes en el sector y descubre oportunidades laborales para estudiantes y recién graduados."
      },
      {
        id: 3,
        title: "Seminario de Investigación",
        date: "30 NOV",
        time: "2:00 PM",
        location: "Sala de Conferencias",
        description: "Presentación de proyectos de investigación en curso y oportunidades de colaboración académica."
      },
      {
        id: 4,
        title: "Workshop de Desarrollo Web",
        date: "5 DIC",
        time: "3:00 PM",
        location: "Laboratorio de Computación",
        description: "Aprende las últimas tecnologías web y mejores prácticas de desarrollo."
      },
      {
        id: 5,
        title: "Congreso de Ingeniería Civil",
        date: "10 DIC",
        time: "9:00 AM",
        location: "Centro de Convenciones",
        description: "Encuentro internacional de profesionales y estudiantes de ingeniería civil."
      },
      {
        id: 6,
        title: "Hackathon UNI 2024",
        date: "15 DIC",
        time: "8:00 AM",
        location: "Campus Tecnológico",
        description: "Competencia de programación y desarrollo de soluciones innovadoras."
      }
    ];
    setEvents(fakeEvents);
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
          <h1 className="text-3xl font-bold text-gray-900">Todos los Eventos</h1>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary-dark text-white rounded-lg flex flex-col items-center justify-center mr-6">
                    <span className="text-2xl font-bold">{event.date.split(' ')[0]}</span>
                    <span className="text-sm">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}