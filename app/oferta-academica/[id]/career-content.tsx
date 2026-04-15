'use client';

import { useEffect, useState } from 'react';
import { 
  GraduationCap, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Clock, 
  Award,
  ArrowLeft,
  FileText,
  Users,
  Target,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageLoader } from '@/components/ui/page-loader';
import areasConocimientoService, { type AreaConocimiento, type CarreraRelacionada } from '@/services/areas-conocimiento';
import Link from 'next/link';
import Image from 'next/image';
import { safeImageUrl } from '@/lib/utils';

// Carreras reales de la UNI Nicaragua
const CARRERAS_POR_AREA: Record<string, Omit<CarreraRelacionada, 'id' | 'createdAt' | 'updatedAt'>[]> = {
  'Ingeniería y Tecnología': [
    {
      nombre: 'Ingeniería Civil',
      descripcion: [{ children: [{ text: 'Formación de profesionales capacitados para planificar, diseñar, construir y supervisar obras de infraestructura como edificios, puentes, carreteras, presas y sistemas de abastecimiento de agua. Disponible en RUPAP, RUACS (Estelí) y RURC (Juigalpa).' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería Industrial',
      descripcion: [{ children: [{ text: 'Profesionales con capacidad para optimizar procesos productivos, gestionar sistemas de calidad, administrar recursos humanos y materiales, e implementar soluciones tecnológicas en la industria manufacturera y de servicios.' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería Mecánica',
      descripcion: [{ children: [{ text: 'Formación en diseño, análisis y manufactura de sistemas mecánicos, máquinas térmicas, equipos industriales y automatización. Los egresados pueden desempeñarse en industrias de manufactura, energía y mantenimiento.' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería Electrónica',
      descripcion: [{ children: [{ text: 'Carrera acreditada internacionalmente por ACAAI. Forma profesionales en diseño de circuitos, sistemas de control, telecomunicaciones, automatización industrial y desarrollo de sistemas embebidos.' }] }],
      imagenes: [],
      urlPerfilAcademico: 'https://www.uni.edu.ni',
    },
    {
      nombre: 'Ingeniería Eléctrica',
      descripcion: [{ children: [{ text: 'Formación en generación, transmisión, distribución y uso eficiente de la energía eléctrica. Incluye diseño de instalaciones eléctricas, sistemas de potencia y energías renovables.' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería en Computación',
      descripcion: [{ children: [{ text: 'Profesionales en diseño de hardware y software, arquitectura de computadoras, redes de comunicación, inteligencia artificial y desarrollo de soluciones tecnológicas innovadoras.' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería en Telecomunicaciones',
      descripcion: [{ children: [{ text: 'Formación en diseño e implementación de sistemas de comunicación, redes de datos, telefonía, comunicaciones inalámbricas y fibra óptica para la conectividad nacional e internacional.' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería de Sistemas',
      descripcion: [{ children: [{ text: 'Una de las carreras más demandadas. Forma profesionales en desarrollo de software, bases de datos, sistemas de información, gestión de proyectos TI y transformación digital. Disponible en RUPAP y RUACS (Estelí).' }] }],
      imagenes: [],
    },
  ],
  'Arquitectura y Diseño': [
    {
      nombre: 'Arquitectura',
      descripcion: [{ children: [{ text: 'Una de las carreras más demandadas de la UNI. Forma profesionales capaces de diseñar, planificar y gestionar proyectos arquitectónicos y urbanísticos, con énfasis en sostenibilidad, patrimonio cultural y desarrollo urbano responsable.' }] }],
      imagenes: [],
    },
  ],
  'Agroindustria y Medio Ambiente': [
    {
      nombre: 'Ingeniería Agroindustrial',
      descripcion: [{ children: [{ text: 'Formación en procesamiento, conservación y transformación de productos agropecuarios, gestión de calidad alimentaria, y desarrollo de agronegocios sostenibles. Disponible en RUPAP, RUACS (Estelí) y RURC (Juigalpa).' }] }],
      imagenes: [],
    },
    {
      nombre: 'Ingeniería Agrícola',
      descripcion: [{ children: [{ text: 'Profesionales en mecanización agrícola, sistemas de riego, conservación de suelos, planificación de fincas y desarrollo rural sostenible. Integra tecnología al sector agropecuario nicaragüense.' }] }],
      imagenes: [],
    },
  ],
  'Ciencias Básicas y Aplicadas': [
    {
      nombre: 'Ingeniería Química',
      descripcion: [{ children: [{ text: 'Carrera acreditada internacionalmente por ACAAI. Formación en procesos químicos industriales, biotecnología, tratamiento de aguas, industria farmacéutica y protección del medio ambiente.' }] }],
      imagenes: [],
      urlPerfilAcademico: 'https://www.uni.edu.ni',
    },
  ],
};

function enrichAreaWithCarreras(area: AreaConocimiento): AreaConocimiento {
  if (area.carrerasRelacionadas && area.carrerasRelacionadas.length > 0) return area;
  const carreras = CARRERAS_POR_AREA[area.nombre];
  if (!carreras) return { ...area, carrerasRelacionadas: [] };
  return {
    ...area,
    carrerasRelacionadas: carreras.map((c, idx) => ({
      ...c,
      id: `${area.id}-carrera-${idx}`,
      createdAt: area.createdAt,
      updatedAt: area.updatedAt,
    })),
  };
}

interface CareerContentProps {
  id: string;
}

export default function CareerContent({ id }: CareerContentProps) {
  const [area, setArea] = useState<AreaConocimiento | null>(null);
  const [selectedCarrera, setSelectedCarrera] = useState<CarreraRelacionada | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAreaDetalle(id);
    }
  }, [id]);

  const fetchAreaDetalle = async (areaId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Intentar obtener el área directamente por ID
      let areaEncontrada: AreaConocimiento | undefined;
      try {
        areaEncontrada = await areasConocimientoService.getAreaById(areaId);
      } catch (apiError) {
        console.log('Intentando obtener todas las áreas para encontrar el ID:', areaId);
        const response = await areasConocimientoService.getAreas({ limit: 100 });
        areaEncontrada = response.docs.find(a => a.id === areaId);
      }

      if (!areaEncontrada) {
        throw new Error('Área no encontrada');
      }

      const enriched = enrichAreaWithCarreras(areaEncontrada);
      setArea(enriched);

      if (enriched.carrerasRelacionadas.length > 0) {
        setSelectedCarrera(enriched.carrerasRelacionadas[0]);
      }
    } catch (err) {
      console.error('Error fetching area detail:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const extractDescription = (descripcion: any[]): string => {
    return areasConocimientoService.extractPlainDescription(descripcion);
  };

  const getCarreraColor = (index: number) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-violet-500 to-purple-600',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <PageLoader message="Cargando información del área..." />;
  }

  if (error || !area) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-4">{error || 'No se encontró el área'}</p>
            <Link href="/oferta-academica">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Oferta Académica
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/oferta-academica">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Áreas
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {area.nombre}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Explora las {area.carrerasRelacionadas.length} carreras disponibles en esta área de conocimiento
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-semibold">{area.carrerasRelacionadas.length}</span>
                    <span>Carreras</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>Títulos Profesionales</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Carreras Disponibles</h3>
                <div className="space-y-2">
                  {area.carrerasRelacionadas.slice(0, 3).map((carrera) => (
                    <div key={carrera.id} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{carrera.nombre}</span>
                    </div>
                  ))}
                  {area.carrerasRelacionadas.length > 3 && (
                    <span className="text-sm text-blue-200">
                      +{area.carrerasRelacionadas.length - 3} más...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {area.carrerasRelacionadas.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No hay carreras disponibles en esta área por el momento.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar - Lista de Carreras */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Carreras del Área
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {area.carrerasRelacionadas.map((carrera, index) => (
                      <button
                        key={carrera.id}
                        onClick={() => setSelectedCarrera(carrera)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedCarrera?.id === carrera.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${getCarreraColor(index)} text-white flex-shrink-0`}>
                            <GraduationCap className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {carrera.nombre}
                            </h4>
                            {carrera.urlPerfilAcademico && (
                              <Badge 
                                variant="secondary" 
                                className="mt-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Perfil disponible
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Detalle de Carrera */}
            <div className="lg:col-span-2">
              {selectedCarrera && (
                <div className="space-y-6">
                  {/* Header de Carrera */}
                  <Card className="overflow-hidden">
                    {selectedCarrera.imagenes && selectedCarrera.imagenes.length > 0 && (
                      <div className="relative h-64 w-full">
                        <Image
                          src={safeImageUrl(selectedCarrera.imagenes[0].imagen.url)}
                          alt={selectedCarrera.nombre}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h2 className="text-3xl font-bold text-white mb-2">
                            {selectedCarrera.nombre}
                          </h2>
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      {selectedCarrera.urlPerfilAcademico && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          <a 
                            href={selectedCarrera.urlPerfilAcademico} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver Perfil Académico
                            </Button>
                          </a>
                          <a 
                            href={selectedCarrera.urlPerfilAcademico} 
                            download
                          >
                            <Button 
                              variant="outline" 
                              className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar PDF
                            </Button>
                          </a>
                        </div>
                      )}

                      <Tabs defaultValue="descripcion" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                          <TabsTrigger value="perfil">Perfil Profesional</TabsTrigger>
                          <TabsTrigger value="campo">Campo Laboral</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="descripcion" className="mt-6">
                          <div className="prose prose-blue max-w-none">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              Objetivo de la Carrera
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {extractDescription(selectedCarrera.descripcion) || 
                               'Formación integral de profesionales altamente capacitados en su área de especialización.'}
                            </p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="perfil" className="mt-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Users className="h-5 w-5 text-purple-600" />
                              Perfil del Egresado
                            </h3>
                            <div className="bg-purple-50 rounded-lg p-6">
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                                  <span className="text-gray-700">
                                    Sólidos conocimientos teóricos y prácticos en su área de especialización
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                                  <span className="text-gray-700">
                                    Capacidad de liderazgo y trabajo en equipo multidisciplinario
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                                  <span className="text-gray-700">
                                    Compromiso con el desarrollo sostenible y responsabilidad social
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                                  <span className="text-gray-700">
                                    Habilidades para la investigación y la innovación tecnológica
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="campo" className="mt-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-green-600" />
                              Campo Laboral
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-2">Sector Público</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  <li>• Instituciones gubernamentales</li>
                                  <li>• Empresas estatales</li>
                                  <li>• Proyectos de desarrollo nacional</li>
                                </ul>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">Sector Privado</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  <li>• Empresas nacionales e internacionales</li>
                                  <li>• Consultoría especializada</li>
                                  <li>• Emprendimiento propio</li>
                                </ul>
                              </div>
                              <div className="bg-orange-50 rounded-lg p-4">
                                <h4 className="font-semibold text-orange-900 mb-2">Investigación</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  <li>• Centros de investigación</li>
                                  <li>• Universidades</li>
                                  <li>• Desarrollo tecnológico</li>
                                </ul>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-4">
                                <h4 className="font-semibold text-purple-900 mb-2">Internacional</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  <li>• Organismos internacionales</li>
                                  <li>• Cooperación técnica</li>
                                  <li>• Empresas multinacionales</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Información Adicional */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Clock className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                          <p className="text-sm text-gray-600">Duración</p>
                          <p className="font-semibold">5 años</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Award className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                          <p className="text-sm text-gray-600">Título</p>
                          <p className="font-semibold">Ingeniero/a</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Users className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                          <p className="text-sm text-gray-600">Modalidad</p>
                          <p className="font-semibold">Presencial</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA Section */}
                  <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">¿Listo para comenzar tu carrera?</h3>
                      <p className="mb-4 text-blue-100">
                        Obtén más información sobre el proceso de admisión y requisitos
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-white text-blue-600 hover:bg-gray-100">
                          Solicitar Información
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-white text-blue-600 hover:bg-white/10 hover:text-white"
                        >
                          Proceso de Admisión
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}