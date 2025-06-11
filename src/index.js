class TextType {
    constructor(value) {
        this.value = value;
        this[Symbol.for("Type")] = "TEXT";
    }
}

class HTMLType {
    constructor(value) {
        this.value = value;
        this[Symbol.for("Type")] = "HTML";
    }
}

/**
 *
 * @param {TextType | HTMLType} classParam
 */
function GetCorrectType(classParam) {
    if (classParam[Symbol.for("Type")] === "TEXT") return "text";
    if (classParam[Symbol.for("Type")] === "HTML") return "html";
    if (classParam instanceof HTMLElement) return "HTMLElement";
    if (typeof classParam.toElement === "function") return "LightWrite";
    return "string";
}

/**
 *
 * @param {string} elementTagName
 * @returns
 */
module.exports = (elementTagName) => {
    let element = document.createElement(elementTagName);
    let proxy = new Proxy(
        (content) => {
            switch (GetCorrectType(content)) {
                case "text":
                    element.insertAdjacentText("beforeend", content.value);
                    break;
                case "string":
                    element.insertAdjacentHTML("beforeend", content);
                    break;
                case "html":
                    element.insertAdjacentHTML("beforeend", content.value);
                    break;
                case "HTMLElement":
                    element.insertAdjacentElement("beforeend", content);
                case "LightWrite":
                    element.insertAdjacentElement(
                        "beforeend",
                        module.exports.as(content, "element")
                    );
            }

            return proxy;
        },
        {
            get: (_, symbol) => {
                if (symbol === Symbol.for("element")) return element;
                return (val) => {
                    if (val == undefined) element.removeAttribute(symbol);
                    else element.setAttribute(symbol, val);
                    return proxy;
                };
            },
        }
    );
    return proxy;
};
module.exports.text = (value) => {
    if (typeof value === "string") return new TextType(value);
    throw new TypeError("Invalid value: " + value);
};

module.exports.html = (value) => {
    if (typeof value === "string") return new HTMLType(value);
    throw new TypeError("Invalid value: " + value);
};
/**
 *
 * @param {any} element
 * @param {"element" | "string"} type
 */
module.exports.as = (element, type) => {
    if (type !== "element" && type !== "string")
        throw new TypeError("Invalid type: " + type);
    return module.exports.as[type](element);
};
module.exports.as.string = (element) => {
    return element[Symbol.for("element")].outerHTML;
};
module.exports.as.element = (element) => {
    return element[Symbol.for("element")];
};
