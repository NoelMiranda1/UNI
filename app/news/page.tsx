"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Newspaper,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import noticiasService, { type Noticia } from "@/services/noticias";
import { PageLoader } from "@/components/ui/page-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { safeImageUrl } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

export default function NewsPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const limit = 9;

  useEffect(() => {
    fetchNoticias();
  }, [page]);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noticiasService.getNoticias({ 
        page, 
        limit,
        sort: '-fecha' 
      });
      
      if (page === 1) {
        setNoticias(response.docs);
      } else {
        setNoticias(prev => [...prev, ...response.docs]);
      }
      
      setHasMore(response.hasNextPage);
    } catch (err) {
      console.error('Error al cargar noticias:', err);
      setError('Error al cargar las noticias');
    } finally {
      setLoading(false);
    }
  };

  const filteredNoticias = noticias.filter(noticia =>
    noticia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.descripcionCorta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && page === 1) {
    return <PageLoader message="Cargando noticias..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Newspaper className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Noticias UNI</h1>
          </div>
          
          <p className="text-xl text-blue-100 max-w-3xl">
            Mantente informado sobre los últimos acontecimientos, logros y eventos de nuestra comunidad universitaria
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="px-4 py-2">
                  <Filter className="h-4 w-4 mr-2" />
                  {filteredNoticias.length} noticias
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <Card className="p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchNoticias}>Reintentar</Button>
          </Card>
        ) : filteredNoticias.length === 0 ? (
          <Card className="p-12 text-center">
            <Newspaper className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron noticias
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? "No hay noticias que coincidan con tu búsqueda" 
                : "No hay noticias disponibles en este momento"}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredNoticias.map((noticia) => (
                <Link href={`/news/${noticia.id}`} key={noticia.id}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer">
                    <div className="relative h-56 bg-gray-100">
                      {noticia.imagen ? (
                        <Image
                          src={safeImageUrl(noticia.imagen.url)}
                          alt={noticia.nombre}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-blue-50">
                          <Newspaper className="h-16 w-16 text-blue-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{noticiasService.formatDate(noticia.fecha)}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {noticia.nombre}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {noticia.descripcionCorta}
                      </p>
                      
                      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Leer más</span>
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={loading}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      Ver más noticias
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}