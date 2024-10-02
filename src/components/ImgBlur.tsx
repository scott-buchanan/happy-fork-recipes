import Image, { StaticImageData } from 'next/image';
import { ReactNode, useState } from 'react';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  src: string | StaticImageData;
  height: number;
  width: number;
  dataUrl?: string;
  quality?: number;
  className?: string;
  children?: ReactNode;
}

export default function ImgBlur({
  src,
  placeholder = 'blur',
  description,
  dataUrl,
  height,
  width,
  className,
  children,
  quality = 100,
}: ImgProps) {
  const [newImg, setNewImg] = useState<string | StaticImageData>(src);

  function handleImgError() {
    setNewImg('/images/default-recipe.jpg');
  }

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        src={newImg}
        alt={description || ''}
        placeholder={placeholder}
        blurDataURL={dataUrl || undefined}
        height={height}
        width={width}
        quality={quality}
        className={`transition-all ${className} object-cover`}
        onError={handleImgError}
      />
      {children && <div className="absolute bottom-0 w-full">{children}</div>}
    </div>
  );
}
