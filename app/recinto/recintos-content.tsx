'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Users, 
  GraduationCap, 
  ChevronRight, 
  Printer, 
  BookOpen, 
  TreePine,
  Briefcase,
  School,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import recintosService, { type Recinto } from '@/services/recintos';

interface RecintosContentProps {
  recintos: Recinto[];
}

export function RecintosContent({ recintos }: RecintosContentProps) {
  const [selectedTab, setSelectedTab] = useState<'todos' | 'central' | 'regionales' | 'especializados'>('todos');

  // Categorizar recintos
  const recintoPrincipal = recintos.find(r => 
    r.nombre.toLowerCase().includes('simón bolívar') || 
    r.nombre.toLowerCase().includes('sede central')
  );
  
  const rupap = recintos.find(r => r.nombre.includes('Pedro Aráuz'));
  
  const centrosRegionales = recintos.filter(r => 
    r.nombre.toLowerCase().includes('centro universitario')
  );
  
  const sedesEspecializadas = recintos.filter(r => 
    r.nombre.toLowerCase().includes('finca')
  );

  const getTipoRecinto = (nombre: string) => {
    if (nombre.toLowerCase().includes('centro universitario')) return 'Centro Regional';
    if (nombre.toLowerCase().includes('finca')) return 'Sede Especializada';
    if (nombre.toLowerCase().includes('pedro aráuz')) return 'Recinto Universitario';
    return 'Sede Central';
  };

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'Sede Central': return <School className="h-5 w-5" />;
      case 'Recinto Universitario': return <GraduationCap className="h-5 w-5" />;
      case 'Centro Regional': return <Building2 className="h-5 w-5" />;
      case 'Sede Especializada': return <TreePine className="h-5 w-5" />;
      default: return <Building2 className="h-5 w-5" />;
    }
  };

  const getStats = () => {
    return [
      {
        label: 'Sedes Centrales',
        count: (recintoPrincipal ? 1 : 0) + (rupap ? 1 : 0),
        color: 'bg-blue-500',
        icon: <School className="h-8 w-8 text-blue-500" />
      },
      {
        label: 'Centros Regionales',
        count: centrosRegionales.length,
        color: 'bg-green-500',
        icon: <Building2 className="h-8 w-8 text-green-500" />
      },
      {
        label: 'Sedes Especializadas',
        count: sedesEspecializadas.length,
        color: 'bg-orange-500',
        icon: <TreePine className="h-8 w-8 text-orange-500" />
      },
      {
        label: 'Total de Recintos',
        count: recintos.length,
        color: 'bg-purple-500',
        icon: <Briefcase className="h-8 w-8 text-purple-500" />
      }
    ];
  };

  const filteredRecintos = () => {
    switch (selectedTab) {
      case 'central':
        return [recintoPrincipal, rupap].filter(Boolean);
      case 'regionales':
        return centrosRegionales;
      case 'especializados':
        return sedesEspecializadas;
      default:
        return recintos;
    }
  };

  const RecintoCard = ({ recinto }: { recinto: Recinto }) => {
    const tipo = getTipoRecinto(recinto.nombre);
    const imageUrl = recintosService.getPrincipalImage(recinto.fotos);
    const isMain = recinto.id === recintoPrincipal?.id;
    
    return (
      <Link href={`/recinto/${recinto.id}`}>
        <Card className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer ${
          isMain ? 'md:col-span-2 md:row-span-2' : ''
        }`}>
          <div className={`relative ${isMain ? 'h-96' : 'h-64'} overflow-hidden`}>
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={recinto.nombre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={isMain ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </>
            ) : (
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Building2 className="h-20 w-20 text-white/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
            )}
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Badge className="bg-white text-gray-900 backdrop-blur-sm border-0 font-medium">
                  {getIcon(tipo)}
                  <span className="ml-2">{tipo}</span>
                </Badge>
                {isMain && (
                  <Badge className="bg-amber-600 text-white font-medium border-0">
                    Principal
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className={`font-bold text-white ${isMain ? 'text-3xl' : 'text-2xl'}`}>
                  {recinto.nombre}
                </h3>
                
                <p className="text-gray-200 line-clamp-2">
                  {recinto.descripcion.split('\n')[0]}
                </p>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-3 text-sm text-white/90">
                  {recinto.telefonos.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{recinto.telefonos[0].telefono}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {recinto.nombre.includes('Estelí') && 'Estelí'}
                      {recinto.nombre.includes('Juigalpa') && 'Juigalpa'}
                      {recinto.nombre.includes('Masaya') && 'Masaya'}
                      {(recinto.nombre.includes('Simón Bolívar') || 
                        recinto.nombre.includes('Pedro Aráuz')) && 'Managua'}
                    </span>
                  </div>
                </div>
                
                {/* Hover Action */}
                <div className="flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Ver detalles</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-dark via-blue-800 to-primary-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Nuestros Recintos
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-blue-100">
                Presencia nacional con excelencia académica. Descubre nuestras sedes 
                estratégicamente ubicadas para tu formación profesional.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {getStats().map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.count}</div>
                  <div className="text-sm text-blue-100 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { value: 'todos', label: 'Todos los Recintos', icon: <Building2 className="h-4 w-4" /> },
            { value: 'central', label: 'Sedes Centrales', icon: <School className="h-4 w-4" /> },
            { value: 'regionales', label: 'Centros Regionales', icon: <Users className="h-4 w-4" /> },
            { value: 'especializados', label: 'Especializadas', icon: <TreePine className="h-4 w-4" /> }
          ].map((tab) => (
            <Button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value as any)}
              variant={selectedTab === tab.value ? "default" : "outline"}
              className={`transition-all ${
                selectedTab === tab.value 
                  ? 'bg-primary-dark hover:bg-primary text-white shadow-lg' 
                  : 'hover:bg-gray-100 hover:text-gray-900 border-gray-300 text-gray-700'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Grid de Recintos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredRecintos().map((recinto) => 
            recinto ? (
              <RecintoCard key={recinto.id} recinto={recinto} />
            ) : null
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-primary-dark to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas más información?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contacta con nosotros para conocer más sobre nuestros programas académicos 
            y proceso de admisión en cualquiera de nuestros recintos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary-dark hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Contactar Admisiones
            </Button>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-dark font-medium transition-all">
              <BookOpen className="mr-2 h-5 w-5" />
              Ver Oferta Académica
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}