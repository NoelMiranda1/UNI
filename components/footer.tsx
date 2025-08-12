'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Mail, Printer, ExternalLink, Building2 } from 'lucide-react';
import { fetchFooterData, type FooterData } from '@/services/footer';
import { Skeleton } from '@/components/ui/skeleton';

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      const response = await fetchFooterData();
      if (response.docs.length > 0) {
        setFooterData(response.docs[0]);
      }
    } catch (error) {
      console.error('Error loading footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32 bg-white/20" />
                <Skeleton className="h-20 w-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo and description */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-20 relative">
                <Image
                  src="/logo-uni.svg"
                  alt="UNI Logo"
                  fill
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white/90">
              {footerData.titulo}
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              {footerData.descripcion}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-300" />
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 mt-0.5 text-blue-300 flex-shrink-0" />
                <div>
                  <p>{footerData.contacto.ubicacion}</p>
                  <p>{footerData.contacto.localidad}</p>
                  <p className="text-xs mt-1">
                    Apartado Postal: {footerData.contacto.apartadoPostal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Numbers and Fax */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-300" />
              Teléfonos
            </h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="space-y-2">
                <p className="font-medium text-white/90">Teléfonos:</p>
                {footerData.contacto.telefonos.map((tel) => (
                  <a 
                    key={tel.id}
                    href={`tel:${tel.telefono.replace(/\s/g, '')}`}
                    className="block hover:text-white transition-colors"
                  >
                    {tel.telefono}
                  </a>
                ))}
              </div>
              
              {footerData.contacto.telefaxes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="font-medium text-white/90 flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Telefax:
                  </p>
                  {footerData.contacto.telefaxes.map((fax) => (
                    <p key={fax.id} className="pl-6">
                      {fax.telefax}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Emails and Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-300" />
              Correos y Enlaces
            </h3>
            
            <div className="space-y-3 text-sm">
              {/* Emails */}
              <div className="space-y-2">
                <p className="font-medium text-white/90">Correos:</p>
                {footerData.contacto.correos.map((correo) => (
                  <a 
                    key={correo.id}
                    href={`mailto:${correo.correo}`}
                    className="block text-blue-100 hover:text-white transition-colors break-all"
                  >
                    {correo.correo}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Bottom Bar */}
        <div className="mt-12 border-t border-blue-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-blue-100 text-center sm:text-left">
              © {new Date().getFullYear()} Universidad Nacional de Ingeniería. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}