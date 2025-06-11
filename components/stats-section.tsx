"use client";

import { Users, BookOpen, GraduationCap, History } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      number: "15,000+",
      label: "Estudiantes",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      number: "13",
      label: "Carreras",
      icon: <BookOpen className="h-6 w-6 text-white" />,
    },
    {
      number: "50,000+",
      label: "Graduados",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
    },
    {
      number: "100+",
      label: "Años de Historia",
      icon: <History className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#002D62] to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')] mix-blend-overlay opacity-10 bg-cover bg-center"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}