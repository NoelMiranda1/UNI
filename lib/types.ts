// Interfaces para la oferta académica basadas en la estructura de la API

export interface Imagen {
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

export interface ImagenCarrera {
  imagen: Imagen;
  id: string;
}

export interface DescripcionCarrera {
  children?: Array<{
    text?: string;
  }>;
  type?: string;
}

export interface Carrera {
  id: string;
  nombre: string;
  descripcion: DescripcionCarrera[];
  imagenes: ImagenCarrera[];
  urlPerfilAcademico: string;
  createdAt: string;
  updatedAt: string;
}

export interface AreaConocimiento {
  id: string;
  nombre: string;
  carrerasRelacionadas: Carrera[];
  createdAt: string;
  updatedAt: string;
}

// Funciones helper
export const extractDescriptionText = (descripcion: DescripcionCarrera[]): string => {
  return descripcion
    .filter(item => item.children && !item.type)
    .map(item => 
      item.children?.map(child => child.text).join('')
    )
    .join(' ')
    .trim();
};

export const getFirstImage = (imagenes: ImagenCarrera[]): string | undefined => {
  return imagenes.length > 0 ? imagenes[0].imagen.url : undefined;
};

// Interfaces para la API de inicio
export interface ImagenFondo {
  imagen: Imagen;
  id: string;
}

export interface InicioData {
  id: string;
  titulo: string;
  imagenesFondo: ImagenFondo[];
  createdAt: string;
  updatedAt: string;
}

export interface InicioResponse {
  docs: InicioData[];
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