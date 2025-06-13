'use client';

import { useRouter } from 'next/navigation';
import { VERSES } from './data';
import { useState } from 'react';

export default function VersePage() {
  const slugs = Object.keys(VERSES);
  const router = useRouter();

  const [slug, setSlug] = useState(() => {
    const index = Math.floor(Math.random() * slugs.length);
    return slugs[index];
  });

  const { reference, verse } = VERSES[slug];

  const regenerate = () => {
    const newSlug = slugs[Math.floor(Math.random() * slugs.length)];
    setSlug(newSlug);
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <main className="relative mx-auto flex min-h-svh flex-col items-center justify-center px-4 py-8 text-center">
      <img
        src="/images/flower.png"
        alt="Décoration florale"
        className="pointer-events-none absolute top-0 left-0 h-auto w-20 select-none md:w-32"
      />

      <p className="mt-11 mb-6 text-lg font-medium text-[#AD1061]">
        {"Une pensée d'amour pour vous 🌷"}
      </p>

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#214f61] via-[#01B7CC] to-[#015d82] p-[6px]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6">
            <p className="font-serif text-2xl leading-relaxed break-words whitespace-pre-wrap italic md:text-3xl">
              « {verse} »
            </p>
            <p className="mt-4 font-semibold">{reference}</p>
          </div>
          <h1 className="font-satisfy mt-6 text-[32px] tracking-wide text-[#214f61]">
            LuRa 💍
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {/* <button
          onClick={regenerate}
          className="rounded-xl bg-[#015d82] px-6 py-2 text-white transition hover:bg-[#005F7C]"
        >
          ✨ Encore une !
        </button> */}
        <button
          onClick={goHome}
          className="cursor-pointer rounded-xl border border-[#AD1061] px-6 py-2 text-[#AD1061] transition hover:bg-[#AD1061] hover:text-white"
        >
          {"🌸 Allez au Jardin d'Éden"}
        </button>
      </div>
    </main>
  );
}
