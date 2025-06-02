'use client';

import {
  AgendaSection,
  ClothesSection,
  CommentSection,
  ContactSection,
  DressCodeSection,
  FooterSection,
  GallerySection,
  GardenSection,
  HeroSection,
  HistorySection,
  Navbar,
} from '@/components';
import { ScrollToTopButton } from '@/components/ui';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="text-body flex flex-col gap-[32px] lg:gap-32">
        <HeroSection />
        <GardenSection />
        <HistorySection />
        <AgendaSection />
        <ClothesSection />
        <DressCodeSection />
        <GallerySection />
        <CommentSection />
      </main>
      <ScrollToTopButton />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
