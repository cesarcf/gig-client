const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')



module.exports = env => {
	const IS_DEVELOPMENT = (env === 'development') ? true : false
	const ifDev = (then) => (IS_DEVELOPMENT ? then : null)
	const ifProd = (then) => (!IS_DEVELOPMENT ? then : null)
	const falsy = (i) => i;//Para usar en [].filter(falsy)


	const clientConfig = {
		target: 'web',

		entry: [
			'babel-polyfill',
			ifDev('react-hot-loader/patch'),// activate (HMR) for React
			'./client.js'
		].filter(falsy),


		output: {
			filename: IS_DEVELOPMENT ? 'js/[name].js' : 'js/[name].[hash].js',
			path: path.resolve(__dirname, 'build'),
			publicPath: '/'
		},

		devServer: {
			contentBase: [path.resolve(__dirname, 'build')], //desde donde servimos los archivos.
			publicPath: '/', //It is recommended that devServer.publicPath is the same as output.publicPath
			host: 'localhost',
			port: 3000,
			hot: true,
			historyApiFallback: true, //for BrowserRouter: me habilita usar URL´s Limpias y poder recargarlas sin perder la ruta
			compress: true,
			headers: {},
			proxy:{
				"/auth/*": "http://localhost:5000",
				"/user/*": "http://localhost:5000"
			}
		},

		devtool: IS_DEVELOPMENT ? 'eval' : false,

		module: {
			rules:[
				/////////////////// JS|JSX|BABEL ///////////////////
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: [
							'react',
							['env',
								{
									modules: false,
									targets: { browsers: ['last 2 versions'] }
								}
							],
							'stage-0'
						],
						//Plugins va dentro de options
						plugins: [
							ifDev('react-hot-loader/babel')
						].filter(falsy)

					}
				},//fin JS|JSX|babel

				/////////////////// HTML FILES ///////////////////
				{
					test: /\.html$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'html-loader',
							options: {
								// minimize: true,
								// removeComments: false,
								// collapseWhitespace: false
							}
						}
					]
				},

				/////////////////// CSS - STYLUS ///////////////////
				{
					test: /\.styl$/,
					use: IS_DEVELOPMENT ? (
						/////development /////
						[
							{
								loader: 'style-loader'
							},
							{
								loader: 'css-loader',
								options:{
									importLoaders:1,
									/* Si queremos activar CSSModule */
									//modules: true,//Activamos CSSModule para cargar el CSS a traves de JS
									//localIdentName: '[name]--[local]--[hash:base64:5]' //class='componente--clase--2f554'
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									use: [
										require('nib')
									],
									import:[
										'~nib/lib/nib/index.styl'
									]
								}
							}
						]
					) : (
						/////Production /////
						ExtractTextPlugin.extract({
							//publicPath: '',//Override the publicPath setting for this loader
							fallback: { loader: 'style-loader' },
							use: [
								{
									loader: 'css-loader',
									options: {
										sourceMap: IS_DEVELOPMENT,
										importLoaders:1,
										//modules:true,//Activamos CSSModule para cargar el CSS a traves de JS
										//localIdentName: '[name]--[local]--[hash:base64:5]', //class='componente--clase--2f554'
										minimize: IS_DEVELOPMENT ? false : { discardComments: { removeAll: true } } // "cssnano" esta incluido en en 'css-loader'
									}
								},

								{
									loader: 'stylus-loader',
									options: {
										sourceMap: IS_DEVELOPMENT,
										use: [
											require('nib')
										],
										import:[
											'~nib/lib/nib/index.styl'
										]
									}
								}
							]
						})//fin ExtractTextPlugin

					)

				},//fin CSS - STYLUS


				/////////////////// IMAGENES ///////////////////
				{
					test: /\.(gif|png|jpe?g)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 10000,//10Kb - Si no se especifica su limite es ilimitado
							//Para todas las imagenes que pesen mas del 'limit'
							//me las pone con 'file-loader' aqui:
							fallback: 'file-loader',//file-loader outputs image files and returns paths to them instead of inlining
							name: 'images/[name].[hash].[ext]',//[name].[hash].[ext] = imagen.no23rjh2r5jh2jh2.jpg
						}
					}
				},

				/////////////////// FUENTES ///////////////////
				{
					test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 600000, //600kb para que se carguen por JS todas los icons
								//Para todas las imagenes que pesen mas del 'limit'
								//me las pone con 'file-loader' aqui:
								fallback: 'file-loader',//file-loader outputs image files and returns paths to them instead of inlining
								name: 'images/[name].[hash].[ext]',//[name].[hash].[ext] = imagen.no23rjh2r5jh2jh2.jpg
							}
						}
					]
				}

			]//fin de Rules
		},//fin del Module



		plugins:[
			new webpack.DllReferencePlugin({
				manifest: require('./vendor-dll-manifest.json')
			}),

			new webpack.DefinePlugin({
				//Allows you to create "GLOBAL CONST EN EL CLIENTE" which can be configured at compile time
				//Definimos la variable de entorno para produccion
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'HOST_PRODUCTION': JSON.stringify('https://hlfmember.com')
			}),

			//Nos genera el index.html con los bundles incluidos.
			new HtmlWebpackPlugin({
				template: './index.html',
				inject: true, //añade los scripts y links al final del body
				minify: {
					removeComments: IS_DEVELOPMENT ? false : true, //Elimina comentarios en el Html
					collapseWhitespace: IS_DEVELOPMENT ? false : true, //Elimina los espacios en blanco del html
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeStyleLinkTypeAttributes: true,
					// keepClosingSlash: true,
					// minifyJS: true,
					// minifyCSS: true,
					// minifyURLs: true,
				}
			}),

			ifDev(new FriendlyErrorsWebpackPlugin()),//Nos muestra los errores de Webpack mas amigables
			ifProd(new CleanWebpackPlugin(['build'], { root: __dirname })),
			//ifDev(new ExtractTextPlugin('css/[name].css')),//Nos crea un file por cada entry que tengamos
			ifProd(new ExtractTextPlugin('css/[name].[contenthash].css')),

			//Este plugin nos permite compresion GZIP de los assets. Usado en Nginx para servir los archivos
			//comprimidos directamente haciendo que el server no tenga que hacerlo.
			new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.(js|css|ttf|svg|eot)$/,
				threshold: 0, //Tamaño minimo en bytes para que un archivo se comprima
				minRatio: 0.8, //Ratio de compresion
			}),

			//////////////// Hot Module Replacement ///////////////////////
			ifDev(new webpack.NamedModulesPlugin()),//Prints more readable module names in the browser console on HMR updates
			ifDev(new webpack.HotModuleReplacementPlugin()),//Activa HMR
			ifDev(new webpack.NoEmitOnErrorsPlugin())//do not emit compiled assets that include errors
		].filter(falsy) //Me elimina los valores falsys

	}

	return merge(baseConfig, clientConfig)
};
