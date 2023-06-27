/* eslint-disable no-undef */
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/js/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist"),
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname),
    }
};