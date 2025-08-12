export interface Telefono {
  telefono: string;
  id: string;
}

export interface Telefax {
  telefax: string;
  id: string;
}

export interface Correo {
  correo: string;
  id: string;
}

export interface Contacto {
  id: string;
  ubicacion: string;
  apartadoPostal: string;
  localidad: string;
  telefonos: Telefono[];
  telefaxes: Telefax[];
  correos: Correo[];
  createdAt: string;
  updatedAt: string;
}

export interface FooterData {
  id: string;
  titulo: string;
  descripcion: string;
  contacto: Contacto;
  createdAt: string;
  updatedAt: string;
}

export interface FooterResponse {
  docs: FooterData[];
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

export async function fetchFooterData(): Promise<FooterResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
  
  if (!response.ok) {
    throw new Error('Error al cargar la información del footer');
  }
  
  return response.json();
}