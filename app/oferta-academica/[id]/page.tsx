import CareerContent from './career-content';

// Página dinámica que se renderiza en el servidor (SSR)
// No necesita generateStaticParams ya que no usamos exportación estática

export default function CareerDetail({ params }: { params: { id: string } }) {
  return <CareerContent id={params.id} />;
}