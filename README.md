# crypto-icons

> Based on the [Cryptocurrency Icons](https://github.com/spothq/cryptocurrency-icons)

## Table of Contents

- [crypto-icons](#crypto-icons)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Install](#install)
  - [Examples](#examples)
  - [Coins Model Overview](#coins-model-overview)
  - [Api](#api)

## About

The project contains almost 400 crypto currencies in the SVG format.

The project also have a generic icon for cryptocurrencies missing an icon here. and in addition some fiat currencies: USD, GBP, EUR, JPY, CNY, RUB.

You can use tools such as Sharp & Svg.Js to image processing and modifying SVG icons to Create your desired output.

## Install

```properties
npm i @mh.alijany/crypto-icons
```

## Examples

```typescript
import { cryptoIcons } from "@mh.alijany/crypto-icons";
```

**Filter and save the icons :**

```typescript
cryptoIcons()
  .filter((coin) => coin.name == "Bitcoin")
  .saveManifest("./dir")
  .reload()
  .filter((coin) => coin.color == "#eab304")
  .saveSVG("./images");
```

**Use [SVG.js](https://svgjs.com/) to manipulate SVG elements :**

> Note : this also works in Node.Js environment

```typescript
cryptoIcons()
  .modifySVG((svgJs) => svgJs.rect(32, 32).back())
  .saveSVG("./images");
```

**Use [sharp](https://sharp.pixelplumbing.com/) to image processing :**

```typescript
cryptoIcons()
  .filter((coin) => coin.name == "Bitcoin")
  .sharp((sharpInstance) => sharpInstance.toFile("btc-bitcoin.png"));
```

## Coins Model Overview

In this project, each `Coin` is an object that includes the `name` , `symbol` , `id` , `color` and `svg` of the `Coin`.
The `id` is a combine of `symbol`-`name` which is lower case and its spaces have been replaced by dashes.

for example:

```typescript
const Coin = {
  id: "btc-bitcoin",
  symbol: "BTC",
  name: "Bitcoin",
  color: "#f7931a",
  svg:
    '<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg">...</svg>',
};
```

## Api

### `cryptoIcons(): CryptoIcon`

create new instance of CryptoIcon

```typescript
import { cryptoIcons } from '@mh.alijany/crypto-icons';
const instance = cryptoIcons();
```

#### `saveManifest(path: string, name?: string, callback?: Function) : CryptoIcon`

Writes a JSON file that contains an array of ‍‍`Coin` objects

| Parameter |                       Description                      |
|:---------:|:------------------------------------------------------:|
|    path   |                directory to write output               |
|    name   |   name of the output file (default is manifest.json)   |
|  callback |       map function to customize the default Coin       |

```typescript
cryptoIcons()
  .saveManifest(
    "./dir",
    "manifest.json", 
    coin => coin
  );
```

#### `modifySVG(callback: Function): CryptoIcons`

Process SVG image whit [sharp](https://sharp.pixelplumbing.com/)

| Parameter |                   Description                    |
|:---------:|:------------------------------------------------:|
|  callback | function whit an instance the sharp as parameter |

```typescript
cryptoIcons()
  .sharp((sharpInstance, coin) => {
    sharpInstance.toFile(`${coin.id}.png`)
  });
```

#### `filter(callback: Function): CryptoIcons`

Filter the coins that meet the condition specified in a callback function.

| Parameter |                             Description                              |
|:---------:|:--------------------------------------------------------------------:|
|  callback | test function that Return true to keep the element, false otherwise. |

```typescript
cryptoIcons()
  .filter((coin) => coin.name.startsWith("Bit"));
```

#### `saveSVG(path: string, name?: Function): CryptoIcons`

Write the svg file of each `Coin` object in specified path

| Parameter |                                Description                                |
|:---------:|:-------------------------------------------------------------------------:|
|    path   |                         directory to write output                         |
|    name   | callback that return the name of the output file (default is coin.id.svg) |

```typescript
cryptoIcons()
  .saveSVG("./dir", (coin) => `${coin.id}.svg`);
```

#### `reload(): CryptoIcons`

 Reload all of the `Coin` objects

 ```typescript
cryptoIcons()
  .reload();
```
