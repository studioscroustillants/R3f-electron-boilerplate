const CopyWebpackPlugin = require('copy-webpack-plugin');
const {resolve} = require("path");
const assets = ['3d']

const copyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin({
    patterns: [{ from: resolve(__dirname, 'src/static', asset), to: asset }],
  });
});

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: './electron-main.js',
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules'),
	},
	plugins:copyPlugins,
	dependencies: ['better-sqlite3'],
	externals: {
		'better-sqlite3': true
	}
};
