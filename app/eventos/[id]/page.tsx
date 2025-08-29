import { PageLoader } from '@/components/ui/page-loader';
import { EventoDetailContent } from './evento-detail-content';
import eventosService from '@/services/eventos';

// Página dinámica que se renderiza en el servidor (SSR)
// No necesita generateStaticParams ya que no usamos exportación estática

export default async function EventoDetailPage({ params }: { params: { id: string } }) {
  let evento = null;
  
  try {
    evento = await eventosService.getEventoById(params.id);
  } catch (error) {
    console.error('Error al cargar evento:', error);
  }

  return <EventoDetailContent evento={evento} />;
}