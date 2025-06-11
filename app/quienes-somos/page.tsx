"use client";

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, History, BookOpen, Award, Music, ChevronDown, ChevronUp } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

export default function QuienesSomos() {
  const historiaRef = useRef<HTMLDivElement>(null);
  const misionVisionRef = useRef<HTMLDivElement>(null);
  const principiosRef = useRef<HTMLDivElement>(null);
  const logoHimnoRef = useRef<HTMLDivElement>(null);

  const [isPrincipiosExpanded, setIsPrincipiosExpanded] = useState(false);
  const [activeEra, setActiveEra] = useState('fundacion');

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    const yOffset = -80;
    const element = ref.current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const historiaEras = {
    fundacion: {
      title: "Fundación y Primeros Pasos",
      years: "1680 - 1941",
      events: [
        {
          year: "1680",
          title: "Seminario San Ramón",
          content: "Se funda el seminario de San Ramón en León, donde se imparten los primeros cursos de Aritmética, Geometría, Algebra y Física, sentando las bases de la educación técnica en Nicaragua. Este seminario fue pionero en la formación científica del país."
        },
        {
          year: "1812",
          title: "Elevación a Universidad",
          content: "El seminario alcanza el nivel de universidad por decreto real del 10 de enero, marcando un hito en la educación superior del país. Esta transformación permitió expandir significativamente los programas académicos y la capacidad de formación."
        },
        {
          year: "1881",
          title: "Escuela de Artes y Oficios",
          content: "Se establece en Managua bajo la dirección de ingenieros franceses, formando maestranza de ferrocarril y entrenamiento de obreros ferroviarios. Esta institución fue fundamental para el desarrollo del ferrocarril nacional y la formación técnica especializada, convirtiéndose en el eje de mayor influencia en el desarrollo de la Ingeniería Nacional."
        },
        {
          year: "1941",
          title: "Génesis de la UNI",
          content: "Se crea la Escuela de Ingeniería bajo la visión del Ing. Julio Padilla Méndez. En agosto se incorpora a la recién creada Universidad Central de Nicaragua como Facultad de Ciencias Físico-Matemáticas, ofreciendo la carrera de Ingeniería Civil y contemplando la expansión hacia Arquitectura, Ingeniería en Minas e Ingeniería Eléctrica."
        }
      ]
    },
    desarrollo: {
      title: "Desarrollo Institucional",
      years: "1941 - 1968",
      events: [
        {
          year: "1946",
          title: "Primera Graduación y Crisis",
          content: "Se realiza la primera graduación de ingenieros civiles: Aníbal Arana R., Emilio Cuadra Cha., Salvador García A., Armando Hernández A., Francisco Jarquín B. y Emilio Molina. Ese mismo año, la Universidad Central cierra debido a protestas estudiantiles contra el régimen somocista, pero la Facultad de Ciencias Físico-Matemáticas continúa funcionando."
        },
        {
          year: "1947",
          title: "Integración Nacional",
          content: "La Universidad de León es elevada a Universidad Nacional, incorporando la Facultad de Ciencias Físico-Matemáticas. Este cambio fortalece la estructura académica y administrativa de la institución."
        },
        {
          year: "1958",
          title: "Autonomía y Reformas",
          content: "Se logra la Autonomía Universitaria, iniciando una época de transformaciones profundas en el funcionamiento académico, rendimiento y contenidos del plan de estudio. Se implementan exámenes de admisión para mejorar la calidad educativa."
        },
        {
          year: "1964",
          title: "Expansión Universitaria",
          content: "Se obtienen 104 manzanas de terreno para el actual Recinto Universitario 'Rubén Darío'. Este logro fue resultado de intensas negociaciones y marcó el inicio de una nueva era de crecimiento físico y académico."
        }
      ]
    },
    transformacion: {
      title: "Transformación y Modernización",
      years: "1968 - 1983",
      events: [
        {
          year: "1968",
          title: "Primera Transformación Curricular",
          content: "Se implementa una reforma curricular basada en las recomendaciones de la II Mesa Redonda de Facultades de Ingeniería de Centroamérica, adoptando el régimen semestral y el sistema de créditos."
        },
        {
          year: "1979",
          title: "Revolución y Cambio Educativo",
          content: "Tras el triunfo de la Revolución Popular Sandinista, se inicia una profunda transformación del sistema educativo superior, incluyendo la creación del Consejo Nacional de Educación Superior (CNES) y la separación de la UNAN en dos núcleos independientes."
        },
        {
          year: "1982",
          title: "Gestación de la UNI",
          content: "El Dr. Ernesto Castillo Martínez, presidente del CNES, encarga al Ing. Juan Sánchez Barquero coordinar la creación de una institución que unifique la enseñanza de ingeniería y arquitectura en Nicaragua. Este proceso se desarrolló en medio de grandes desafíos y limitaciones de recursos."
        },
        {
          year: "1983",
          title: "Nacimiento como Hija de la Revolución",
          content: "El 7 de febrero, mediante decreto 1234 de la Junta de Gobierno de Reconstrucción Nacional, nace la Universidad Nacional de Ingeniería como 'Hija de la Revolución'. A pesar de los recursos limitados, se logró establecer una red de colaboración internacional con 28 embajadas y múltiples universidades extranjeras. La UNI se fundó con el compromiso de mantener la máxima calidad académica y el rigor científico, estableciendo desde sus inicios altos estándares de excelencia en la formación de ingenieros."
        },
        {
          year: "1985",
          title: "Primer Programa de Maestría",
          content: "Con el respaldo de la Organización Panamericana de la Salud (OPS), se establece la primera Maestría en Ingeniería Ambiental, marcando un hito en el desarrollo académico de la institución y demostrando su rápida consolidación como centro de excelencia en educación superior."
        }
      ]
    }
  };

  const principiosValores = [
    {
      title: "Soberanía",
      description: "Somos un país soberano, independiente, con autodeterminación nacional como derecho irrenunciable del pueblo."
    },
    {
      title: "Buen vivir",
      description: "Vivimos en relación armónica con la Madre Tierra para la consecución de una calidad de vida plena."
    },
    {
      title: "Cientificidad",
      description: "Aplicamos diversos enfoques y métodos científicos, integrándolos con los saberes del pueblo."
    },
    {
      title: "Pertinencia",
      description: "Mantenemos congruencia entre la educación y las necesidades de la sociedad."
    },
    {
      title: "Educación para la Transformación",
      description: "Desarrollamos una ciudadanía crítica y comprometida para el buen vivir de los pueblos."
    },
    {
      title: "Interaprendizaje",
      description: "Fomentamos el aprendizaje colectivo que potencia las capacidades humanas y valores."
    },
    {
      title: "Interculturalidad",
      description: "Asumimos la interculturalidad como proceso permanente de construcción, establecimiento y fortalecimiento de espacios de diálogo, comunicación e interacción horizontal de doble vía, entre personas, comunidades y pueblos diversos y complementarios socio cultural y lingüísticamente."
    },
    {
      title: "Diálogo de saberes",
      description: "Comprendido como la construcción social del conocimiento, mediante el intercambio de ideas, sentires, imágenes, creencias, nociones, conceptos, prácticas, historias, deseos, vivencias y emociones para alcanzar la comprensión común y la plenitud de la vida."
    },
    {
      title: "Transparencia",
      description: "Este principio nos compromete a proporcionar información pública, financiera y social, sobre las acciones desarrolladas, de manera confiable, transparente y oportuna de su estructura, quehacer y resultados, en el cumplimiento de la misión y fines establecidos."
    },
    {
      title: "Cultura de Paz",
      description: "Promovemos la cultura de paz, como un derecho fundamental irrenunciable de los ciudadanos que promueve el aprender a convivir, a entender el pensar, sentir y actuar de las personas, las familias y las comunidades."
    },
    {
      title: "Solidaridad",
      description: "Promovemos una cultura de colaboración y ayuda mutua para lograr el bien común entre las personas y en la convivencia con la naturaleza. Debe ser un accionar, como sentimiento de unidad basado en metas e intereses comunes de nación."
    },
    {
      title: "Cuido de la Madre Tierra",
      description: "Como seres que formamos parte de la naturaleza, reconocemos nuestra interdependencia con todas las especies vivas y el planeta. El bien común supremo y universal, condición para todos los demás bienes, es la madre tierra; ésta debe ser amada, cuidada y regenerada."
    },
    {
      title: "Equidad",
      description: "Promovemos la justicia e igualdad de oportunidades para todos, respetando la pluralidad de la sociedad."
    },
    {
      title: "Inclusión",
      description: "Reconocemos que la diversidad de personas y las diferencias individuales son una oportunidad para el enriquecimiento de la sociedad, a través de la activa participación en la vida familiar, en la educación, en el trabajo y en general en todos los procesos sociales, culturales y en las comunidades."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">Quiénes Somos</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12">Descubre nuestra historia, valores y compromiso con la excelencia académica</p>
          <Button
            onClick={() => scrollToSection(historiaRef)}
            className="animate-bounce bg-white text-[#002D62] hover:bg-gray-100"
          >
            Explorar
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            <Button
              variant="ghost"
              onClick={() => scrollToSection(historiaRef)}
              className="whitespace-nowrap"
            >
              <History className="mr-2 h-4 w-4" />
              Historia
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection(misionVisionRef)}
              className="whitespace-nowrap"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Misión y Visión
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection(principiosRef)}
              className="whitespace-nowrap"
            >
              <Award className="mr-2 h-4 w-4" />
              Principios y Valores
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection(logoHimnoRef)}
              className="whitespace-nowrap"
            >
              <Music className="mr-2 h-4 w-4" />
              Logo e Himno
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Historia Section */}
        <div ref={historiaRef} className="mb-32 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002D62] mb-12">Nuestra Historia</h2>
          
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              {/* Era Selection */}
              <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
                {Object.entries(historiaEras).map(([key, era]) => (
                  <Button
                    key={key}
                    variant={activeEra === key ? "default" : "outline"}
                    onClick={() => setActiveEra(key)}
                    className={`flex-1 md:flex-none ${
                      activeEra === key ? "bg-[#002D62] text-white" : ""
                    }`}
                  >
                    {era.years}
                  </Button>
                ))}
              </div>

              {/* Timeline */}
              <div className="relative pl-20 md:pl-24 border-l-2 border-[#002D62]">
                <h3 className="text-xl md:text-2xl font-semibold text-[#002D62] mb-8">
                  {historiaEras[activeEra as keyof typeof historiaEras].title}
                </h3>
                
                <div className="space-y-16">
                  {historiaEras[activeEra as keyof typeof historiaEras].events.map((event, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[60px] md:-left-[52px] top-0 w-[44px] h-[44px] bg-[#002D62] rounded-full flex items-center justify-center text-white text-xs md:text-sm transform transition-transform group-hover:scale-110">
                        {event.year}
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h4 className="text-lg font-semibold text-[#002D62] mb-2">{event.title}</h4>
                        <p className="text-gray-600">{event.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg"
                    alt="Historia UNI"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="bg-[#002D62]/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#002D62] mb-3">¿Sabías que?</h3>
                  <p className="text-gray-600">
                    La UNI ha formado a más de 50,000 profesionales en ingeniería desde su fundación, contribuyendo significativamente al desarrollo tecnológico del país. Actualmente cuenta con más de 10,000 estudiantes activos y una planta docente de 380 catedráticos, de los cuales el 50% tiene estudios de Maestría o Doctorado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Misión y Visión Section */}
        <div ref={misionVisionRef} className="mb-32 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#002D62] p-8 rounded-lg text-white">
              <h3 className="text-3xl font-bold mb-6">Misión</h3>
              <p className="text-gray-200">
              La Universidad Nacional de Ingeniería es una Institución de Educación Superior estatal, autónoma, dedicada a la formación integral de profesionales en ingeniería y arquitectura, incluyendo los niveles de técnicos superiores y posgrado, considerando los estándares nacionales e internacionales, a través de la docencia, la investigación, la innovación y la extensión o vinculación, consolidando su formación con principios éticos, humanísticos y ambientales, contribuyendo al desarrollo sostenible del país y la región.
              </p>
            </div>
            <div className="bg-blue-600 p-8 rounded-lg text-white">
              <h3 className="text-3xl font-bold mb-6">Visión</h3>
              <p className="text-gray-200">
                La Universidad Nacional de Ingeniería, es líder nacional en la formación de ingenieros y arquitectos incluyendo los niveles de técnicos superiores y posgrado con proyección nacional e internacional, desarrollando investigación científica pertinente y proyectos con impacto socio económico, incidiendo en el desarrollo sostenible de Nicaragua y la Región.
              </p>
            </div>
          </div>
        </div>

        {/* Principios y Valores Section */}
        <div ref={principiosRef} className="mb-32 scroll-mt-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-[#002D62]">Principios y Valores</h2>
            <Button
              variant="ghost"
              onClick={() => setIsPrincipiosExpanded(!isPrincipiosExpanded)}
              className="text-[#002D62]"
            >
              {isPrincipiosExpanded ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </Button>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isPrincipiosExpanded ? 'opacity-100' : 'opacity-60 max-h-[400px] overflow-hidden'}`}>
            {principiosValores.map((valor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#002D62] mb-3">{valor.title}</h3>
                  <p className="text-gray-600">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logo e Himno Section */}
        <div ref={logoHimnoRef} className="scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#002D62] mb-6">Nuestro Logo</h3>
              <div className="relative h-64 w-64 mx-auto">
                <Image
                  src="/logo-uni.svg"
                  alt="Logo UNI"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-12 text-gray-600">
                <span>Forma</span>
Representa las siglas de la Universidad Nacional de Ingeniería: UNI, y está construido en base al rectángulo de sección áurea, que se puede construir con la forma del número de oro.
              </p>
              <p className="mt-12 text-gray-600">
                <span>Visualización</span>

Sus formas ortogonales y el hecho deben ser un rectángulo comunican la idea de la construcción, vías, viaductos y tuberías que simbolizan la última tecnología. El Logotipo es una alusión al origen, cauce, río, camino, a la espiral de serpiente y pájaro que representa al Dios aborigen nicaragüense Quetzalcóatl, cuya pintura se observa en la laguna de Asososca y en otras pinturas de cerámica arqueológica.
              </p>
              <h3 className="mt-12">Autor</h3>
                <span>Arquitecto Porfirio García Romano</span>
              
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-lg text-white text-center">
              <h3 className="text-3xl font-bold mb-8">Himno Universitario</h3>
              
              <div className="space-y-8 max-w-2xl mx-auto">
                <p>
                  Alma Mater, UNI Universidad Nacional de Ingeniería
                </p>

                <p>
                  Hoy te cantamos con vigor y alegría<br />
                  Universidad Nacional de Ingeniería el afán,<br />
                  el esfuerzo y nuestros sueños son nuestro<br />
                  empeño Alma Mater tan querida.
                </p>

                <p>
                  Alma Mater, UNI Universidad Nacional de Ingeniería.
                </p>

                <p>
                  La dura roca tornaremos en ladrillo para<br />
                  construir firmemente el futuro cosechando<br />
                  áureos frutos que den brillo a la verdad, a la<br />
                  justicia y al honor.
                </p>

                <p>
                  Y si el fracaso amenazara aún tu gloria, del<br />
                  universo, el supremo Arquitecto tañerá<br />
                  cuerdas vibrantes tan profundas que<br />
                  alumbrarán puerto seguro a la victoria.
                </p>

                <p>
                  Alma Mater, UNI Universidad Nacional de Ingeniería.
                </p>

                <div className="mt-12 text-gray-400">
                  <p className="font-semibold">Autor:</p>
                  <p>Ingeniero Cedrick Dalla-Torre Zamora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}