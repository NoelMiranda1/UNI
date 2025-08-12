'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import areasConocimientoService, { type AreaConocimiento } from '@/services/areas-conocimiento';
import Link from 'next/link';

export default function OfertaAcademica() {
  const [areasConocimiento, setAreasConocimiento] = useState<AreaConocimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAreasConocimiento();
  }, []);

  const fetchAreasConocimiento = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await areasConocimientoService.getAreas({
        limit: 100,
        sort: 'nombre'
      });
      
      setAreasConocimiento(response.docs);
    } catch (err) {
      console.error('Error fetching areas de conocimiento:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const getAreaIcon = (nombre: string) => {
    const name = nombre.toLowerCase();
    if (name.includes('ingeniería') || name.includes('tecnología')) return <GraduationCap className="h-8 w-8 text-white" />;
    if (name.includes('ciencias')) return <BookOpen className="h-8 w-8 text-white" />;
    if (name.includes('arquitectura')) return <Award className="h-8 w-8 text-white" />;
    return <Users className="h-8 w-8 text-white" />;
  };

  const getAreaColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <PageLoader message="Cargando oferta académica..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar datos</h3>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={fetchAreasConocimiento} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80')",
              opacity: 0.3
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Oferta Académica
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Explora nuestras áreas de conocimiento y descubre el programa que impulsará tu futuro profesional
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                <span className="text-3xl font-bold">{areasConocimiento.length}</span>
                <p className="text-sm">Áreas de Conocimiento</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
                <span className="text-3xl font-bold">
                  {areasConocimiento.reduce((acc, area) => acc + (area.carrerasRelacionadas?.length || 0), 0)}
                </span>
                <p className="text-sm">Carreras Disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {areasConocimiento.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full h-24 w-24 mx-auto flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay áreas disponibles</h3>
            <p className="text-gray-600">Por el momento no hay áreas de conocimiento disponibles.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Áreas de Conocimiento
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Cada área representa un campo especializado de estudio con programas diseñados 
                para formar profesionales de excelencia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areasConocimiento.map((area, index) => (
                <Link
                  key={area.id}
                  href={`/oferta-academica/${area.id}`}
                  className="block h-full"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col cursor-pointer group">
                    <div className={`h-48 relative bg-gradient-to-br ${getAreaColor(index)}`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform">
                          {getAreaIcon(area.nombre)}
                        </div>
                      </div>
                      {area.carrerasRelacionadas && area.carrerasRelacionadas.length > 0 && (
                        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1">
                          <span className="text-sm font-semibold text-gray-800">
                            {area.carrerasRelacionadas.length} carreras
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {area.nombre}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                        {area.descripcion || 'Descubre los programas académicos disponibles en esta área de conocimiento.'}
                      </p>
                      
                      {area.carrerasRelacionadas && area.carrerasRelacionadas.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Carreras destacadas:</p>
                          <div className="flex flex-wrap gap-2">
                            {area.carrerasRelacionadas.slice(0, 3).map((carrera, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                              >
                                {carrera.nombre}
                              </span>
                            ))}
                            {area.carrerasRelacionadas.length > 3 && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                +{area.carrerasRelacionadas.length - 3} más
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700">
                        Explorar programas
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Stats Section
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <p className="text-gray-600 mt-1">Carreras de Ingeniería</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="h-12 w-12 mx-auto text-green-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">3</div>
                <p className="text-gray-600 mt-1">Programas Acreditados</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Users className="h-12 w-12 mx-auto text-purple-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">5000+</div>
                <p className="text-gray-600 mt-1">Estudiantes Activos</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <BookOpen className="h-12 w-12 mx-auto text-orange-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">40+</div>
                <p className="text-gray-600 mt-1">Años de Experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ¿Necesitas más información?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nuestro equipo de admisiones está disponible para resolver tus dudas
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Contactar Admisiones
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Descargar Catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}