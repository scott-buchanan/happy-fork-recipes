import Image from 'next/image';
import probe from 'probe-image-size';

interface ImgProps {
  placeholder?: 'blur' | 'empty';
  description: string;
  imageUrl: string;
  width: number;
  height: number;
}

export default async function Img({ placeholder = 'blur', description, imageUrl }: ImgProps) {
  const sizes: { height: number; width: number } = await probe(imageUrl);

  return (
    <Image
      placeholder={placeholder}
      src={imageUrl}
      alt={description}
      width={sizes.width}
      height={sizes.height}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
