import Image from 'next/image';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  imageUrl: string;
  width: number;
  height: number;
  className: string;
}

export default function Img({
  placeholder = 'empty',
  description,
  imageUrl,
  height,
  width,
  className,
}: ImgProps) {
  return (
    <Image
      src={imageUrl}
      alt={description}
      placeholder={placeholder}
      width={width}
      height={height}
      className={className}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
