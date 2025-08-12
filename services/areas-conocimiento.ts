import api from './api';

export interface ImagenCarrera {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImagenItem {
  imagen: ImagenCarrera;
  id: string;
}

export interface CarreraRelacionada {
  id: string;
  nombre: string;
  descripcion: any[];
  descripcionPlana?: string;
  imagenes: ImagenItem[];
  urlPerfilAcademico?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AreaConocimiento {
  id: string;
  nombre: string;
  descripcion?: string;
  carrerasRelacionadas: CarreraRelacionada[];
  createdAt: string;
  updatedAt: string;
}

export interface AreasConocimientoResponse {
  docs: AreaConocimiento[];
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

class AreasConocimientoService {
  // Obtener todas las áreas de conocimiento
  async getAreas(params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<AreasConocimientoResponse> {
    try {
      const response = await api.get<AreasConocimientoResponse>('/areas-de-conocimiento', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener áreas de conocimiento:', error);
      throw error;
    }
  }

  // Obtener un área de conocimiento por ID
  async getAreaById(id: string): Promise<AreaConocimiento> {
    try {
      const response = await api.get<AreaConocimiento>(`/areas-de-conocimiento/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener área de conocimiento ${id}:`, error);
      throw error;
    }
  }

  // Buscar áreas de conocimiento
  async searchAreas(query: string): Promise<AreasConocimientoResponse> {
    try {
      const response = await api.get<AreasConocimientoResponse>('/areas-de-conocimiento', {
        params: {
          where: {
            nombre: {
              contains: query,
            },
          },
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar áreas de conocimiento:', error);
      throw error;
    }
  }

  // Obtener carreras de un área específica
  async getCarrerasByArea(areaId: string): Promise<CarreraRelacionada[]> {
    try {
      const area = await this.getAreaById(areaId);
      return area.carrerasRelacionadas || [];
    } catch (error) {
      console.error(`Error al obtener carreras del área ${areaId}:`, error);
      throw error;
    }
  }

  // Extraer descripción plana de la descripción estructurada
  extractPlainDescription(descripcion: any[]): string {
    if (!descripcion || !Array.isArray(descripcion)) return '';
    
    let plainText = '';
    for (const block of descripcion) {
      if (block.children) {
        for (const child of block.children) {
          if (child.text) {
            plainText += child.text;
          }
        }
      }
    }
    return plainText.trim();
  }
}

export default new AreasConocimientoService();