export interface ArchivoCalendario {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarioItem {
  id: string;
  titulo: string;
  anho: number;
  Subtitulo: string;
  archivo: ArchivoCalendario;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarioResponse {
  docs: CalendarioItem[];
}

export async function fetchCalendarios(): Promise<CalendarioResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendarioAcademico`);
  
  if (!response.ok) {
    throw new Error('Error al cargar los calendarios académicos');
  }
  
  return response.json();
}