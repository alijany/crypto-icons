// Operations

import { Container } from "@svgdotjs/svg.js";
import Color from "color";
import { CryptoIcons, Operation } from "./Contracts";

function gray(svg: Container, size: number) {
  const fill = Color("white").lightness(60);
  svg.width(size);
  svg.height(size);
  svg.last().fill(fill.hex());
  svg
    .path(
      "M 0, 100 C 0, 35 35, 0 100, 0 S 200, 35 200, 100 165, 200 100, 200 0, 165 0, 100"
    )
    .attr("transform", `scale(${svg.viewbox().w / 200})`)
    .back()
    .fill(Color("white").hex());
}

function dark(svg: Container, size: number) {
  let fill = Color(svg.first().attr("fill"));
  if (fill.lightness() > 50) fill = fill.lightness(50);
  svg.width(size);
  svg.height(size);
  svg.last().fill("white");
  svg
    .path(
      "M 0, 100 C 0, 35 35, 0 100, 0 S 200, 35 200, 100 165, 200 100, 200 0, 165 0, 100"
    )
    .attr("transform", `scale(${svg.viewbox().w / 200})`)
    .back()
    .fill(fill.hex());
}

function light(svg: Container, size: number) {
  let fill = Color(svg.first().attr("fill"));
  if (fill.lightness() > 50) fill = fill.lightness(50);
  svg.width(size);
  svg.height(size);
  svg.last().fill(fill.hex());
  svg
    .path(
      "M 0, 100 C 0, 35 35, 0 100, 0 S 200, 35 200, 100 165, 200 100, 200 0, 165 0, 100"
    )
    .attr("transform", `scale(0.16)`)
    .back()
    .fill(fill.rgb().alpha(0.2).string());
}

export class LightTheme implements Operation {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  visit(instance: CryptoIcons): void {
    instance.modifySVG((coin) => light(coin, this.size));
  }
}

export class DarkTheme implements Operation {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  visit(instance: CryptoIcons): void {
    instance.modifySVG((coin) => dark(coin, this.size));
  }
}

export class GrayTheme implements Operation {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  visit(instance: CryptoIcons): void {
    instance.modifySVG((coin) => gray(coin, this.size));
  }
}
