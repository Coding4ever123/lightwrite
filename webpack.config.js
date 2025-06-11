module.exports = {
    entry: "./src/index.js",
    output: {
        path: require("path").resolve(__dirname, "dist"),
        library: "qh",
        libraryTarget: "umd",
    },
    mode: "production",
};
