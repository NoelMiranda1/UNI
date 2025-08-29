"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import eventosService, { type Evento } from "@/services/eventos";
import { PageLoader } from "@/components/ui/page-loader";
import Image from "next/image";

export function EventsSection() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await eventosService.getEventos({ limit: 5 });
        setEvents(response.docs);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
        <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.toLocaleDateString('es-NI', { month: 'short' }).toUpperCase();
    return { dia, mes };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Próximos Eventos</h2>
        <Link href="/eventos">
          <Button variant="outline" className="text-primary-dark hover:text-primary">
            Ver más
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {events.map((event) => {
          const { dia, mes } = formatDate(event.fecha);
          const imageUrl = event.imagenes?.[0]?.imagen?.url 
            ? `${process.env.NEXT_PUBLIC_URL_IMAGES || 'https://cmsuni-production.up.railway.app'}${event.imagenes[0].imagen.url}`
            : null;
          
          return (
            <Link href={`/eventos/${event.id}`} key={event.id}>
              <Card className="hover:shadow-lg transition-shadow mb-4 overflow-hidden">
                <CardContent className="flex items-center p-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary-dark text-white rounded-lg flex flex-col items-center justify-center mr-6">
                    <span className="text-2xl font-bold">{dia}</span>
                    <span className="text-sm">{mes}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{event.titulo}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.hora}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.lugar}</span>
                      </div>
                    </div>
                  </div>
                  {imageUrl && (
                    <div className="flex-shrink-0 ml-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={event.titulo}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}