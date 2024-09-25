import Image from 'next/image';

// Define the props interface
interface ImgProps {
  placeholder: 'blur' | 'empty'
  description: string
  imageUrl: string
  width: number
  height: number
}

export default function Img({ placeholder, description, imageUrl }: ImgProps) {
  return (
    <Image
      placeholder={placeholder} 
      src={imageUrl} 
      alt={description} 
      width={300}
      height={300}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}