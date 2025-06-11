import { ReactNode } from 'react';
import { Building2, Code2, Cpu, Database, Factory, HardHat, Lightbulb, Network, PenTool, Radio, TreePine, Wrench } from 'lucide-react';

interface Career {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  duration: string;
  credits: number;
}

interface AcademicArea {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  careers: Career[];
}

export const academicAreas: AcademicArea[] = [
  {
    id: "tecnologia",
    title: "Tecnología e Informática",
    description: "Carreras enfocadas en el desarrollo tecnológico y sistemas de información",
    icon: <Code2 className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
    careers: [
      {
        id: 1,
        title: "Ingeniería en Computación",
        description: "Desarrollo de software, sistemas computacionales y tecnologías de la información.",
        icon: <Code2 className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
        duration: "5 años",
        credits: 250
      },
      {
        id: 8,
        title: "Ingeniería en Sistemas",
        description: "Desarrollo de sistemas de información y gestión tecnológica.",
        icon: <Database className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        duration: "5 años",
        credits: 245
      }
    ]
  },
  {
    id: "industrial",
    title: "Ingeniería Industrial y Manufactura",
    description: "Carreras orientadas a la optimización de procesos industriales y producción",
    icon: <Factory className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
    careers: [
      {
        id: 4,
        title: "Ingeniería Mecánica",
        description: "Diseño y mantenimiento de sistemas mecánicos y térmicos.",
        icon: <Wrench className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg",
        duration: "5 años",
        credits: 248
      },
      {
        id: 5,
        title: "Ingeniería Industrial",
        description: "Optimización de procesos y gestión de la producción.",
        icon: <Factory className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        duration: "5 años",
        credits: 252
      }
    ]
  },
  {
    id: "construccion",
    title: "Construcción y Arquitectura",
    description: "Carreras relacionadas con el diseño y construcción de infraestructura",
    icon: <Building2 className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
    careers: [
      {
        id: 2,
        title: "Arquitectura",
        description: "Diseño arquitectónico, urbanismo y planificación de espacios.",
        icon: <Building2 className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg",
        duration: "5 años",
        credits: 255
      },
      {
        id: 6,
        title: "Ingeniería Civil",
        description: "Diseño y construcción de infraestructura y obras civiles.",
        icon: <HardHat className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg",
        duration: "5 años",
        credits: 255
      }
    ]
  },
  {
    id: "electronica",
    title: "Electrónica y Telecomunicaciones",
    description: "Carreras enfocadas en sistemas electrónicos y comunicaciones",
    icon: <Cpu className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg",
    careers: [
      {
        id: 3,
        title: "Ingeniería Electrónica",
        description: "Sistemas electrónicos, automatización y control industrial.",
        icon: <Cpu className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg",
        duration: "5 años",
        credits: 245
      },
      {
        id: 9,
        title: "Ingeniería en Telecomunicaciones",
        description: "Redes de comunicación y sistemas de transmisión.",
        icon: <Network className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg",
        duration: "5 años",
        credits: 248
      },
      {
        id: 10,
        title: "Ingeniería Eléctrica",
        description: "Sistemas eléctricos de potencia y energía.",
        icon: <Radio className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg",
        duration: "5 años",
        credits: 252
      }
    ]
  },
  {
    id: "energia",
    title: "Energía y Medio Ambiente",
    description: "Carreras orientadas a la sostenibilidad y gestión ambiental",
    icon: <TreePine className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
    careers: [
      {
        id: 11,
        title: "Ingeniería Ambiental",
        description: "Gestión ambiental y desarrollo sostenible.",
        icon: <TreePine className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
        duration: "5 años",
        credits: 245
      },
      {
        id: 12,
        title: "Ingeniería en Energías Renovables",
        description: "Sistemas de energía limpia y sostenibilidad.",
        icon: <Lightbulb className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
        duration: "5 años",
        credits: 250
      }
    ]
  },
  {
    id: "diseno",
    title: "Diseño Industrial",
    description: "Carreras enfocadas en el diseño y desarrollo de productos",
    icon: <PenTool className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg",
    careers: [
      {
        id: 13,
        title: "Ingeniería en Diseño Industrial",
        description: "Diseño de productos y procesos industriales.",
        icon: <PenTool className="h-12 w-12" />,
        image: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg",
        duration: "5 años",
        credits: 248
      }
    ]
  }
];