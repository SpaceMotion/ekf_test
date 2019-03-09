const path = require('path');

module.exports = {
	mode: 'development',
	entry: './script/script.js',
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: 'vue-loader'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
};