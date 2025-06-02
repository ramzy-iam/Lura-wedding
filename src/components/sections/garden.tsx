export const GardenSection = () => {
  return (
    <section
      id="garden"
      className="flex w-full flex-col-reverse items-center justify-center gap-6 p-4 md:grid md:grid-cols-7 md:gap-8 lg:items-start"
    >
      <div className="w-full md:col-span-3 lg:col-span-4">
        <img src="/images/garden.png" alt="Garden" className="h-auto w-full" />
      </div>

      <div className="flex w-full flex-col gap-6 md:col-span-4 md:px-6 lg:col-span-3">
        <h2 className="section-heading text-primary text-left">
          Chers Proches,
        </h2>
        <p>
          {`C'est avec une immense joie et une profonde gratitude que nous vous
          ouvrons les portes de notre "Jardin d'Éden" — un lieu symbolique, doux
          et sacré, où l'Amour véritable prend racine, s'épanouit et porte du
          fruit.`}
        </p>
        <p>
          {"Comme Dieu l'a dit:"} <br />
          <span className="text-primary italic">
            {
              "« Il n'est pas bon que l'homme soit seul. Je lui ferai une aide semblable à lui. » (Genèse 2:18)"
            }
          </span>
        </p>
        <p>
          {`Dieu a planté une graine d'amour dans nos cœurs et aujourd'hui, elle
          fleurit dans notre Jardin d'Éden. Nous vous invitons à célébrer avec
          nous cette union sacrée, bénie par Celui qui nous a unis.`}
        </p>
      </div>
    </section>
  );
};
