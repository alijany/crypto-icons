import { Container } from "@svgdotjs/svg.js";
import { Sharp } from "sharp";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  color: string;
  svg: string;
}
export interface CryptoIcons {
  saveManifest(
    path: string,
    name: string,
    callback: (coin: Coin) => unknown
  ): CryptoIcons;

  modifySVG(callback: (svgElement: Container, coin: Coin) => void): CryptoIcons;

  sharp(callback: (sharpInstance: Sharp, coin: Coin) => void): CryptoIcons;

  filter(callback: (coin: Coin) => boolean): CryptoIcons;

  saveSVG(path: string, name?: (Coin: Coin) => string): CryptoIcons;

  reload(): CryptoIcons;

  operation(operation: Operation): CryptoIcons;
}

export interface Operation {
  visit(instance: CryptoIcons): unknown;
}

export type Coins = Coin[];
