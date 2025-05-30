import { cn } from '@/utils';
import { ClotheSectionIcons, TurquoiseContact } from './data';

const ContactGroup = ({
  city,
  list,
  withBorder = false,
}: {
  city: string;
  list: { name: string; contact: string }[];
  withBorder?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        {ClotheSectionIcons.location}
        <span className="font-bold">{city}</span>
      </div>
      <div className="flex flex-col gap-3">
        {list.map((contact, index) => (
          <div
            key={contact.name}
            className={cn(
              'flex flex-col gap-3',
              withBorder &&
                index !== list.length - 1 &&
                'border-b-[1px] border-[#BC316A] pb-3',
            )}
          >
            <div className="flex items-center gap-6">
              {ClotheSectionIcons.person}
              <span>{contact.name}</span>
            </div>
            <div className="flex items-center gap-6">
              {ClotheSectionIcons.phone}
              <span>{contact.contact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ClothesSection = () => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:grid sm:grid-cols-2 sm:px-32">
      <div className="flex flex-col gap-4 sm:col-span-1">
        <h2 className="text-primary text-left text-[36px]">
          {"La Belle Turquoise vous fait un clin d'oeil"}
        </h2>
        <div className="h-[181px] overflow-hidden rounded-[28px] sm:h-[322px]">
          <img
            src="/images/turquoise.jpg"
            alt="Turquoise"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="font-satoshi text-[24px] font-medium">
          Prix: <span className="text-primary">{'5000 FCFA'}</span>
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:col-span-1 sm:gap-4">
        <div className="flex items-center rounded-[28px] bg-[#8A1049] p-7 text-white">
          <div className="flex flex-col gap-5">
            <h3 className="text-[24px]">{'Comment la récupérer ?'}</h3>
            <div className="flex flex-col gap-5 sm:flex-row">
              <ContactGroup
                city={TurquoiseContact.group1.city}
                list={TurquoiseContact.group1.list}
                withBorder
              />
              <div className="flex flex-1 flex-col sm:justify-between">
                <ContactGroup
                  city={TurquoiseContact.group2.city}
                  list={TurquoiseContact.group2.list}
                />
                <ContactGroup
                  city={TurquoiseContact.group3.city}
                  list={TurquoiseContact.group3.list}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <img
            src="/images/flower.png"
            alt="Flower"
            className="h-[24px] w-[24px]"
          />
          <p>
            {'Checo et Chouquette '}
            <span className="font-satoshi font-medium">
              {
                'vous prient, tout tendrement, de passer par ces points pour récupérer votre précieuse étoffe. '
              }
            </span>
            {'On vous attend tous, rayonnants en turquoise, au '}
            <span className="text-primary font-satoshi font-medium">
              {"Jardin d'Éden !"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
