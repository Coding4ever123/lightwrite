# quickhtml

A lightweight HTML element builder

## Example

```javascript
import * as qh from "quickhtml";

// or as String:

qh.as.string(qh("div").class("loader spinner"));

// or as Element:

qh.as.element(qh("div").class("loader spinner"));
```

# Api

## qh

### qh.text(text: string): TextType

This can write the pure text instead of the html

### qh.html(text: string): HTMLType

This can write the html instead of the text (default, when passing in strings)

### qh.as(element: QHElement, type: "string" | "element"): string | HTMLElement

This will convert the QHElement to a string or a HTMLElement

### qh.as.string(element: QHElement): string

This will convert the QHElement to a string

### qh.as.element(element: QHElement): HTMLElement

This will convert the QHElement to a HTMLElement

## QHElement

### [key: string]: (value?: string): this

This will set the attribute [ key ] to value
