const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSS = require('mini-css-extract-plugin');
const VERSION = process.env.npm_package_version;

module.exports = {
	entry: {
		pwa: path.resolve(__dirname, '../src/pwa/main.tsx'),
		sw: path.resolve(__dirname, '../src/pwa/sw.ts')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: "[name]." + VERSION + ".js",
		chunkFilename: "[name].chunk." + VERSION + ".js"
	},

	resolve: {
		extensions: [".ts", ".tsx", ".scss", ".js"],
		alias: {
			logupts: "logupts/dist/es2015/logupts"
		}
	},

	plugins: [
		new HTMLPlugin({
			template: path.resolve(__dirname, '../src/pwa/index.html'),
		}),
		new MiniCSS( {
			filename: "[name]." + VERSION + ".css",
			chunk: "[name].chunk." + VERSION + ".css"
		} ),
	],

	module: {
		rules: [
			// typescript loader
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},

			{
				test: /\.s(c?)ss$/,
				use: [
					// extract css
					{
						loader: MiniCSS.loader,
					},
					"css-loader",
					"sass-loader",
				]
			},

			// css
			{
				test: /\.css$/,
				use: [
					// extract css
					{
						loader: MiniCSS.loader,
					},
					"css-loader",
				]
			},

			// load fonts
			{
				test: /\.(ttf|svg|eot|woff(2?))$/,
				use: [
					{
						loader: 'file-loader',
						options: '[path][name].[ext]'
					}
				]
			}
		]
	}
}