import {
  AgendaSection,
  GardenSection,
  HeroSection,
  HistorySection,
  Navbar,
} from '@/components';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col gap-[32px] sm:gap-32">
        <HeroSection />
        <GardenSection />
        <HistorySection />
        <AgendaSection />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
