export interface Comunicado {
  id: string;
  titulo: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComunicadosResponse {
  docs: Comunicado[];
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

export async function fetchComunicados(page: number = 1, limit: number = 10): Promise<ComunicadosResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comunicados?page=${page}&limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Error al cargar los comunicados');
  }
  
  return response.json();
}