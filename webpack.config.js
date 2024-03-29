const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('postcss-hexrgba'), require('postcss-color-function'), require('autoprefixer')]

class RundAfterCompile {
	apply(compliler) {
		compliler.hooks.done.tap('Copy Images', function () {
			fse.copySync('./app/assets/images', './dist/assets/images')
		})
	}
}

// htmls
let pages = fse
	.readdirSync('./app')
	.filter(function (file) {
		return file.endsWith('.html')
	})
	.map(function (page) {
		return new HtmlWebpackPlugin({
			filename: page,
			template: `./app/${page}`,
		})
	})

// CSS
let cssConfig = {
	test: /\.css$/i,
	use: ['css-loader?url=false', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }],
}

// Common rules
let config = {
	entry: './app/assets/scripts/App.js',
	plugins: pages,
	module: {
		rules: [
			cssConfig,
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
					},
				},
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true,
					},
				},
			},
		],
	},
}

// Developement stage
if (currentTask == 'dev') {
	cssConfig.use.unshift('style-loader')
	config.output = {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app'),
	}
	config.devServer = {
		before: function (app, server) {
			server._watch('./app/**/*.html')
		},
		contentBase: path.resolve(__dirname, 'app'),
		hot: true,
		port: 3000,
		host: '0.0.0.0',
	}
	config.mode = 'development'
}

// Final stage
if (currentTask == 'build') {
	cssConfig.use.unshift(MiniCssExtractPlugin.loader)
	postCSSPlugins.push(require('cssnano'))
	config.output = {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
	}
	config.mode = 'production'
	config.optimization = {
		splitChunks: { chunks: 'all' },
	}
	config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }), new RundAfterCompile())
}

module.exports = config
