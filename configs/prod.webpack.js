const merge = require('webpack-merge');
const common = require('./common.webpack');
const DefinePlugin = require('webpack').DefinePlugin;
const VERSION = process.env.npm_package_version;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new Analyzer({
			analyzerMode: 'static',
			openAnalyzer: false,
			logLevel: 'info'
		}),
		new DefinePlugin({
			PRODUCTION: JSON.stringify( true ),
			VERSION: JSON.stringify(VERSION)
		}),
		new FaviconsWebpackPlugin({
			logo: path.resolve(__dirname, "../src/assets/logo.png"),
			lang: "de-DE",
			appName: 'frogbudget',
			appShortName: 'f-budget',
			theme_color: "#fff",
			display: 'standalone',
			prefix: 'icons-[hash]/',
			start_url: '/',
			icons: {
				android: true,
				favicons: true,
				appleIcon: true,
				appleStartup: true
			}
		}),
	],

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
	},

	mode: "production"
});