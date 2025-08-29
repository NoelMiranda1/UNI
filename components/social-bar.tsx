'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Youtube, Rss } from 'lucide-react';
import redesSocialesService, { type RedSocial } from '@/services/redes-sociales';

export function SocialBar() {
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedesSociales = async () => {
      try {
        const response = await redesSocialesService.getRedesSociales();
        setRedesSociales(response.docs);
      } catch (error) {
        console.error('Error al cargar redes sociales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedesSociales();
  }, []);

  // Mapeo de nombres a iconos de Lucide React
  const getIconForSocialNetwork = (nombre: string) => {
    const nombreLower = nombre.toLowerCase();
    
    switch (nombreLower) {
      case 'facebook':
        return <Facebook className="h-6 w-6" />;
      case 'x':
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      case 'instagram':
        return <Instagram className="h-6 w-6" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'youtube':
        return <Youtube className="h-6 w-6" />;
      case 'blogspot':
      case 'blogger':
        return <Rss className="h-6 w-6" />;
      default:
        return <Globe className="h-6 w-6" />;
    }
  };

  if (loading || redesSociales.length === 0) {
    return null;
  }
console.log('redesSociales',redesSociales)
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 transform bg-[#002D62] p-2 z-50 rounded-l-lg shadow-lg">
      <div className="flex flex-col space-y-4">
        {redesSociales.map((red) => {
          const iconUrl = red.icono?.url 
            ? `${process.env.NEXT_PUBLIC_URL_IMAGES || 'https://cmsuni-production.up.railway.app'}${red.icono.url}`
            : null;
          // const iconUrl = null

          return (
            <Link 
              key={red.id}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-200 group"
              title={red.nombre}
            >
              {iconUrl ? (
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Image
                    src={iconUrl}
                    alt={red.nombre}
                    width={24}
                    height={24}
                    className="object-contain group-hover:opacity-70 transition-opacity"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) invert(100%)'
                    }}
                    unoptimized
                  />
                </div>
              ) : (
                getIconForSocialNetwork(red.nombre)
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}