//export default

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
     * This is used for setting the an attribute of that element.
     * If value is undefined it will remove The attribute.
     *
     * Returns this to allow for function chaining
     *
     * @since v1.0.0
     */
    [key: string]: (value?: string) => this;
    [ELEMENT_SYMBOL]: HTMLElement;
    /**
     * This will add the value as a child.
     * @since v1.0.0
     */
    (content: LWValue): LWElement;
}

export default interface type {
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
