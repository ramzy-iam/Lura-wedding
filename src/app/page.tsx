import {
  AgendaSection,
  ClothesSection,
  ContactSection,
  DressCodeSection,
  FooterSection,
  GallerySection,
  GardenSection,
  HeroSection,
  HistorySection,
  Navbar,
} from '@/components';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="text-body flex flex-col gap-[32px] sm:gap-32">
        <HeroSection />
        <GardenSection />
        <HistorySection />
        <AgendaSection />
        <ClothesSection />
        <DressCodeSection />
        <GallerySection />
      </main>
      <ContactSection />
      <FooterSection />
    </div>
  );
}
