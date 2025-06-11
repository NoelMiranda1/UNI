"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, MapPin, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export function EventsSection() {
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
        description: "Únete a nosotros para explorar las últimas tendencias en innovación tecnológica."
      },
      {
        id: 2,
        title: "Feria de Empleabilidad",
        date: "25 NOV",
        time: "10:00 AM",
        location: "Campus Central",
        description: "Conecta con empresas líderes en el sector y descubre oportunidades laborales."
      },
      {
        id: 3,
        title: "Seminario de Investigación",
        date: "30 NOV",
        time: "2:00 PM",
        location: "Sala de Conferencias",
        description: "Presentación de proyectos de investigación en curso."
      },
      {
        id: 4,
        title: "Workshop de Desarrollo Web",
        date: "5 DIC",
        time: "3:00 PM",
        location: "Laboratorio de Computación",
        description: "Aprende las últimas tecnologías web y mejores prácticas."
      },
      {
        id: 5,
        title: "Congreso de Ingeniería Civil",
        date: "10 DIC",
        time: "9:00 AM",
        location: "Centro de Convenciones",
        description: "Encuentro internacional de profesionales y estudiantes."
      }
    ];
    setEvents(fakeEvents);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Próximos Eventos</h2>
        <Link href="/events">
          <Button variant="outline" className="text-primary-dark hover:text-primary">
            Ver más
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <Card className="hover:shadow-lg transition-shadow mb-4">
              <CardContent className="flex items-center p-6">
                <div className="flex-shrink-0 w-20 h-20 bg-primary-dark text-white rounded-lg flex flex-col items-center justify-center mr-6">
                  <span className="text-2xl font-bold">{event.date.split(' ')[0]}</span>
                  <span className="text-sm">{event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}