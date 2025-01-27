import HeaderBackground from '@/components/HeaderBackground';
import LogoNav from '@/components/LogoNav';
import HeaderSearch from '@/components/HeaderSearch';
import ToggleTheme from '@/components/ToggleTheme';

export const PageTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header className="relative">
        <HeaderBackground />
        <div className="container relative mx-auto px-5 pb-3 pt-10">
          <ToggleTheme className="absolute left-5 top-5" />
          <LogoNav />
          <HeaderSearch />
        </div>
      </header>
      <main className="flex-grow bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto mt-5 px-5">{children}</div>
      </main>
      <footer className="bg-slate-700 px-3 py-5 text-left text-white dark:bg-gray-800 xs:text-center">
        <p className="mb-3 text-sm">
          Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            TypeScript
          </a>
          , styled using{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Tailwind CSS
          </a>
          , deployed on{' '}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Vercel
          </a>
          , and powered by the{' '}
          <a
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Spoonacular API
          </a>
          .
        </p>
        <p className="text-xs">
          &#169; {new Date().getFullYear()} Happy Fork Recipes. A website by{' '}
          <a
            href="https://scottbuchanan.ca/"
            className="font-bold text-white no-underline hover:text-white hover:underline focus-visible:underline"
          >
            Scott Buchanan
          </a>
          .
        </p>
      </footer>
    </>
  );
};
