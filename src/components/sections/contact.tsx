export const ContactSection = () => {
  return (
    <div
      id="contact"
      className="flex items-center justify-center gap-6 px-4 py-20 sm:p-[128px]"
    >
      <div className="flex flex-col gap-4 px-6 text-center">
        <h2 className="section-heading text-primary">Contactez-nous!</h2>
        <p className="max-w-[664px]">
          Vous souhaitez nous laisser un message ou poser une question ?
          N’hésitez pas à nous contacter par courriel ou par téléphone aux
          coordonnées ci-dessous :
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3">
            <p>Telephone</p>
            <p className="text-center text-[24px] font-medium">
              +237 699 99 99 99 / 677 77 77 77
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>Email</p>
            <p className="text-[24px] font-medium">luluministries@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
