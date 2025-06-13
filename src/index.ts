import * as t from "./type";

export = <t.default>Object.defineProperties(
    (elementTagName: string) => {
        let element = document.createElement(elementTagName);
        let proxy = new Proxy(
            (...args) => {
                function GetCorrectType(classParam: t.LWValue) {
                    if (classParam[t.TYPE_SYMBOL] === "TEXT") return "text";
                    if (classParam[t.TYPE_SYMBOL] === "HTML") return "html";
                    if (classParam instanceof HTMLElement) return "HTMLElement";
                    if (classParam[t.ELEMENT_SYMBOL] instanceof HTMLElement)
                        return "LightWrite";
                    if (typeof classParam === "string") return "string";
                    return "unknown";
                }
                function handleElement(LWValue, index: number) {
                    switch (GetCorrectType(LWValue)) {
                        case "text":
                            element.insertAdjacentText(
                                "beforeend",
                                LWValue.value
                            );
                            break;
                        case "string":
                            element.insertAdjacentHTML("beforeend", LWValue);
                            break;
                        case "html":
                            element.insertAdjacentHTML(
                                "beforeend",
                                LWValue.value
                            );
                            break;
                        case "HTMLElement":
                            element.insertAdjacentElement("beforeend", LWValue);
                            break;
                        case "LightWrite":
                            element.insertAdjacentElement(
                                "beforeend",
                                LWValue[t.ELEMENT_SYMBOL]
                            );
                            break;
                        default:
                            throw new TypeError(
                                "Invalid Parameter at index: " + index
                            );
                    }
                }
                let content = Array.isArray(args[0]) ? args[0] : args;
                content.forEach((x, i) => handleElement(x, i));
                return proxy;
            },
            {
                get: (_, symbol) => {
                    if (symbol === t.ELEMENT_SYMBOL) return element;
                    return (val: string) => {
                        if (val == undefined)
                            element.removeAttribute(symbol as string);
                        else element.setAttribute(symbol as string, val);
                        return proxy;
                    };
                },
            }
        );
        return proxy;
    },
    {
        text: {
            value: (value: string) => {
                if (typeof value === "string") return new t.TextType(value);
                throw new TypeError("Invalid value: " + value);
            },
        },
        html: {
            value: (value: string) => {
                if (typeof value === "string") return new t.HTMLType(value);
                throw new TypeError("Invalid value: " + value);
            },
        },
        as: {
            value: Object.defineProperties(
                function (element: t.LWElement, type: "element" | "string") {
                    if (type !== "element" && type !== "string")
                        throw new TypeError("Invalid type: " + type);
                    let ele = element[t.ELEMENT_SYMBOL];
                    return type === "element" ? ele : ele.outerHTML;
                },
                {
                    string: {
                        value: (element: t.LWElement) => {
                            return element[t.ELEMENT_SYMBOL].outerHTML;
                        },
                    },
                    element: {
                        value: (element: t.LWElement) => {
                            return element[t.ELEMENT_SYMBOL];
                        },
                    },
                }
            ),
        },
    }
);
