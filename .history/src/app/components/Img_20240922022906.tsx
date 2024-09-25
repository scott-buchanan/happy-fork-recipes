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
      width={0}
      height={0}
      style={{
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
