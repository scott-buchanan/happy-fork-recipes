import Image from 'next/image';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  imageUrl: string;
  width: number;
  height: number;
}

export default function Img({ placeholder = 'empty', description, imageUrl }: ImgProps) {
  return (
    <Image
      src={imageUrl}
      alt={description}
      placeholder={placeholder}
      width={300}
      height={300}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
