'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bell, ExternalLink, ChevronLeft, ChevronRight, Megaphone, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Comunicado {
  id: string;
  titulo: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

interface ComunicadosResponse {
  docs: Comunicado[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ComunicadosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComunicadosModal({ isOpen, onClose }: ComunicadosModalProps) {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchComunicados(1);
    }
  }, [isOpen]);

  const fetchComunicados = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comunicados?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los comunicados');
      }
      
      const data: ComunicadosResponse = await response.json();
      setComunicados(data.docs);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setHasPrevPage(data.hasPrevPage);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchComunicados(newPage);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-NI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-blue-900">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            Comunicados Oficiales
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Mantente informado con las últimas noticias y anuncios de la universidad
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-10 w-32" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-center gap-3 text-red-700">
                <Bell className="h-5 w-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {!loading && !error && comunicados.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <Megaphone className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No hay comunicados disponibles</p>
              <p className="text-gray-400 text-sm mt-2">Vuelve más tarde para ver nuevas actualizaciones</p>
            </div>
          )}

          {!loading && !error && comunicados.map((comunicado, index) => (
            <div
              key={comunicado.id}
              className="group mb-4 p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 bg-white hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1 + (currentPage - 1) * 10}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                      {comunicado.titulo}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(comunicado.createdAt)}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getDaysAgo(comunicado.createdAt)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => window.open(comunicado.link, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white group/btn"
                >
                  <span>Ver comunicado completo</span>
                  <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
                
                {comunicado.link.includes('facebook') && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    Facebook
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {!loading && !error && totalPages > 1 && (
          <div className="border-t pt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={i}
                      onClick={() => handlePageChange(pageNum)}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      className={pageNum === currentPage ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}