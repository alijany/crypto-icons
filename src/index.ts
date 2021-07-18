import { Operation } from "./Contracts";
import CryptoIcons from "./CryptoIcons";
import { DarkTheme, GrayTheme, LightTheme } from "./Oprations";

function cryptoIcons(): CryptoIcons {
  return new CryptoIcons();
}

function darkTheme(size: number): Operation {
  return new DarkTheme(size);
}

function lightTheme(size: number): Operation {
  return new LightTheme(size);
}

function grayTheme(size: number): Operation {
  return new GrayTheme(size);
}

export { cryptoIcons, darkTheme, grayTheme, lightTheme };

