import Image from 'next/image';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  imageUrl: string;
  width: number;
  height: number;
}

export default function Img({ placeholder = 'blur', description, imageUrl }: ImgProps) {
  return (
    <Image
      placeholder={placeholder}
      src={imageUrl}
      alt={description}
      width="100%"
      height="100%"
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}