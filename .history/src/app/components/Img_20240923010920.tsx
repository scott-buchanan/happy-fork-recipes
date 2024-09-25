import Image from 'next/image';
import { ReactNode, useState } from 'react';
import defaultImg from '../../assets/default-recipe.jpg';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  imageUrl: string;
  width: number;
  height: number;
  className?: string;
  children?: ReactNode;
}

export default function Img({
  placeholder = 'empty',
  description,
  imageUrl,
  height,
  width,
  className,
  children,
}: ImgProps) {
  const [url, setUrl] = useState(imageUrl);

  function handleImgError() {
    setUrl(defaultImg.src);
  }

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        src={url}
        alt={description}
        placeholder={placeholder}
        width={width}
        height={height}
        className={className}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          height: 'auto',
        }}
        onError={handleImgError}
      />
      {children && <div className="absolute bottom-0 w-full">{children}</div>}
    </div>
  );
}
