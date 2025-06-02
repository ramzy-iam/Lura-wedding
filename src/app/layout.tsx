import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import './globals.css';
import { Toaster } from 'sonner';

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
      <body className="text-body">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
