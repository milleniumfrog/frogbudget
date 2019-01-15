const merge = require('webpack-merge');
const common = require('./common.webpack');
const DefinePlugin = require('webpack').DefinePlugin;


module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify( true ),
		}),
	],

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
	},

	mode: "production"
});