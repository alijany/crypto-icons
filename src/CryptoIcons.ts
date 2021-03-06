import { Container } from "@svgdotjs/svg.js";
import fs from "fs";
import { Sharp } from "sharp";
import { Coin, Coins, CryptoIcons, Operation } from "./Contracts";
import manifest from "./manifest";
import sharp from "./sharp";
import createSvg from "./svgJS";

export default class $CryptoIcons implements CryptoIcons {
  constructor() {
    this.coins = this.load();
  }

  private coins: Coins;

  private load() {
    return manifest.map((coin) => ({ ...coin }));
  }

  private forEach<T>(
    prepare: (coin: Coin) => T,
    callback: (arg: T, coin: Coin) => void,
    save?: (arg: T, coin: Coin) => void
  ) {
    this.coins.forEach((coin) => {
      const arg = prepare(coin);
      callback(arg, { ...coin });
      save && save(arg, coin);
    });
  }

  /**
   * Write the manifest file for `coins`
   *
   * @param path A string specifying where you want to save the files to.
   * @param name The name of the file to save (default is manifest.json)
   * @param callback Function that called for each `Coin` then the returned value added to manifest. (default coin)
   * @returns `CryptoIcons`
   */
  public saveManifest(
    path: string,
    name = "manifest.json",
    callback: (coin: Coin) => unknown = (coin) => coin
  ): CryptoIcons {
    const callbackFn = (coin: Coin) => callback({ ...coin });
    const manifest = this.coins.map(callbackFn);
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(`${path}/${name}`, JSON.stringify(manifest));
    return this;
  }

  /**
   * Manipulating SVG elements whit SVG.JS library
   *
   * @param callback It gives you a SVG.JS Container and you can manipulate svg whit it
   * @returns `CryptoIcons`
   */
  public modifySVG(
    callback: (svgElement: Container, coin: Coin) => void
  ): CryptoIcons {
    this.forEach<Container>(
      (coin) => createSvg(coin.svg),
      callback,
      (svgElement, coin) => (coin.svg = svgElement.svg())
    );
    return this;
  }

  /**
   * Process SVG image whit `sharp`
   *
   * @param callback It gives you a Sharp instance and you can process svg whit it
   * @returns `CryptoIcons`
   */
  public sharp(
    callback: (sharpInstance: Sharp, coin: Coin) => void
  ): CryptoIcons {
    this.forEach<Sharp>((coin) => sharp(coin.svg), callback);
    return this;
  }

  /**
   * Filter the coins that meet the condition specified in a callback function.
   *
   * @param callback Function is a predicate, to test each Coin. Return a value that coerces to true to keep the element, or to false otherwise.
   * @returns `CryptoIcons`
   */
  public filter(callback: (coin: Coin) => boolean): CryptoIcons {
    this.coins = this.coins.filter(callback);
    return this;
  }

  /**
   * Write the svg of each coin in its own file
   *
   * @param path A string specifying where you want to save the files to.
   * @param name The name of the file to save the svg of the Coin (default is `coin.id`.svg)
   * @returns `CryptoIcons`
   */
  public saveSVG(path: string, name?: (Coin: Coin) => string): CryptoIcons {
    fs.mkdirSync(path, { recursive: true });
    this.forEach<string>(name || ((coin) => `${coin.id}.svg`), (name, coin) =>
      fs.writeFileSync(`${path}/${name}`, coin.svg)
    );
    return this;
  }

  /**
   * Reload all coins
   *
   * @returns `CryptoIcons`
   */
  public reload(): CryptoIcons {
    this.coins = this.load();
    return this;
  }

  /**
   * add operations to objects
   *
   * @returns `CryptoIcons`
   */
  public operation(operation: Operation): CryptoIcons {
    operation.visit(this);
    return this;
  }
}
