export interface Coin {
  id: string;
  name: string;
  symbol: string;
  color: string;
  svg: string;
}

export type Coins = Coin[];