module.exports = {
    entry: "./src/index.js",
    output: {
        path: require("path").resolve(__dirname, "dist"),
        library: "lw",
        libraryTarget: "umd",
    },
    mode: "production",
};
