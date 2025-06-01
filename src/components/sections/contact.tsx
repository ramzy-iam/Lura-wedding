export const ContactSection = () => {
  return (
    <div
      id="contact"
      className="relative flex items-center justify-center gap-6 px-4 py-20 sm:p-[128px]"
    >
      <img
        src="/images/flower.png"
        alt="Flower"
        className="absolute top-[21px] right-0 z-[-1] h-[58px] w-[58.02px] sm:h-[211.15px] sm:w-[211.21px]"
      />
      <div className="flex flex-col gap-4 px-6 text-center">
        <h2 className="section-heading text-primary">Contactez-nous!</h2>
        <p className="max-w-[664px]">
          Vous souhaitez nous laisser un message ou poser une question ?<br />
          N'hésitez pas à nous contacter par courriel ou par téléphone aux
          coordonnées ci-dessous :
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3">
            <p>Téléphone</p>
            <div className="space-x-4 text-center text-[24px] font-medium">
              <a
                href="tel:+237656463545"
                className="hover:text-primary"
                aria-label="Appeler +237 656 46 35 45"
              >
                +237 656 46 35 45
              </a>
              {'/ '}
              <a
                href="tel:+237697787666"
                className="hover:text-primary"
                aria-label="Appeler +237 697 78 76 66"
              >
                +237 697 78 76 66
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p>Email</p>
            <a
              href="mailto:luluministries@gmail.com"
              className="hover:primary text-[24px] font-medium"
              aria-label="Envoyer un email à luluministries@gmail.com"
            >
              luluministries@gmail.com
            </a>
          </div>
        </div>
      </div>
      <img
        src="/images/flower.png"
        alt="Flower"
        className="absolute -bottom-[12px] left-0 z-[-1] h-[78px] w-[78.02px] sm:-bottom-[25px] sm:h-[317.91px] sm:w-[318px]"
      />
    </div>
  );
};
