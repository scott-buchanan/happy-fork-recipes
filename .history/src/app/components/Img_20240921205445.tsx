import Image from 'next/image';

export default function Img({ children }: { children: React.ReactNode }) {
  return (
    <Image
      placeholder="blur"
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
