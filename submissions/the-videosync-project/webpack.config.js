const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = [
	{
		name: 'server',
		target: 'node',
		externals: [webpackNodeExternals()],
		entry: './app/server/index.ts',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'build', 'server')
		},
		module: {
			rules: [{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			}]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		watch: true
	},
	{
		name: 'client',
		target: 'web',
		entry: './app/client/index.ts',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'build', 'client')
		},
		module: {
			rules: [{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			}]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: './app/client/index.html' }
			])	
		],
		watch: true
	},
];
