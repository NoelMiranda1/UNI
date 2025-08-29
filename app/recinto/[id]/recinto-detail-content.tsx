'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ChevronLeft, 
  Share2, 
  Printer,
  GraduationCap,
  Users,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import recintosService, { type Recinto } from '@/services/recintos';

interface RecintoDetailContentProps {
  recinto: Recinto | null;
}

export function RecintoDetailContent({ recinto }: RecintoDetailContentProps) {
  if (!recinto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recinto no encontrado</h2>
          <Link href="/recinto">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a recintos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const principalImage = recintosService.getPrincipalImage(recinto.fotos);
  const otherImages = recinto.fotos.filter(f => !f.principal);

  const getTipoRecinto = (nombre: string) => {
    if (nombre.toLowerCase().includes('centro universitario')) return 'Centro Regional';
    if (nombre.toLowerCase().includes('finca')) return 'Sede Especializada';
    if (nombre.toLowerCase().includes('pedro aráuz')) return 'Recinto Universitario';
    if (nombre.toLowerCase().includes('simón bolívar')) return 'Sede Central';
    return 'Recinto';
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: recinto.nombre,
        text: recinto.descripcion,
        url: window.location.href,
      });
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const tipo = getTipoRecinto(recinto.nombre);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero con imagen */}
      <div className="relative h-[500px] w-full">
        {principalImage ? (
          <>
            <Image
              src={principalImage}
              alt={recinto.nombre}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-primary-dark to-blue-700 flex items-center justify-center">
            <Building2 className="h-32 w-32 text-white/20" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-7xl">
            <Link href="/recinto">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white mb-6">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver a recintos
              </Button>
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  {tipo}
                </Badge>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {recinto.nombre}
                </h1>
              </div>
              
              <Button 
                onClick={handleShare}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <GraduationCap className="h-7 w-7 text-primary-dark" />
                  Acerca del Recinto
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recinto.descripcion}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Programas y servicios (simulado) */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="h-7 w-7 text-primary-dark" />
                  Programas Académicos
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {recinto.descripcion.toLowerCase().includes('civil') && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">Ingeniería Civil</span>
                    </div>
                  )}
                  {recinto.descripcion.toLowerCase().includes('sistemas') && (
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">Ingeniería en Sistemas</span>
                    </div>
                  )}
                  {recinto.descripcion.toLowerCase().includes('agroindustrial') && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">Ingeniería Agroindustrial</span>
                    </div>
                  )}
                  {recinto.descripcion.toLowerCase().includes('industrial') && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <div className="h-10 w-10 bg-orange-600 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">Ingeniería Industrial</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Galería de imágenes */}
            {otherImages.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Galería</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {otherImages.map((img) => {
                      const imgUrl = recintosService.getImageUrl(img.foto);
                      if (!imgUrl) return null;
                      
                      return (
                        <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden group">
                          <Image
                            src={imgUrl}
                            alt={`${recinto.nombre} - Imagen`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar con información de contacto */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary-dark" />
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  {/* Teléfonos */}
                  {recinto.telefonos.length > 0 && (
                    <div>
                      <p className="font-medium text-sm text-gray-500 mb-2">Teléfonos</p>
                      <div className="space-y-2">
                        {recinto.telefonos.map(tel => (
                          <a
                            key={tel.id}
                            href={`tel:${tel.telefono.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-gray-700 hover:text-primary-dark transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span>{tel.telefono}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fax */}
                  {recinto.telefaxes.length > 0 && (
                    <div>
                      <p className="font-medium text-sm text-gray-500 mb-2">Fax</p>
                      <div className="space-y-2">
                        {recinto.telefaxes.map(fax => (
                          <div key={fax.id} className="flex items-center gap-2 text-gray-700">
                            <Printer className="h-4 w-4" />
                            <span>{fax.telefax}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apartado Postal */}
                  {recinto.apartadoPostal && (
                    <div>
                      <p className="font-medium text-sm text-gray-500 mb-2">Apartado Postal</p>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4" />
                        <span>{recinto.apartadoPostal}</span>
                      </div>
                    </div>
                  )}

                  {/* Ubicación */}
                  <div>
                    <p className="font-medium text-sm text-gray-500 mb-2">Ubicación</p>
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span className="text-sm">
                        {recinto.nombre.includes('Estelí') && 'Estelí, Nicaragua'}
                        {recinto.nombre.includes('Juigalpa') && 'Juigalpa, Nicaragua'}
                        {recinto.nombre.includes('Masaya') && 'Masaya, Nicaragua'}
                        {(recinto.nombre.includes('Simón Bolívar') || 
                          recinto.nombre.includes('Pedro Aráuz')) && 'Managua, Nicaragua'}
                      </span>
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
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}