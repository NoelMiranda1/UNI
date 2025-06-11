"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { 
  ChevronDown, 
  ChevronRight,
  Youtube,
  Video,
  Newspaper,
  Radio,
  FileText,
  BookOpen,
  FileDigit,
  BookOpenCheck
} from "lucide-react";
import Link from "next/link";
import { useDrawerStore } from "@/lib/store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MenuItem {
  id: string;
  title: string;
  icon: JSX.Element;
  items: {
    title: string;
    url: string;
    icon: JSX.Element;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: "uni-noticias",
    title: "UNI Noticias",
    icon: <Youtube className="h-5 w-5" />,
    items: [
      {
        title: "UNI TV",
        url: "https://www.youtube.com/@UNIdeNicaragua",
        icon: <Youtube className="h-4 w-4" />
      },
      {
        title: "Videos Institucionales",
        url: "/videos-institucionales",
        icon: <Video className="h-4 w-4" />
      },
      {
        title: "Noticias Destacadas",
        url: "/noticias",
        icon: <Newspaper className="h-4 w-4" />
      }
    ]
  },
  {
    id: "audios",
    title: "Audios",
    icon: <Radio className="h-5 w-5" />,
    items: [
      {
        title: "UNI Soluciones",
        url: "/uni-soluciones",
        icon: <FileText className="h-4 w-4" />
      },
      {
        title: "UNI Radio",
        url: "https://www.uni.edu.ni/radio",
        icon: <Radio className="h-4 w-4" />
      }
    ]
  },
  {
    id: "publicaciones",
    title: "Publicaciones",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        title: "Boletín Digital",
        url: "/boletin-digital",
        icon: <FileDigit className="h-4 w-4" />
      },
      {
        title: "Universitario Marzo 2025",
        url: "/universitario",
        icon: <Newspaper className="h-4 w-4" />
      },
      {
        title: "Portal Revista Académica",
        url: "/revista-academica",
        icon: <BookOpen className="h-4 w-4" />
      },
      {
        title: "El Higo Revista Científica",
        url: "/revista-cientifica",
        icon: <BookOpenCheck className="h-4 w-4" />
      }
    ]
  }
];

export function ChannelsSection() {
  const { isOpen, setIsOpen, activeMenu, setActiveMenu } = useDrawerStore();

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="left" 
        className="w-80 p-0 bg-white [&_[data-radix-sheet-overlay]]:bg-black/20"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 bg-primary-dark text-white">
            <SheetTitle className="text-xl font-semibold text-white">Canales UNI</SheetTitle>
          </div>
          
          <Accordion
            type="single"
            collapsible
            value={activeMenu || undefined}
            onValueChange={(value) => setActiveMenu(value)}
            className="flex-1 overflow-y-auto"
          >
            {menuItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 p-3 pl-12 hover:bg-gray-100 transition-colors"
                    >
                      {subItem.icon}
                      <span className="text-sm">{subItem.title}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}