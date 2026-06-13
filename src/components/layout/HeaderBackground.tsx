'use client';
import Image from 'next/image';
import backgroundLight from '/public/images/background-light.jpg';
import backgroundDark from '/public/images/background-dark.jpg';

export default function HeaderBackground() {
  return (
    <>
      <Image
        src={backgroundLight}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        placeholder="blur"
        priority
        className="static object-left dark:hidden sm:object-center"
      />
      <Image
        src={backgroundDark}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        placeholder="blur"
        priority
        className="static hidden object-left dark:block sm:object-center"
      />
    </>
  );
}
