'use client';

import { Button } from '@/components/ui/button';
import { Clock, MapPin, Calendar, ChevronLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import eventosService, { type Evento } from '@/services/eventos';
import { safeImageUrl } from '@/lib/utils';

interface EventoDetailContentProps {
  evento: Evento | null;
}

export function EventoDetailContent({ evento }: EventoDetailContentProps) {
  if (!evento) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
          <Link href="/eventos">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a eventos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const descripcion = eventosService.extractDescripcion(evento.descripcion);
  const fecha = eventosService.formatDate(evento.fecha);
  const imageUrl = evento.imagenes?.[0]?.imagen?.url 
    ? safeImageUrl(evento.imagenes[0].imagen.url)
    : null;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: evento.titulo,
        text: descripcion,
        url: window.location.href,
      });
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {imageUrl && (
        <div className="relative h-96 w-full">
          <Image
            src={imageUrl}
            alt={evento.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-7xl">
              <Link href="/eventos">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white mb-4">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Volver a eventos
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {evento.titulo}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {!imageUrl && (
          <>
            <Link href="/eventos">
              <Button variant="outline" className="mb-6">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver a eventos
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-8">{evento.titulo}</h1>
          </>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Acerca del evento</h2>
              <div className="prose prose-lg max-w-none">
                {descripcion ? (
                  descripcion.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No hay descripción disponible para este evento.</p>
                )}
              </div>
            </div>

            {evento.imagenes && evento.imagenes.length > 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-semibold mb-6">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {evento.imagenes.slice(1).map((img, index) => {
                    const imgUrl = safeImageUrl(img.imagen.url);
                    return (
                      <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={`${evento.titulo} - Imagen ${index + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Detalles del evento</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-dark mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fecha</p>
                    <p className="text-gray-600">{fecha}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-dark mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hora</p>
                    <p className="text-gray-600">{evento.hora}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-dark mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Lugar</p>
                    <p className="text-gray-600">{evento.lugar}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button 
                  onClick={handleShare} 
                  variant="outline" 
                  className="w-full"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir evento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}