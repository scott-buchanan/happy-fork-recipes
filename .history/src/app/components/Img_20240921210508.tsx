import Image from 'next/image';

interface ImgProps {
  placeholder: 'blur' | 'empty'
  description: string
  imageUrl: string
  width: number
  height: number
}

export default function Img({ placeholder = 'blur', description, imageUrl }: ImgProps) {

    const keyStr =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    const triplet = (e1: number, e2: number, e3: number) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63);
    const rgbDataURL = (r: number, g: number, b: number) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${
          triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <Image
      placeholder={placeholder} 
      src={imageUrl} 
      alt={description} 
      width={300}
      height={300}
      blurDataURL={rgbDataURL(237, 181, 6)}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}