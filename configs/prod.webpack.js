const merge = require('webpack-merge');
const common = require('./common.webpack');
const DefinePlugin = require('webpack').DefinePlugin;
const VERSION = process.env.npm_package_version;


module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify( true ),
			VERSION: JSON.stringify(VERSION)
		}),
	],

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
	},

	mode: "production"
});