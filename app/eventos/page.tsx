import { EventosContent } from './eventos-content';
import eventosService, { type Evento } from '@/services/eventos';

export default async function EventosPage() {
  let eventos: Evento[] = [];
  
  try {
    const response = await eventosService.getEventos();
    eventos = response.docs;
  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }

  return <EventosContent eventos={eventos} />;
}