import Link from 'next/link';
import { navLinks } from './data';

export const FooterSection = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center gap-8 bg-[#005F7C] px-4 py-12 text-white lg:px-[128px]"
    >
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-16">
        <p>@2025 by Luchelle & Raoul.</p>
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <p className="font-sf-pro">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <a
          href="https://www.linkedin.com/in/rithe-merveille-essissima/"
          target="_blank"
          rel="noreferrer"
        >
          Designed by Ritha2ess
        </a>
        <p>Made with ❤️ by R.</p>
      </div>
    </footer>
  );
};
