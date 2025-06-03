export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex h-[490px] flex-col items-center justify-end lg:h-[749px] lg:justify-center"
    >
      <div className="absolute top-0 z-[-1] h-[416.16px] w-full overflow-hidden lg:h-full lg:w-full">
        <img
          className="sm-top-[23px] absolute top-0 h-full w-full object-cover object-[30%_0%] lg:h-auto lg:w-full"
          src="/images/hero.jpg "
          alt="Hero"
        />
      </div>
      <div className="flex h-[242px] w-[361px] flex-col items-start gap-2 rounded-[28px] bg-white/85 p-6 shadow-[0_4px_4px_rgba(0,0,0,0.06)] sm:w-[618px] md:h-auto lg:mt-[100px] lg:w-auto">
        <h1 className="font-satisfy text-primary w-full text-center text-[32px]">
          {"Bienvenue dans le Jardin d'Éden de Checo & Chouquette"}
        </h1>
        <p className="w-full text-center text-[18px] italic">
          « Il fait toute chose bonne en son temps... » - Ecclésiaste 3:11a
        </p>
      </div>
    </section>
  );
};
