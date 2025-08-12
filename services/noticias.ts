import api from './api';

export interface ImagenNoticia {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface Noticia {
  id: string;
  nombre: string;
  slug: string;
  imagen: ImagenNoticia;
  descripcionCorta: string;
  fecha: string;
  descripcionLarga: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface NoticiasResponse {
  docs: Noticia[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

class NoticiasService {
  async getNoticias(params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<NoticiasResponse> {
    try {
      const response = await api.get<NoticiasResponse>('/noticias', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener noticias:', error);
      throw error;
    }
  }

  async getNoticiaById(id: string): Promise<Noticia> {
    try {
      const response = await api.get<Noticia>(`/noticias/${id}`);
      return response.data;
    } catch (error) {
      // Si el endpoint específico no funciona, obtener todas y filtrar
      console.log('Intentando obtener todas las noticias para encontrar el ID:', id);
      try {
        const allNoticias = await this.getNoticias({ limit: 100 });
        const noticia = allNoticias.docs.find(n => n.id === id);
        if (!noticia) {
          throw new Error('Noticia no encontrada');
        }
        return noticia;
      } catch (fallbackError) {
        console.error('Error al obtener noticia por ID:', fallbackError);
        throw fallbackError;
      }
    }
  }

  extractDescripcionLarga(descripcionLarga: Noticia['descripcionLarga']): string {
    if (!descripcionLarga || !Array.isArray(descripcionLarga)) return '';
    
    return descripcionLarga
      .map(paragraph => 
        paragraph.children
          .map(child => child.text)
          .join('')
      )
      .filter(text => text.trim())
      .join('\n\n');
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('es-NI', options);
  }
}

export default new NoticiasService();