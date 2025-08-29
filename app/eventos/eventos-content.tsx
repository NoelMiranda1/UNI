'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import eventosService, { type Evento } from '@/services/eventos';

interface EventosContentProps {
  eventos: Evento[];
}

export function EventosContent({ eventos }: EventosContentProps) {
  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.toLocaleDateString('es-NI', { month: 'short' }).toUpperCase();
    const año = date.getFullYear();
    return { dia, mes, año };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-dark text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Eventos</h1>
          <p className="mt-4 text-lg">Mantente informado sobre todos los eventos y actividades de la UNI</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {eventos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay eventos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => {
              const { dia, mes, año } = formatDate(evento.fecha);
              const imageUrl = evento.imagenes?.[0]?.imagen?.url 
                ? `${process.env.NEXT_PUBLIC_URL_IMAGES || 'https://cmsuni-production.up.railway.app'}${evento.imagenes[0].imagen.url}`
                : null;
              const descripcion = eventosService.extractDescripcion(evento.descripcion);
              
              return (
                <Link href={`/eventos/${evento.id}`} key={evento.id}>
                  <Card className="hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                    {imageUrl && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={imageUrl}
                          alt={evento.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 bg-primary-dark text-white rounded-lg p-3 shadow-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{dia}</div>
                            <div className="text-xs uppercase">{mes}</div>
                            <div className="text-xs">{año}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      {!imageUrl && (
                        <div className="flex items-center mb-4">
                          <div className="bg-primary-dark text-white rounded-lg p-3 mr-4">
                            <div className="text-center">
                              <div className="text-xl font-bold">{dia}</div>
                              <div className="text-xs uppercase">{mes}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            {año}
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 transition-colors">
                        {evento.titulo}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{evento.hora}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{evento.lugar}</span>
                        </div>
                      </div>
                      {descripcion && (
                        <p className="mt-4 text-gray-600 line-clamp-3">
                          {descripcion}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}