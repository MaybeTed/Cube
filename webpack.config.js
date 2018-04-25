const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.join(__dirname, './dist');
const APP_DIR = path.join(__dirname, './src');

const config = {
	entry: `${APP_DIR}/index.js`,
	output: {
		filename: 'bundle.js',
		path: DIST_DIR,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				include: APP_DIR,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-2']
					}
				}
			}
		],
	}
}

module.exports = config;
