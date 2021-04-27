import sharp from "sharp";

export default function (svg: string): sharp.Sharp {
  const roundedCorners = Buffer.from(svg);
  return sharp(roundedCorners);
}