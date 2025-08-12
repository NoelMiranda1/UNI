import CareerContent from './career-content';

// Esta función se ejecuta en build time para generar las páginas estáticas
export async function generateStaticParams() {
  try {
    // Hacer fetch directo durante el build
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/areas-de-conocimiento?limit=100`);
    
    if (!response.ok) {
      console.error('Error fetching areas for static generation');
      return [];
    }
    
    const data = await response.json();
    
    // Retornar los IDs de forma dinámica
    return data.docs.map((area: any) => ({
      id: area.id
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Retornar array vacío si hay error
    return [];
  }
}

export default function CareerDetail({ params }: { params: { id: string } }) {
  return <CareerContent id={params.id} />;
}