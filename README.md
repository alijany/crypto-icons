# crypto-icons (Document will be written soon ...)
> Based on the [Cryptocurrency Icons](https://github.com/spothq/cryptocurrency-icons)

## Table of Contents

- [crypto-icons (Document will be written soon ...)](#crypto-icons-document-will-be-written-soon-)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Installing](#installing)
  - [Examples](#examples)

## About

The project contains almost 400 crypto currencies in the SVG format. Completely free.

The project also have some fiat currencies: USD, GBP, EUR, JPY, CNY, RUB.

There's also a generic icon that can be used for cryptocurrencies missing an icon here.

You can use tools such as Sharp & Svg.Js to image processing and modifying SVG icons to Create your desired output.

## Installing

```properties
npm i @mh.alijany/crypto-icons
```

## Examples

```typescript
import { cryptoIcons } from '@mh.alijany/crypto-icons';
```

**Filtering and saving the icons :**
```typescript
cryptoIcons()
    .filter(coin => coin.name == "Bitcoin")
    .saveManifest("./dir")
    .reload()
    .filter(coin => coin.color == "#eab304")
    .saveSVG('./images');
```

**Using [SVG.js](https://svgjs.com/) to manipulating SVG elements :**
> Note : this also works in Node.Js environment 
```typescript
cryptoIcons()
    .modifySVG(svgJs => svgJs.rect(32,32).back())
    .saveSVG('./images');
```

**Using [sharp](https://sharp.pixelplumbing.com/) to image processing :**
```typescript
cryptoIcons()
    .filter(coin => coin.name == "Bitcoin")
    .sharp(sharpInstance => sharpInstance.toFile("btc-bitcoin.png"));
```

