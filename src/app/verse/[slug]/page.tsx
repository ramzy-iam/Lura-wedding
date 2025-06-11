'use client';
import VerseCard from '@/components/verse/verse-card';
import { redirect } from 'next/navigation';
import { VERSES } from './data';

export default async function versePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = VERSES[params.slug];
  if (!data) {
    redirect('/');
  }

  return <VerseCard verse={data.verse} reference={data.reference} />;
}
