import { GlobalProvider } from '../context/GlobalContext';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Happy Fork Recipes',
  description: 'Make a meal tonight!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <html lang="en" className="h-full">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={`${inter.className} flex h-full flex-col bg-slate-100 antialiased`}>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </html>
    </GlobalProvider>
  );
}
