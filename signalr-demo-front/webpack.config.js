const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        "./src/index.ts",
        "./src/chat.ts",
        "./src/movies.ts",
        "./src/rugby.ts"
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        publicPath: "/",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    infrastructureLogging: {
        level: 'error',
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};