import Image from 'next/image';
import { ReactNode } from 'react';

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
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        src={imageUrl}
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
      />
      {children && <div style={{ position: 'absolute', top: 0, left: 0 }}>{children}</div>}
    </div>
  );
}
