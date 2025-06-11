declare class TextType {
    value: string;
    [Symbol.for("Type")]: "TEXT";
}
declare class HTMLType {
    value: string;
    [Symbol.for("Type")]: "HTML";
}

interface lw {
    (tagName: string): LWElement;
    text(value: string): TextType;
    html(value: string): HTMLType;
    as: {
        (element: LWElement, type: "string"): string;
        (element: LWElement, type: "element"): HTMLElement;
        string(element: LWElement): string;
        element(element: LWElement): HTMLElement;
    };
}

interface LWElement {
    /**
     * This is used for setting the an attribute of that element.
     * If value is undefined it will remove The attribute.
     *
     * Returns this to allow for function chaining
     */
    [key: string]: (value?: string) => this;
}
declare const lw: lw;

export = lw;
