declare module "@svgdotjs/svg.js" {
  const registerWindow: (Win: Window, doc: Document) => void;
}

import { Container, registerWindow, SVG } from "@svgdotjs/svg.js";
import { JSDOM } from "jsdom";

const { document: $document } = new JSDOM().window;

// register windows
registerWindow($document.defaultView as Window, $document);

/**
 * create a new SVG.JS document from svg string
 *
 * @param svg A `string` representing svg element
 * @returns `Container` (SVG.JS `Container` element)
 */
export default function (svg: string): Container {
  // create SVG element
  return SVG(svg) as Container;
}
