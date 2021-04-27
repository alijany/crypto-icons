import { Container } from "@svgdotjs/svg.js";
import { Sharp } from "sharp";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  color: string;
  svg: string;
}

export type Coins = Coin[];

export type SvgCoins = Coin & { svgJs: Container };

export type SharpCoins = Coin & { svgSharp: Sharp };
