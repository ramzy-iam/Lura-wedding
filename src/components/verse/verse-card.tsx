interface VerseCardProps {
  verse: string;
  reference: string;
}

export default function VerseCard({ verse, reference }: VerseCardProps) {
  return (
    <main className="relative mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <img
        src="/images/flower.png"
        alt="Décoration florale"
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-32 select-none"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#AD1061] via-[#01B7CC] to-[#015d82] p-[6px]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6">
            <p className="font-serif text-2xl leading-relaxed break-words whitespace-pre-wrap italic md:text-3xl">
              « {verse} »
            </p>
            <p className="mt-4 font-semibold">{reference}</p>
          </div>
          <div className="font-satisfy mt-6 text-[32px] tracking-wide text-[#AD1061]">
            LuRa 💍
          </div>
        </div>
      </div>
    </main>
  );
}
