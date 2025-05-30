import { DressCodeIcons } from './data';

const ColorSet = () => {
  return (
    <div className="flex gap-[6.89px]">
      <div className="size-[11.49px] rounded-[28.72px] bg-[#AD1061]"></div>
      <div className="size-[11.49px] rounded-[28.72px] bg-[#FF6FAA]"></div>
      <div className="size-[11.49px] rounded-[28.72px] bg-[#FFD0CC]"></div>
      <div className="size-[11.49px] rounded-[28.72px] bg-[#005F7C]"></div>
      <div className="size-[11.49px] rounded-[28.72px] bg-[#01B7CC]"></div>
    </div>
  );
};

export const DressCodeSection = () => {
  return (
    <div id="dress-code" className="gap-6 px-6">
      <div className="flex flex-col gap-4">
        <h2 className="section-heading text-primary text-left">
          Tenue & Dress Code
        </h2>
        <p>
          Thème :{' '}
          <span className="text-primary font-satisfy text-[32px]">
            Jardin d'Éden
          </span>
        </p>
        <p>
          Nous vous invitons à adopter un style à la fois naturel et raffiné,
          dans des tons doux et floraux.
        </p>
        <p className="font-bold">Suggestions:</p>
        <div className="flex items-center gap-3">
          {DressCodeIcons.palette}
          <div className="flex items-center gap-3">
            <p>Palette de Rose, Vert turquoise</p>
            <ColorSet />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {DressCodeIcons.shirt}
          <p>Robes fluides, costumes légers, accessoires floraux</p>
        </div>
        <div className="flex items-center gap-3">
          {DressCodeIcons.bag}
          <p>Couronnes végétales, nœuds papillon fleuris bienvenus</p>
        </div>
        <div className="flex items-center gap-3">
          {DressCodeIcons.unavailable}
          <p>À éviter : le noir ou le rouge vif</p>
        </div>
        <p>
          Pensez surtout à venir avec votre plus beau sourire, il illuminera
          notre Jardin d'Éden bien plus que n'importe quel accessoire !
        </p>
        <img src="/images/dress-code-mobile.png" alt="Dress Code" />
      </div>
    </div>
  );
};
