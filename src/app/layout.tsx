import '@/styles/globals.css';
import '@mantine/core/styles.css';

import { GlobalProvider } from '@/context/GlobalContext';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';

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
  // const setInitialTheme = `
  //   (function() {
  //     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //     const storedTheme = localStorage.getItem('theme');
  //     const theme = storedTheme || (prefersDarkMode ? 'dark' : 'light');
  //     document.documentElement.classList.add(theme);
  //     if (!storedTheme) {
  //       localStorage.setItem('theme', theme);
  //     }
  //   })();
  // `;

  return (
    <html lang="en" className="h-full">
      <head>
        <ColorSchemeScript />
        {/* <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} /> */}
      </head>
      <body className={`${inter.className} flex h-full flex-col antialiased`}>
        <MantineProvider>
          <ThemeProvider>
            <GlobalProvider>{children}</GlobalProvider>
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
