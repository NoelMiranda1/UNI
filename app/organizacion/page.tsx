'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  MapPin, 
  Mail, 
  ChevronRight,
  UserCircle,
  Briefcase,
  Award,
  BookOpen,
  DollarSign,
  Target,
  Monitor,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchOrganizacion, type Organizacion, type Division, type Cargo } from '@/services/organizacion';
import { PageLoader } from '@/components/ui/page-loader';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { safeImageUrl } from '@/lib/utils';

export default function OrganizacionPage() {
  const [organizacion, setOrganizacion] = useState<Organizacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  useEffect(() => {
    loadOrganizacion();
  }, []);

  const loadOrganizacion = async () => {
    try {
      setLoading(true);
      const response = await fetchOrganizacion();
      if (response.docs.length > 0) {
        const org = response.docs[0];
        org.divisiones = (org.divisiones || []).map(d => ({
          ...d,
          cargos: d.cargos || [],
        }));
        setOrganizacion(org);
        setSelectedDivision(org.divisiones[0]?.id || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la información');
    } finally {
      setLoading(false);
    }
  };

  const getDivisionIcon = (nombre: string) => {
    if (nombre.includes('Consejo')) return <Shield className="h-5 w-5" />;
    if (nombre.includes('Central')) return <Building2 className="h-5 w-5" />;
    if (nombre.includes('Conocimiento')) return <BookOpen className="h-5 w-5" />;
    if (nombre.includes('CUR')) return <MapPin className="h-5 w-5" />;
    return <Users className="h-5 w-5" />;
  };

  const getCargoIcon = (cargo: string) => {
    if (cargo.toLowerCase().includes('rector')) return <Award className="h-6 w-6" />;
    if (cargo.toLowerCase().includes('secretaria')) return <Briefcase className="h-6 w-6" />;
    if (cargo.toLowerCase().includes('académico')) return <GraduationCap className="h-6 w-6" />;
    if (cargo.toLowerCase().includes('financiero')) return <DollarSign className="h-6 w-6" />;
    if (cargo.toLowerCase().includes('calidad')) return <Target className="h-6 w-6" />;
    if (cargo.toLowerCase().includes('tecnología')) return <Monitor className="h-6 w-6" />;
    return <UserCircle className="h-6 w-6" />;
  };

  const extractCargoDescription = (cargo: Cargo): string => {
    if (cargo.descripcionPlano) return cargo.descripcionPlano;
    if (cargo.descripcionCargo && Array.isArray(cargo.descripcionCargo)) {
      let text = '';
      for (const block of cargo.descripcionCargo) {
        if (block.children) {
          for (const child of block.children) {
            if (child.text) text += child.text;
          }
        }
        text += '\n';
      }
      return text.trim();
    }
    return '';
  };

  const formatDescription = (descripcion: string) => {
    if (!descripcion) return <p className="text-gray-500 italic">Sin descripción disponible.</p>;
    return descripcion.split('\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('1.') || paragraph.trim().match(/^\d+\./)) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700">
            {paragraph.trim().replace(/^\d+\./, '').trim()}
          </li>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) {
    return <PageLoader message="Cargando estructura organizacional..." />;
  }

  if (error || !organizacion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-red-600">{error || 'No se encontró información'}</p>
            <Button onClick={loadOrganizacion} className="mt-4">
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedDiv = organizacion.divisiones.find(d => d.id === selectedDivision);
  console.log('selectedCargo',selectedCargo)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Building2 className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">Estructura Organizacional</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            {organizacion.descripcion}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Divisiones */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Divisiones</CardTitle>
                <CardDescription>Navegue por las áreas organizacionales</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1 p-2">
                  {organizacion.divisiones.map((division) => (
                    <button
                      key={division.id}
                      onClick={() => {
                        setSelectedDivision(division.id);
                        setSelectedCargo(null);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        selectedDivision === division.id
                          ? 'bg-blue-100 text-blue-900 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {getDivisionIcon(division.nombre)}
                      <span className="text-sm text-left flex-1">{division.nombre}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {division.cargos.length}
                      </Badge>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedDiv && (
              <div>
                {/* Division Header */}
                <Card className="mb-6 border-l-4 border-l-blue-600">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {getDivisionIcon(selectedDiv.nombre)}
                      <div>
                        <CardTitle className="text-2xl text-blue-900">
                          {selectedDiv.nombre}
                        </CardTitle>
                        <CardDescription>
                          {selectedDiv.cargos.length} {selectedDiv.cargos.length === 1 ? 'cargo' : 'cargos'} en esta división
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Cargos Grid */}
                {!selectedCargo ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDiv.cargos.map((cargo) => (
                      <Card 
                        key={cargo.id}
                        className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-400"
                        onClick={() => setSelectedCargo(cargo)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                              {getCargoIcon(cargo.nombreCargo)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {cargo.nombreCargo}
                              </h3>
                              {cargo.nombreEncargado && (
                                <p className="text-sm text-gray-700 font-medium mb-2">
                                  {cargo.nombreEncargado}
                                </p>
                              )}
                              {cargo.correoEncargado && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{cargo.correoEncargado}</span>
                                </div>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-3 text-blue-600 hover:text-blue-700 p-0"
                              >
                                Ver detalles
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  /* Cargo Detail View */
                  <Card className="animate-in slide-in-from-right">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedCargo(null)}
                          className="mb-4"
                        >
                          ← Volver a la lista
                        </Button>
                      </div>
                      <div className="flex items-start gap-6">
                        {selectedCargo.fotoEncargado ? (
                          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                            <Image
                              src={safeImageUrl(selectedCargo.fotoEncargado?.url)}
                              alt={selectedCargo.nombreEncargado}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                            {getCargoIcon(selectedCargo.nombreCargo)}
                          </div>
                        )}
                        <div className="flex-1">
                          <Badge className="mb-2 bg-blue-600 text-white">{selectedCargo.nombreCargo}</Badge>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {selectedCargo.nombreEncargado || 'Por designar'}
                          </h2>
                          {selectedCargo.correoEncargado && (
                            <a 
                              href={`mailto:${selectedCargo.correoEncargado}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Mail className="h-4 w-4" />
                              {selectedCargo.correoEncargado}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-blue max-w-none">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                          Funciones y Responsabilidades
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                          {formatDescription(extractCargoDescription(selectedCargo))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}