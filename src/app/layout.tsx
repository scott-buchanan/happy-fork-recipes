import '@/styles/globals.css';
import '@mantine/core/styles.css';

import { GlobalProvider } from '@/context/GlobalContext';
import { MantineProvider } from '@mantine/core';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import type { Metadata } from 'next';

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} flex h-full flex-col antialiased`}>
        <MantineProvider>
          <GlobalProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </GlobalProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
