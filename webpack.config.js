module.exports = {
    entry: "./src/index.ts",
    output: {
        path: require("path").resolve(__dirname, "out"),
        library: "lw",
        libraryTarget: "umd",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
