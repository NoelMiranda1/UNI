'use client';

import { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Link as LinkIcon,
  ExternalLink,
  User,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLoader } from '@/components/ui/page-loader';
import noticiasService, { type Noticia } from '@/services/noticias';
import Link from 'next/link';
import Image from 'next/image';
import { safeImageUrl } from '@/lib/utils';

interface NewsContentProps {
  id: string;
}

export default function NewsContent({ id }: NewsContentProps) {
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchNoticia(id);
    }
  }, [id]);

  const fetchNoticia = async (noticiaId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await noticiasService.getNoticiaById(noticiaId);
      setNoticia(data);
    } catch (err) {
      console.error('Error fetching noticia:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar la noticia');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    if (!noticia) return;
    
    const url = window.location.href;
    const text = noticia.nombre;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
        break;
    }
  };

  if (loading) {
    return <PageLoader message="Cargando noticia..." />;
  }

  if (error || !noticia) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-4">{error || 'No se encontró la noticia'}</p>
            <Link href="/news">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Noticias
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const descripcionLarga = noticiasService.extractDescripcionLarga(noticia.descripcionLarga);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con imagen */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        {noticia.imagen ? (
          <>
            <Image
              src={safeImageUrl(noticia.imagen.url)}
              alt={noticia.nombre}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
        )}
        
        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full">
            <Link href="/news">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Noticias
              </Button>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-600 text-white">
                <Tag className="h-3 w-3 mr-1" />
                Noticia
              </Badge>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{noticiasService.formatDate(noticia.fecha)}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {noticia.nombre}
            </h1>
            
            <p className="text-lg text-white/90 max-w-3xl">
              {noticia.descripcionCorta}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido de la noticia */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {descripcionLarga.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {noticia.slug && (
                  <div className="mt-8 pt-8 border-t">
                    <a 
                      href={noticia.slug} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Ver noticia completa en el blog
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Compartir */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Compartir noticia
                  </h3>
                  <div className="space-y-2">
                    <Button 
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => handleShare('copy')}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copiar enlace
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Información adicional */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Información</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-500">Fecha de publicación</p>
                        <p className="font-medium">{noticiasService.formatDate(noticia.fecha)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-500">Última actualización</p>
                        <p className="font-medium">{noticiasService.formatDate(noticia.updatedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-500">Publicado por</p>
                        <p className="font-medium">Universidad Nacional de Ingeniería</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}