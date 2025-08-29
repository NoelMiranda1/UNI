import api from './api';

export interface IconoRedSocial {
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

export interface RedSocial {
  id: string;
  nombre: string;
  icono: IconoRedSocial;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface RedesSocialesResponse {
  docs: RedSocial[];
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

class RedesSocialesService {
  async getRedesSociales(): Promise<RedesSocialesResponse> {
    try {
      const response = await api.get<RedesSocialesResponse>('/redesSociales');
      return response.data;
    } catch (error) {
      console.error('Error al obtener redes sociales:', error);
      throw error;
    }
  }
}

export default new RedesSocialesService();