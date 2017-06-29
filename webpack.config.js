var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "build");
var SRC_DIR = path.resolve(__dirname, "src");


module.exports = {
    entry: [
        SRC_DIR + "/app/App.js"
    ],
    output: {
        path: BUILD_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                include: SRC_DIR,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','es2015', 'stage-2']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // {output}/file.txt
            { from: SRC_DIR, to: BUILD_DIR }],
            {ignore: []})
    ]
};