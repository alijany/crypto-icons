import { Container } from "@svgdotjs/svg.js";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  color: string;
  svg: string;
}

export type Coins = Coin[];

export type SvgCoins = Coin & { svgJs: Container };
