'use strict';

var webpack = require('webpack');
var path = require('path');

var outputPath = path.join(__dirname, 'dist');

var config = {
	entry: "./src/App.js",

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["transform-object-rest-spread"],
				},
			},
			// {
			//     test: /\.jsx?/,
			//     exclude: /node_modules/,
			//     loader: 'eslint-loader',
			// },
		],
	},

	externals: [
		"prop-types",
		"react",
		"@fortawesome/fontawesome-svg-core",
		"@fortawesome/free-solid-svg-icons",
		"@fortawesome/react-fontawesome",
	],
};

module.exports = [
    Object.assign({}, config, {
        output: {
            path: outputPath,
            filename: 'react-lines.js',
            library: 'react-lines',
            libraryTarget: 'umd',
            umdNamedDefine: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    }),
    Object.assign({}, config, {
        output: {
            path: outputPath,
            filename: 'react-lines.min.js',
            library: 'react-lines',
            libraryTarget: 'umd',
            umdNamedDefine: true,
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    })
];
