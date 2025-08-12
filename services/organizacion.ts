export interface Cargo {
  id: string;
  nombreCargo: string;
  fotoEncargado?: {
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
  };
  nombreEncargado: string;
  correoEncargado: string;
  descripcionCargo?: any[];
  descripcionPlano: string;
  createdAt: string;
  updatedAt: string;
}

export interface Division {
  id: string;
  nombre: string;
  cargos: Cargo[];
  createdAt: string;
  updatedAt: string;
}

export interface Organizacion {
  id: string;
  nombre: string;
  descripcion: string;
  divisiones: Division[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizacionResponse {
  docs: Organizacion[];
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

export async function fetchOrganizacion(): Promise<OrganizacionResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizacionUNI?depth=3`);
  
  if (!response.ok) {
    throw new Error('Error al cargar la información de organización');
  }
  
  return response.json();
}