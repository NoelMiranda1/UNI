import NewsContent from './news-content';

// Esta función se ejecuta en build time para generar las páginas estáticas
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/noticias?limit=100`);
    
    if (!response.ok) {
      console.error('Error fetching noticias for static generation');
      return [];
    }
    
    const data = await response.json();
    
    // Retornar los IDs de forma dinámica
    return data.docs.map((noticia: any) => ({
      id: noticia.id
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default function NewsDetail({ params }: { params: { id: string } }) {
  return <NewsContent id={params.id} />;
}