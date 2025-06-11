import VerseCard from '@/components/verse/verse-card';
import { redirect } from 'next/navigation';
import { VERSES } from './data';
import { PageProps } from '../../../../.next/types/app/verse/[slug]/page';

export default async function versePage(
  { params }: PageProps,
  // props: Promise<{ params: { slug: string } }>,
) {
  const { slug } = await params;
  const data = VERSES[slug];
  if (!data) {
    redirect('/');
  }

  return <VerseCard verse={data.verse} reference={data.reference} />;
}
