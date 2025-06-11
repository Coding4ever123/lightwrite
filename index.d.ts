declare class TextType {
    value: string;
    [Symbol.for("Type")]: "TEXT";
}
declare class HTMLType {
    value: string;
    [Symbol.for("Type")]: "HTML";
}

interface qh {
    /**
     *
     * @returns
     */
    (tagName: string): QHElement;

    text(value: string): TextType;
    html(value: string): HTMLType;
    as: {
        (element: QHElement, type: "string"): string;
        (element: QHElement, type: "element"): HTMLElement;
        string(element: QHElement): string;
        element(element: QHElement): HTMLElement;
    };
}

interface QHElement {
    /**
     * This is used for setting the an attribute of that element.
     * If value is undefined it will remove The attribute.
     *
     * Returns this to allow for function chaining
     */
    [key: string]: (value?: string) => this;
}
declare const qh: qh;

export = qh;
