import EventContent from './event-content';

// Página dinámica que se renderiza en el servidor (SSR)
// No necesita generateStaticParams ya que no usamos exportación estática

export default function EventDetail({ params }: { params: { id: string } }) {
  return <EventContent id={params.id} />;
}