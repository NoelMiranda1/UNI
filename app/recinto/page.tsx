import { RecintosContent } from './recintos-content';
import recintosService, { type Recinto } from '@/services/recintos';

export default async function RecintosPage() {
  let recintos: Recinto[] = [];
  
  try {
    const response = await recintosService.getRecintos();
    recintos = response.docs;
  } catch (error) {
    console.error('Error al cargar recintos:', error);
  }

  return <RecintosContent recintos={recintos} />;
}