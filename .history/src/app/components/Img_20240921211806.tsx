import Image from 'next/image';
import probe from "probe-image-size";

interface ImgProps {
  placeholder?: 'blur' | 'empty'
  description: string
  imageUrl: string
  width: number
  height: number
}

export default async function Img({ placeholder = 'blur', description, imageUrl, width, height }: ImgProps) {
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

        const sizes = await probe(imageUrl);

  return (
    <Image
      placeholder={placeholder} 
      src={imageUrl} 
      alt={description} 
      width={width}
      height={height}
      blurDataURL={rgbDataURL(237, 181, 6)}
      style={{
        objectFit: "contain",
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}