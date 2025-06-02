import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lura',
  description: 'Unis pour la vie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="text-[14px] sm:text-[18px]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
