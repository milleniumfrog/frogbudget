const merge = require('webpack-merge');
const common = require('./common.webpack');
const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const VERSION = process.env.npm_package_version;

module.exports = merge(common, {
	devtool: 'inline-source-map',
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify( false ),
			VERSION: JSON.stringify(VERSION),
		}),
	],

	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, '../../dist'),
		port: 8080,
		host: '0.0.0.0',
	},

	
});