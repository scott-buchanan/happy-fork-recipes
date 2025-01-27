import Link from 'next/link';
import Image from 'next/image';

export default function LogoNav() {
  const title = 'Happy Fork Recipes';
  const description = 'Make a meal tonight!';

  return (
    <nav>
      <Link
        href="/"
        className="mb-3 flex flex-col items-center justify-center text-nowrap text-center text-gray-900 no-underline hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 xs:inline-flex"
      >
        <div className="h-28 w-28 md:h-32 md:w-32 lg:h-44 lg:w-44 xl:h-52 xl:w-52">
          <Image
            src="/images/happy-fork-recipes-logo.svg"
            alt="Happy Fork Recipes"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-2 text-3xl font-light xl:text-4xl">{title}</div>
        <span className="mt-3 inline-block border-t-2 border-gray-900 px-10 pt-1 text-sm dark:border-gray-100">
          {description}
        </span>
      </Link>
    </nav>
  );
}
