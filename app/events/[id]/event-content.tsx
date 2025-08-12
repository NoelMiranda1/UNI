"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Calendar, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { createEvents } from 'ics';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fullDescription: string;
  image: string;
}

const eventData: { [key: string]: Event } = {
  "1": {
    id: 1,
    title: "Conferencia de Innovación Tecnológica",
    date: "20 de Noviembre, 2024",
    time: "9:00 AM",
    location: "Auditorio Principal",
    description: "Únete a nosotros para explorar las últimas tendencias en innovación tecnológica.",
    fullDescription: `
      La Conferencia de Innovación Tecnológica es un evento emblemático que reúne a expertos, académicos y estudiantes para explorar las últimas tendencias y avances en el campo de la tecnología.

      Agenda del evento:
      - 9:00 AM: Registro y bienvenida
      - 9:30 AM: Conferencia inaugural
      - 11:00 AM: Sesiones paralelas
      - 1:00 PM: Almuerzo networking
      - 2:30 PM: Talleres prácticos
      - 4:30 PM: Clausura

      No te pierdas esta oportunidad única de aprendizaje y networking.
    `,
    image: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg"
  },
  "2": {
    id: 2,
    title: "Feria de Empleabilidad",
    date: "25 de Noviembre, 2024",
    time: "10:00 AM",
    location: "Campus Central",
    description: "Conecta con empresas líderes en el sector y descubre oportunidades laborales.",
    fullDescription: `
      La Feria de Empleabilidad UNI 2024 es tu oportunidad para conectar con las empresas más importantes del sector tecnológico y de ingeniería.

      Empresas participantes:
      - Principales empresas tecnológicas
      - Consultoras de ingeniería
      - Startups innovadoras
      - Empresas de construcción

      Actividades:
      - Entrevistas en sitio
      - Revisión de CV
      - Charlas de empleabilidad
      - Networking
    `,
    image: "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg"
  },
  "3": {
    id: 3,
    title: "Seminario de Investigación",
    date: "30 de Noviembre, 2024",
    time: "2:00 PM",
    location: "Sala de Conferencias",
    description: "Presentación de proyectos de investigación en curso.",
    fullDescription: `
      El Seminario de Investigación reúne a investigadores y estudiantes para compartir los últimos avances en proyectos de investigación.

      Temas a tratar:
      - Inteligencia Artificial
      - Energías Renovables
      - Biotecnología
      - Materiales Avanzados

      Formato:
      - Presentaciones de 20 minutos
      - Sesiones de preguntas
      - Posters científicos
      - Networking
    `,
    image: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg"
  },
  "4": {
    id: 4,
    title: "Workshop de Desarrollo Web",
    date: "5 de Diciembre, 2024",
    time: "3:00 PM",
    location: "Laboratorio de Computación",
    description: "Aprende las últimas tecnologías web y mejores prácticas.",
    fullDescription: `
      Workshop práctico sobre desarrollo web moderno con las últimas tecnologías y frameworks.

      Contenido:
      - Frontend con React
      - Backend con Node.js
      - Bases de datos NoSQL
      - Despliegue en la nube

      Requisitos:
      - Laptop personal
      - Conocimientos básicos de programación
      - IDE instalado
    `,
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
  },
  "5": {
    id: 5,
    title: "Congreso de Ingeniería Civil",
    date: "10 de Diciembre, 2024",
    time: "9:00 AM",
    location: "Centro de Convenciones",
    description: "Encuentro internacional de profesionales y estudiantes.",
    fullDescription: `
      El Congreso Internacional de Ingeniería Civil reúne a expertos de todo el mundo para discutir las últimas tendencias en construcción y diseño estructural.

      Temas principales:
      - Construcción sostenible
      - Nuevos materiales
      - Diseño sísmico
      - Infraestructura verde

      Incluye:
      - Conferencias magistrales
      - Talleres prácticos
      - Visitas técnicas
      - Certificado internacional
    `,
    image: "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg"
  }
};

export default function EventContent({ id }: { id: string }) {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    setEvent(eventData[id] || null);
  }, [id]);

  const addToCalendar = () => {
    if (!event) return;

    const [day, month, year] = event.date.split(' de ')[0].split(' ');
    const [hours, minutes] = event.time.split(':');
    const ampm = event.time.slice(-2);
    
    const monthMap: { [key: string]: number } = {
      'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
      'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
      'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    };
    
    const monthNumber = monthMap[month];
    
    let hour = parseInt(hours);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const eventObj = {
      start: [parseInt(year), monthNumber, parseInt(day), hour, parseInt(minutes)] as [number, number, number, number, number],
      duration: { hours: 2 },
      title: event.title,
      description: event.description,
      location: event.location,
      url: window.location.href,
    };

    createEvents([eventObj], (error: Error | undefined, value: string) => {
      if (error) {
        console.error(error);
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (!event) {
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
        src={event.image}
        alt={event.title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        <Button 
          onClick={addToCalendar}
          className="bg-primary-dark hover:bg-primary text-white"
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Agregar al Calendario
        </Button>
      </div>
      
      <div className="flex space-x-6 mb-8 text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{event.location}</span>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-xl text-gray-600 mb-6">{event.description}</p>
        {event.fullDescription.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}