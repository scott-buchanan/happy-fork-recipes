'use client';
import Image, { StaticImageData } from 'next/image';
import backgroundLight from '/public/images/background-light.jpg';
import backgroundDark from '/public/images/background-dark.jpg';
import { useThemeContext } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export default function HeaderBackground() {
  const { theme } = useThemeContext();
  const [src, setSrc] = useState<StaticImageData>(backgroundLight);

  useEffect(() => {
    setSrc(theme === 'light' ? backgroundLight : backgroundDark);
  }, [theme]);

  return (
    src && (
      <Image
        src={src}
        alt=""
        fill
        key={theme}
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        quality={100}
        placeholder="blur"
        className="static -z-10 object-left sm:object-center"
      />
    )
  );
}
