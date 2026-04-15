import api from './api';
import { safeImageUrl } from '@/lib/utils';

export interface FotoRecinto {
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

export interface Telefono {
  telefono: string;
  id: string;
}

export interface Telefax {
  telefax: string;
  id: string;
}

export interface ImagenRecinto {
  foto: FotoRecinto;
  principal: boolean;
  id: string;
}

export interface Recinto {
  id: string;
  nombre: string;
  descripcion: string;
  telefonos: Telefono[];
  telefaxes: Telefax[];
  apartadoPostal?: string;
  fotos: ImagenRecinto[];
  createdAt: string;
  updatedAt: string;
}

export interface RecintosResponse {
  docs: Recinto[];
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

class RecintosService {
  async getRecintos(params?: {
    page?: number;
    limit?: number;
  }): Promise<RecintosResponse> {
    try {
      const response = await api.get<RecintosResponse>('/recintos', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener recintos:', error);
      throw error;
    }
  }

  async getRecintoById(id: string): Promise<Recinto> {
    try {
      const response = await api.get<Recinto>(`/recintos/${id}`);
      return response.data;
    } catch (error) {
      console.log('Intentando obtener todos los recintos para encontrar el ID:', id);
      try {
        const allRecintos = await this.getRecintos({ limit: 100 });
        const recinto = allRecintos.docs.find(r => r.id === id);
        if (!recinto) {
          throw new Error('Recinto no encontrado');
        }
        return recinto;
      } catch (fallbackError) {
        console.error('Error al obtener recinto por ID:', fallbackError);
        throw fallbackError;
      }
    }
  }

  getImageUrl(foto: FotoRecinto | undefined): string | null {
    if (!foto?.url) return null;
    return safeImageUrl(foto.url);
  }

  getPrincipalImage(fotos: ImagenRecinto[]): string | null {
    const principalImage = fotos.find(f => f.principal);
    if (principalImage) {
      return this.getImageUrl(principalImage.foto);
    }
    if (fotos.length > 0) {
      return this.getImageUrl(fotos[0].foto);
    }
    return null;
  }
}

export default new RecintosService();