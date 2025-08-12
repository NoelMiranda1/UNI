import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // Si ya es una URL completa, la devolvemos tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_URL_IMAGES || '';
  
  // Si empieza con /, la concatenamos con la URL base
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // Si no empieza con /, agregamos / antes de concatenar
  return `${baseUrl}/${imagePath}`;
}
