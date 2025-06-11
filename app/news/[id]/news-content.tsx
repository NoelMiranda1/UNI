"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
}

const newsData: { [key: string]: NewsItem } = {
  "1": {
    id: 1,
    title: "Curso de Formación y Capacitación a Docentes",
    description: "Programa intensivo de desarrollo profesional para docentes universitarios.",
    date: "20 de abril de 2024",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
    content: `
      La Universidad Nacional de Ingeniería ha lanzado un innovador programa de formación docente diseñado para fortalecer las competencias pedagógicas y tecnológicas de nuestro cuerpo académico.

      El programa, que se desarrollará a lo largo del semestre, incluye:

      - Metodologías de enseñanza innovadoras
      - Implementación de tecnologías educativas avanzadas
      - Estrategias de evaluación del aprendizaje
      - Desarrollo de contenidos digitales interactivos
      - Gestión efectiva del aula virtual

      Los participantes tendrán acceso a:
      
      - Talleres prácticos semanales
      - Mentorías personalizadas
      - Recursos educativos digitales
      - Certificación internacional

      Este curso representa una inversión significativa en la calidad educativa de nuestra institución y refleja nuestro compromiso continuo con la excelencia académica.
    `
  },
  "2": {
    id: 2,
    title: "Ceremonia de Inauguración del Evento Académico",
    description: "Apertura oficial del año académico con autoridades universitarias.",
    date: "15 de abril de 2024",
    image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg",
    content: `
      Con gran solemnidad y entusiasmo, la Universidad Nacional de Ingeniería celebró la ceremonia de inauguración del año académico 2024, marcando el inicio de un nuevo ciclo de excelencia educativa.

      El evento contó con la presencia de:
      - Autoridades universitarias
      - Representantes gubernamentales
      - Docentes distinguidos
      - Estudiantes destacados
      - Invitados especiales

      Durante la ceremonia se presentaron:
      - Balance del año anterior
      - Proyectos estratégicos para 2024
      - Reconocimientos académicos
      - Nuevas alianzas institucionales

      La ceremonia concluyó con una presentación cultural y un brindis de honor, simbolizando el compromiso renovado con la educación de calidad.
    `
  },
  "3": {
    id: 3,
    title: "Equipamiento para Laboratorio de Electrónica",
    description: "Nueva inversión en equipos de última generación para investigación.",
    date: "10 de abril de 2024",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    content: `
      El Laboratorio de Electrónica de la UNI ha recibido una importante actualización con equipos de última generación, fortaleciendo significativamente nuestra capacidad de investigación y enseñanza.

      Nuevos equipos adquiridos:
      - Osciloscopios digitales de alta precisión
      - Generadores de señales avanzados
      - Sistemas de prueba automatizados
      - Estaciones de soldadura profesionales
      - Equipos de medición especializada

      Beneficios para la comunidad universitaria:
      - Prácticas más avanzadas
      - Investigación de mayor alcance
      - Proyectos más sofisticados
      - Mejor preparación profesional

      Esta inversión representa un paso importante en nuestro compromiso con la excelencia educativa y la investigación de vanguardia.
    `
  },
  "4": {
    id: 4,
    title: "Convenio Internacional con Universidad Europea",
    description: "Firma de acuerdo para intercambio estudiantil y colaboración académica.",
    date: "5 de abril de 2024",
    image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
    content: `
      La Universidad Nacional de Ingeniería ha establecido un importante convenio de colaboración con una prestigiosa universidad europea, abriendo nuevas oportunidades para nuestra comunidad académica.

      El acuerdo incluye:
      - Programas de intercambio estudiantil
      - Proyectos de investigación conjunta
      - Intercambio de profesores
      - Desarrollo de programas académicos
      - Acceso a recursos compartidos

      Beneficios para los estudiantes:
      - Experiencia internacional
      - Doble titulación
      - Becas de movilidad
      - Networking global

      Este convenio marca un hito en la internacionalización de nuestra universidad y el fortalecimiento de nuestros vínculos académicos globales.
    `
  },
  "5": {
    id: 5,
    title: "Proyecto de Investigación en Energías Renovables",
    description: "Estudiantes desarrollan innovador sistema de energía solar.",
    date: "1 de abril de 2024",
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
    content: `
      Un equipo de estudiantes de la UNI ha desarrollado un innovador sistema de energía solar que promete revolucionar el aprovechamiento de energías renovables en zonas rurales.

      Características del proyecto:
      - Sistema modular adaptable
      - Alta eficiencia energética
      - Bajo costo de implementación
      - Mantenimiento simplificado
      - Control inteligente via app

      Impacto social:
      - Acceso a energía en zonas remotas
      - Reducción de costos energéticos
      - Menor impacto ambiental
      - Desarrollo comunitario

      El proyecto ha recibido reconocimiento nacional e internacional, destacando el potencial innovador de nuestros estudiantes.
    `
  },
  "6": {
    id: 6,
    title: "Reconocimiento Internacional en Concurso de Robótica",
    description: "Equipo de estudiantes obtiene primer lugar en competencia internacional.",
    date: "28 de marzo de 2024",
    image: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg",
    content: `
      El equipo de robótica de la UNI ha logrado un histórico primer lugar en la Competencia Internacional de Robótica 2024, destacando entre más de 50 universidades participantes.

      Detalles del proyecto ganador:
      - Robot autónomo de rescate
      - Inteligencia artificial avanzada
      - Sistemas de navegación precisos
      - Diseño innovador
      - Aplicaciones prácticas

      Reconocimientos obtenidos:
      - Primer lugar general
      - Premio a la innovación
      - Mención especial en diseño
      - Beca para desarrollo futuro

      Este logro reafirma la calidad de nuestra formación académica y el talento de nuestros estudiantes.
    `
  }
};

export default function NewsContent({ id }: { id: string }) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    setNews(newsData[id] || null);
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>
      
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-500">{news.date}</p>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-xl text-gray-600 mb-6">{news.description}</p>
        {news.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}