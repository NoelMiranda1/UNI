'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, Youtube } from 'lucide-react';

export function SocialBar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 transform bg-[#002D62] p-2 z-50">
      <div className="flex flex-col space-y-4">
        <Link href="https://www.facebook.com/UNIdeNicaraguaOficial" className="text-white hover:text-gray-300">
          <Facebook className="h-6 w-6" />
        </Link>
        <Link href="https://x.com/UNIdeNicOficial?ref_src=twsrc%5Etfw" className="text-white hover:text-gray-300">
          <Twitter className="h-6 w-6" />
        </Link>
        <Link href="https://www.instagram.com/unidenicaraguaoficial" className="text-white hover:text-gray-300">
          <Instagram className="h-6 w-6" />
        </Link>
        <Link href="https://www.youtube.com/c/UNIdeNicaragua" className="text-white hover:text-gray-300">
          <Youtube className="h-6 w-6"/>
        </Link>
      </div>
    </div>
  );
}