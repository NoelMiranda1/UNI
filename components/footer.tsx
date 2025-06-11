'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#002D62] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="h-12 w-20 relative">
              <Image
                src="/logo-uni.svg"
                alt="UNI Logo"
                fill
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm">
              Universidad Nacional de Ingeniería
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-2 text-sm">
              <p>Sede Central Avenida Universitaria</p>
              <p>Managua, Nicaragua</p>
              <p>Apartado Postal: 5595</p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Teléfonos</h3>
            <div className="space-y-2 text-sm">
              <p>(505) 2267-0275 / 77</p>
              <p>Telefax:</p>
              <p>(505) 2267-3709</p>
              <p>(505) 2277-2728</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admision" className="hover:text-gray-300">
                  Admisión
                </Link>
              </li>
              <li>
                <Link href="/carreras" className="hover:text-gray-300">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/investigacion" className="hover:text-gray-300">
                  Investigación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-600 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Universidad Nacional de Ingeniería. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}