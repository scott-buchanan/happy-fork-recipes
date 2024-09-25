import Image from 'next/image';

// Define the props interface
interface ImgProps {
    placeholder: string;
    description: string;
    imageUrl: string;
  }

export default function Img(): React.FC<ImgProps> = ({ placeholder, description, imageUrl })) {
  return (
    <Image
      placeholder={placeholder}
      src={equ.image}
      alt={equ.name}
      key={equ.id}
      width={300}
      height={300}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
