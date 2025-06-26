import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getBaseUrl } from '@/services/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // Si ya es una URL completa, la devolvemos tal como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si empieza con /, la concatenamos con la URL base
  if (imagePath.startsWith('/')) {
    return `${getBaseUrl()}${imagePath}`;
  }
  
  // Si no empieza con /, agregamos / antes de concatenar
  return `${getBaseUrl()}/${imagePath}`;
}
