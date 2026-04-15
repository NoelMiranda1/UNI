'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Download, FileText } from 'lucide-react';
import { safeImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ArchivoCalendario {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface CalendarioItem {
  id: string;
  titulo: string;
  anho: number;
  Subtitulo: string;
  archivo: ArchivoCalendario;
  createdAt: string;
  updatedAt: string;
}

interface CalendarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarioModal({ isOpen, onClose }: CalendarioModalProps) {
  const [calendarios, setCalendarios] = useState<CalendarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCalendarios();
    }
  }, [isOpen]);

  const fetchCalendarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendarioAcademico`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los calendarios');
      }
      
      const data = await response.json();
      setCalendarios(data.docs.sort((a: CalendarioItem, b: CalendarioItem) => b.anho - a.anho));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (archivo: ArchivoCalendario) => {
    const fileUrl = safeImageUrl(archivo.url);
    window.open(fileUrl, '_blank');
  };

  const handleDownload = async (archivo: ArchivoCalendario) => {
    const fileUrl = safeImageUrl(archivo.url);
    
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = archivo.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-blue-900">
            <Calendar className="h-6 w-6" />
            Calendario Académico
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-lg">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && calendarios.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No hay calendarios académicos disponibles
            </div>
          )}

          {!loading && !error && calendarios.map((calendario) => (
            <div
              key={calendario.id}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-900 mb-1">
                    Año {calendario.anho}
                  </h3>
                  <p className="text-gray-600 mb-4">{calendario.Subtitulo}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <FileText className="h-4 w-4" />
                    <span>{calendario.archivo.filename}</span>
                    <span className="text-gray-400">•</span>
                    <span>{(calendario.archivo.filesize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>

                <div className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold text-blue-700">{calendario.anho}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleView(calendario.archivo)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver PDF
                </Button>
                <Button
                  onClick={() => handleDownload(calendario.archivo)}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}