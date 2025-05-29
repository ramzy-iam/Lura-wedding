export const HeroSection = () => {
  return (
    <div id="hero" className="h-[490px] sm:h-[169px]">
      <div className="h-full w-full sm:h-auto sm:w-auto">
        <img
          className="object-cover object-center sm:h-full sm:w-full"
          src="/images/hero.jpg "
          alt="Hero "
        />
      </div>

      <div>
        <h1 className="font-satisfy text-primary text-[32px]">
          Bienvenue dans le Jardin d'Éden de Checo & Chouquette
        </h1>
      </div>
    </div>
  );
};
