import { academicAreas } from '../../data';
import { AreaContent } from './area-content';

export function generateStaticParams() {
  return academicAreas.map((area) => ({
    id: area.id,
  }));
}

export default function AreaPage({ params }: { params: { id: string } }) {
  return <AreaContent id={params.id} />;
}