"use client";

import { Users, BookOpen, GraduationCap, History } from "lucide-react";
import { useEffect, useState } from "react";
import { apiHelpers } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

// Interfaz para las estadísticas
interface Estadistica {
  id: string;
  nombre: string;
  valor: string;
  createdAt: string;
  updatedAt: string;
}

// Interfaz para la respuesta del API
interface EstadisticasResponse {
  docs: Estadistica[];
  totalDocs: number;
}

// Diccionario de íconos por tipo de estadística
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  estudiantes: Users,
  carreras: BookOpen,
  graduados: GraduationCap,
  años: History,
};

// Función para obtener el componente de ícono
const getIconComponent = (nombre: string) => {
  const lowerName = nombre.toLowerCase();
  
  // Buscar coincidencia en el diccionario
  for (const [key, IconComponent] of Object.entries(iconMap)) {
    if (lowerName.includes(key.slice(0, -1))) { // Quitar la 's' final para singular
      return IconComponent;
    }
  }
  
  // Ícono por defecto
  return BookOpen;
};

export function StatsSection() {
  const [stats, setStats] = useState<Estadistica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiHelpers.get<EstadisticasResponse>('/estadisticas');
        if (response.data?.docs) {
          setStats(response.data.docs);
        }
      } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
        // Usar valores por defecto en caso de error
        setStats([
          { id: '1', nombre: 'Estudiantes', valor: '15,000+', createdAt: '', updatedAt: '' },
          { id: '2', nombre: 'Carreras', valor: '13', createdAt: '', updatedAt: '' },
          { id: '3', nombre: 'Graduados', valor: '50,000+', createdAt: '', updatedAt: '' },
          { id: '4', nombre: 'Años', valor: '100+', createdAt: '', updatedAt: '' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#002D62] to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')] mix-blend-overlay opacity-10 bg-cover bg-center"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {loading ? (
            // Skeleton loader
            <>
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <Skeleton className="h-12 w-12 rounded-full mb-4 bg-white/20" />
                  <Skeleton className="h-10 w-24 mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-20 bg-white/20" />
                </div>
              ))}
            </>
          ) : (
            // Datos reales
            stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-white/20 p-3 rounded-full mb-4">
                  {(() => {
                    const IconComponent = getIconComponent(stat.nombre);
                    return <IconComponent className="h-6 w-6 text-white" />;
                  })()}
                </div>
                <div className="text-4xl font-bold mb-2">
                  {stat.valor}
                </div>
                <div className="text-gray-200">{stat.nombre}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}