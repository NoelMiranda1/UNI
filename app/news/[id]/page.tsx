import NewsContent from './news-content';

// Página dinámica que se renderiza en el servidor (SSR)
// No necesita generateStaticParams ya que no usamos exportación estática

export default function NewsDetail({ params }: { params: { id: string } }) {
  return <NewsContent id={params.id} />;
}