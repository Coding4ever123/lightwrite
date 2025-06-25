# lightwrite

A lightweight HTML element builder

## Example

```javascript
import * as lw from "lightwrite";

// or as String:

lw.as.string(
    lw("div").class("greeting")(lw("p").class("greeting-text")("hello!"))
);

//"<div class="greeting"><p class="greeting-text">hello!</p></div>"

// or as Element:

lw.as.element(
    lw("div").class("greeting")(lw("p").class("greeting-text")("hello!"))
);

//<div class="greeting"><p class="greeting-text">hello!</p></div>
```

# Api

## lw

### lw(elementTagName: string): LWElement

This will initialize a new LWElement

### lw.text(text: string): TextType

This can write the pure text instead of the html

### lw.html(text: string): HTMLType

This can write the html instead of the text (default, when passing in strings)

### lw.as(element: LWElement, type: "string" | "element"): string | HTMLElement

This will convert the LWElement to a string or a HTMLElement

### lw.as.string(element: LWElement): string

This will convert the LWElement to a string

### lw.as.element(element: LWElement): HTMLElement

This will convert the LWElement to a HTMLElement

### lw.default: LightWrite

## LWElement

### [key: string]: (value?: string): this

This will set the attribute [ key ] to value
If no parameter is passed it will remove that attribute

### [key: string]: (strings: string[], ...rest: any[]): this

This will set the attribute [ key ] to value
If no parameter is passed it will remove that attribute

**This is only supposed to be used with [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)**

### LWElement(content: LWValue[]): this

This will add multiple elements as a child.

### LWElement(...content: LWValue[]): this

This will add multiple elements as a child.

### LWElement(strings: string[], ...rest: any[]): this

This will add one Element as a child

**This is only supposed to be used with [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)**

## LWValue = TextType | HTMLType | string | HTMLElement | LWElement;
