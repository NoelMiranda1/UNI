import api from './api';

export interface ImagenEvento {
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

export interface Evento {
  id: string;
  titulo: string;
  descripcion: Array<{
    type?: string;
    children: Array<{
      text: string;
    }>;
  }>;
  fecha: string;
  hora: string;
  lugar: string;
  imagenes: Array<{
    imagen: ImagenEvento;
    id: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface EventosResponse {
  docs: Evento[];
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

class EventosService {
  async getEventos(params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<EventosResponse> {
    try {
      const response = await api.get<EventosResponse>('/eventos', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventoById(id: string): Promise<Evento> {
    try {
      const response = await api.get<Evento>(`/eventos/${id}`);
      return response.data;
    } catch (error) {
      console.log('Intentando obtener todos los eventos para encontrar el ID:', id);
      try {
        const allEventos = await this.getEventos({ limit: 100 });
        const evento = allEventos.docs.find(e => e.id === id);
        if (!evento) {
          throw new Error('Evento no encontrado');
        }
        return evento;
      } catch (fallbackError) {
        console.error('Error al obtener evento por ID:', fallbackError);
        throw fallbackError;
      }
    }
  }

  extractDescripcion(descripcion: Evento['descripcion']): string {
    if (!descripcion || !Array.isArray(descripcion)) return '';
    
    return descripcion
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

export default new EventosService();