import * as t from "./type";
/**@internal */
function BuildStringFromTemplateArgs(strings: string[], ...rest: any[]) {
    const result = [];
    const length = Math.max(strings.length, rest.length);

    for (let i = 0; i < length; i++) {
        result.push(strings[i] ?? "", rest[i] ?? "");
    }

    return result.join("");
}
/**@internal */
function AreValidTemplateArguments(arr1: any, arr2: any) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    return arr1.length === arr2.length || arr1.length === arr2.length + 1;
}

let LightWrite = <t.LightWrite>Object.defineProperties(
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
                let [val, ...rest] = args;
                let content;
                if (AreValidTemplateArguments(val, rest)) {
                    if (!Array.isArray(val)) return;
                    content = [BuildStringFromTemplateArgs(val, rest)];
                } else {
                    content = Array.isArray(args[0]) ? args[0] : args;
                }
                content.forEach((x, i) => handleElement(x, i));
                return proxy;
            },
            {
                get: (_, symbol) => {
                    if (symbol === t.ELEMENT_SYMBOL) return element;
                    if (symbol === t.TYPE_SYMBOL) return;
                    if (typeof symbol === "symbol")
                        throw new TypeError(
                            "Symbols are not allowed " + symbol.toString()
                        );
                    return (val: string | string[], ...args: any[]) => {
                        if (AreValidTemplateArguments(val, args)) {
                            if (!Array.isArray(val)) return;
                            val = BuildStringFromTemplateArgs(val, args);
                        }
                        if (val == undefined)
                            element.removeAttribute(symbol as string);
                        else
                            element.setAttribute(
                                symbol as string,
                                val.toString()
                            );
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
        elements: {
            value: new Proxy(
                {},
                {
                    get(_, symbol) {
                        if (typeof symbol === "symbol") {
                            throw new TypeError("Invalid Argument at index: 0");
                            return;
                        }
                        return LightWrite(symbol);
                    },
                }
            ),
        },
    }
);
export = <t.LightWrite & { default: t.LightWrite }>Object.defineProperty(
    LightWrite,
    "default",
    {
        value: LightWrite,
    }
);
