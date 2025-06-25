export const ELEMENT_SYMBOL: unique symbol = Symbol.for("LW_Output_Element");
export const TYPE_SYMBOL: unique symbol = Symbol.for("Type");

export class TextType {
    /**
     * The Value that was input using lw.text()
     * @since v1.0.0
     */
    value: string;
    [TYPE_SYMBOL] = "TEXT";

    constructor(value: string) {
        this.value = value;
    }
}

export class HTMLType {
    /**
     * The Value that was input using lw.html()
     * @since v1.0.0
     */
    value: string;
    [TYPE_SYMBOL] = "HTML";

    constructor(value: string) {
        this.value = value;
    }
}

export type LWValue = TextType | HTMLType | string | HTMLElement | LWElement;

export interface LWElement {
    /**
     * This is used for setting an attribute of that element.
     * If value is undefined it will remove the attribute.
     *
     * Returns this to allow for function chaining.
     *
     * Supports both Tagged templates and direct value usage.
     *
     * @example
     * lw.elements.div.class`example`()
     * lw.elements.div.class("example")
     * @since v1.1.0
     */
    [key: string]: {
        (strings: string[], ...rest: any[]): LWElement;
        (value: string): LWElement;
    };
    [ELEMENT_SYMBOL]: HTMLElement;
    /**
     * This will add the value as a child.
     * @since v1.0.0
     */
    (content: LWValue[]): LWElement;

    /**
     * This will add multiple elements as a child.
     * @since v1.0.9
     */
    (...content: LWValue[]): LWElement;
    /**
     * This will add the value as a child.
     *
     * **This is only supposed to be used with Tagged templates**
     * @since v1.1.0
     */
    (strings: string[], ...rest: any[]): this;
}

export interface Elements {
    [key: string]: LWElement;
}

interface LWExports {
    /**
     * This will initialize a new LWElement
     * @since v1.0.0
     */
    (elementTagName: string): LWElement;
    /**
     * This can write the pure text instead of the html
     * @since v1.0.0
     */
    text(value: string): TextType;
    /**
     * This can write the html instead of the text (default, when passing in strings)
     * @since v1.0.0
     */
    html(value: string): HTMLType;
    /**
     * Convert any LWElement to a HTMLElement or a string
     * @since v1.0.0
     */
    as: as;
    /**
     * An Elements Registry
     * @since 1.0.10
     */
    elements: Elements;
}
export type LightWrite = LWExports;
declare global {
    const lw: LWExports;
}

interface as {
    /**
     * This will convert the LWElement to a string
     * @since v1.0.0
     */
    (element: LWElement, type: "string"): string;
    /**
     * This will convert the LWElement to a HTMLElement
     * @since v1.0.0
     */
    (element: LWElement, type: "element"): HTMLElement;
    /**
     * This will convert the LWElement to a string
     * @since v1.0.0
     */
    string(element: LWElement): string;
    /**
     * This will convert the LWElement to a HTMLElement
     * @since v1.0.0
     */
    element(element: LWElement): HTMLElement;
}
