'use client';

import Link from 'next/link';
import { Menu, AlignLeft, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
import Image from 'next/image';
import { ChannelsSection } from './channels-section';
import { useDrawerStore } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { toggleDrawer } = useDrawerStore();

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/quienes-somos', label: 'Quiénes somos' },
    { href: '/oferta-academica', label: 'Oferta Académica' },
    { href: '/investigacion', label: 'Investigación y Ext.' },
    { href: '/posgrado', label: 'Posgrado' },
    { href: '/dae', label: 'DAE' },
  ];

  return (
    <nav className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-primary-lightest"
              onClick={toggleDrawer}
            >
              <AlignLeft className="h-6 w-6" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-16 relative">
                <Image
                  src="/logo-uni.svg"
                  alt="UNI Logo"
                  fill
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 hover:text-primary-lightest transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-primary-lightest">
                    Enlaces Importantes
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href="/organizacion" className="w-full">
                      Organización
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/recinto" className="w-full">
                      Recinto
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link 
                      href="https://si.uni.edu.ni/SIPPSI/Formularios/login.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      SIPPSI
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-primary-dark text-white">
                <SheetTitle className="text-white">Menú Principal</SheetTitle>
                <div className="flex flex-col space-y-4 pt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 hover:text-primary-lightest transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="px-3 py-2">
                    <p className="font-semibold mb-2">Enlaces Importantes</p>
                    <div className="pl-4 space-y-2">
                      <Link href="/organizacion" className="block hover:text-primary-lightest">
                        Organización
                      </Link>
                      <Link href="/recinto" className="block hover:text-primary-lightest">
                        Recinto
                      </Link>
                      <Link 
                        href="https://si.uni.edu.ni/SIPPSI/Formularios/login.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-primary-lightest"
                      >
                        SIPPSI
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <ChannelsSection />
    </nav>
  );
}