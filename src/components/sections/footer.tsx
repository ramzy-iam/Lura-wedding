import Link from 'next/link';
import { navLinks } from './data';

export const FooterSection = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center gap-8 bg-[#005F7C] px-4 py-12 text-white"
    >
      <p>@2025 by Luchelle & Raoul.</p>
      <div className="flex flex-col items-center justify-center gap-6">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <p className="font-sf-pro">{link.label}</p>
          </Link>
        ))}
      </div>
      <p>Designed by Ritha2ess</p>
      <p>Made with ❤️ by R.</p>
    </footer>
  );
};
