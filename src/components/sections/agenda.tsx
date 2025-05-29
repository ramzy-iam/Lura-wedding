export const AgendaSection = () => {
  return (
    <div
      id="history"
      className="flex flex-col justify-between gap-6 px-4 sm:flex-row sm:gap-[108px] sm:px-32"
    >
      <div className="flex flex-col gap-6 sm:w-[533px] sm:pr-32">
        <div className="flex h-[59px] gap-6 sm:h-auto">
          <h2 className="section-heading text-primary">Notre Histoire</h2>
          <img
            src="/images/flower.png"
            alt="Flower"
            className="h-full md:hidden"
          />
        </div>

        <p>
          Tout a commencé un jour ...Nous pensions que c'était un hasard... et
          pourtant, Dieu avait tout orchestré. Une rencontre marquée par une
          connexion immédiate, par un sourire, une discussion sans fin,... et
          maintenant, nous voici prêts à nous engager pour la vie !
        </p>
        <img
          src="/images/flower.png"
          alt="Flower"
          className="hidden h-auto w-full sm:inline"
        />
      </div>

      <div className="h-[432px] overflow-clip rounded-[48px] sm:h-[738px] sm:w-[616px]">
        <img
          src="/images/history.jpg"
          alt="History"
          className="w-full max-w-[616px] rounded-[48px]"
        />
      </div>
    </div>
  );
};
