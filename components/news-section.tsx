"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import noticiasService, { type Noticia } from "@/services/noticias";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsSection() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noticiasService.getNoticias({ 
        limit: 3, 
        sort: '-fecha' 
      });
      setNoticias(response.docs);
    } catch (err) {
      console.error('Error al cargar noticias:', err);
      setError('Error al cargar las noticias');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Últimas Noticias</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error || noticias.length === 0) {
    return (
      <section className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Últimas Noticias</h2>
        </div>
        {error ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">{error}</p>
            <Button onClick={fetchNoticias} className="mt-4">
              Reintentar
            </Button>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No hay noticias disponibles en este momento</p>
          </Card>
        )}
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Últimas Noticias</h2>
        <Link href="/news">
          <Button variant="outline" className="text-primary-dark hover:text-primary group">
            Ver todas
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia) => (
          <Link href={`/news/${noticia.id}`} key={noticia.id}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {noticia.imagen ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_IMAGES}${noticia.imagen.url}`}
                    alt={noticia.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-blue-50">
                    <Clock className="h-12 w-12 text-blue-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{noticiasService.formatDate(noticia.fecha)}</span>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {noticia.nombre}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {noticia.descripcionCorta}
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Leer más</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}