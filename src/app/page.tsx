import Image from "next/image";
import { HeroSection, Navbar } from "@/components";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HeroSection />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
