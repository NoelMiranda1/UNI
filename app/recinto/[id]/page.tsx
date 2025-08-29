import { RecintoDetailContent } from './recinto-detail-content';
import recintosService from '@/services/recintos';

// Página dinámica que se renderiza en el servidor (SSR)
// No necesita generateStaticParams ya que no usamos exportación estática

export default async function RecintoDetailPage({ params }: { params: { id: string } }) {
  let recinto = null;
  
  try {
    recinto = await recintosService.getRecintoById(params.id);
  } catch (error) {
    console.error('Error al cargar recinto:', error);
  }

  return <RecintoDetailContent recinto={recinto} />;
}