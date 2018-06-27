const path = require('path');
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	entry: {
		vendor: [
			'axios',
			'capitalize',
			'classnames',
			'country-list',
			'formik',
			'lodash',
			'react',
			'react-dom',
			'react-redux',
			'react-router-dom',
			'redux',
			'redux-form',
			'redux-thunk',
			'validator',
			'yup'
		],

	},

	output:{
		path: path.join(__dirname, 'build'),
		filename: 'js/[name].[hash].js',
		library: '[name]' //Variable Global en el Navegador.
	},

	plugins:[
		new webpack.DllPlugin({
			path: path.join(__dirname, '[name]-dll-manifest.json'),
			name: '[name]'
		}),

		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css|ttf|svg|eot)$/,
			threshold: 0, //Tamaño minimo en bytes para que un archivo se comprima
			minRatio: 0.8, //Ratio de compresion
		})

	]
}