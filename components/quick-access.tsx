"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Mail, GraduationCap, Calendar, Bell } from "lucide-react";
import Link from "next/link";
import { CalendarioModal } from "@/components/calendario-modal";
import { ComunicadosModal } from "@/components/comunicados-modal";

export function QuickAccess() {
  const [isCalendarioModalOpen, setIsCalendarioModalOpen] = useState(false);
  const [isComunicadosModalOpen, setIsComunicadosModalOpen] = useState(false);
  
  const quickLinks = [
    {
      title: "Procesos de compras",
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      href: "/",
      isModal: false
    },
    {
      title: "Correo UNI",
      icon: <Mail className="h-6 w-6 text-white" />,
      href: "/",
      isModal: false
    },
    {
      title: "Notas en Línea",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      href: "https://siu.uni.edu.ni/notasuni/",
      isModal: false
    },
    {
      title: "Calendario Académico",
      icon: <Calendar className="h-6 w-6 text-white" />,
      href: "/",
      isModal: true,
      onClick: () => setIsCalendarioModalOpen(true)
    },
    {
      title: "Comunicados",
      icon: <Bell className="h-6 w-6 text-white" />,
      href: "/",
      isModal: true,
      onClick: () => setIsComunicadosModalOpen(true)
    }
  ];

  return (
    <>
      <section className="-mt-8 relative z-10 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {quickLinks.map((link) => (
              link.isModal ? (
                <button
                  key={link.title}
                  onClick={link.onClick}
                  className="block transform hover:-translate-y-1 transition-all duration-300 w-full text-left"
                >
                  <div className="rounded-xl p-6 bg-primary-light shadow-lg hover:shadow-xl border border-white/10 text-white cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="bg-white/10 p-3 rounded-full">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold">{link.title}</h3>
                    </div>
                  </div>
                </button>
              ) : (
                <Link href={link.href} key={link.title} className="block transform hover:-translate-y-1 transition-all duration-300">
                  <div className="rounded-xl p-6 bg-primary-light shadow-lg hover:shadow-xl border border-white/10 text-white">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="bg-white/10 p-3 rounded-full">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold">{link.title}</h3>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
      
      <CalendarioModal 
        isOpen={isCalendarioModalOpen} 
        onClose={() => setIsCalendarioModalOpen(false)} 
      />
      
      <ComunicadosModal
        isOpen={isComunicadosModalOpen}
        onClose={() => setIsComunicadosModalOpen(false)}
      />
    </>
  );
}