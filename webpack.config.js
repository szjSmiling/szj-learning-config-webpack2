// config webpack
const glob = require('glob')
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const source = getSource();
const plugins = getPlugins();

	function getPlugins() {
		var arr = [];
    source.htmlFiles.forEach(function(htmlFile) {
			arr.push(
				new HtmlWebpackPlugin({
						template: htmlFile.pageSource,
						filename: htmlFile.filename,
						inject: 'body',
						hash: true,
						cache: true,
						showErrors: true,
						chunks: [htmlFile.jsChunkName]
				})
			)
    })
		arr.push(
			new ExtractTextPlugin({
				filename:'[name]/[name].css',
				allChunks:true
			})
		)
		arr.push(
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({// 引入jquery
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
			})
		)
    return arr;
	};

module.exports = {
	entry:source.entry,
	output: {
		filename: "[name]/[name].js", //这样就可以生成js文件
		path: __dirname + "/build",
		publicPath:'/',//添加静态资源, 否则会出现css,和img路径错误,
	},
	resolve:{
		extensions: ['.js', '.css', '.json','.less'],
		alias: {
			'src': path.resolve(__dirname, './src'),
			'Simg': path.resolve(__dirname, './src/img'),
		 }
	},
	devServer: {
		host: 'localhost',
		port: 8181,
		hot: true,
		inline: true,
		contentBase: './build'
	},
	module: {
		rules:[
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
			// { test: /\.css$/, loader: "style-loader!css-loader" },
			{test: /.css$/,use: ExtractTextPlugin.extract({  
				fallback: 'style-loader',  
				use: ['css-loader']
			})}, /*解析css, 并把css变成文件通过link标签引入*/
			{test: /.(jpg|png|gif|svg)$/,/*解析图片*/
				loader:"url-loader",
				options:{
					limit:8192,
					name:'[name][hash:8].[ext]',
					outputPath:'images/'
				}
			} ,
		// {test: /.less$/,use: ["style-loader", "css-loader", "less-loader"]} /*解析less, 把less解析成浏览器可以识别的css语言*/
		]
	},
	plugins: plugins
};

function getSource() {
	var source = {
			htmlFiles: [],
			entry: {}
	};

	var pageSource = glob.sync('./src/**/**/*.html');
	var jsSource = glob.sync('./src/**/**/*.js');
	var entry = {}; // 存储 all

	jsSource.forEach(function(item) {
		entry[path.basename(item, '.js')] = item;
	});

	pageSource.forEach(function(page) {
			var jsChunkName = path.basename(page, '.html');
			// a-- 获取参数一（path）的最后一个/后面的名字，参数二：过滤的字段，去掉.html
			source.htmlFiles.push({
					filename: jsChunkName + '/' + path.basename(page),// a/a.html
					pageSource: page,//   ./src/a/a.html
					jsChunkName: jsChunkName
			});
			source.entry[jsChunkName] = entry[jsChunkName];
	});

	source.entry['common'] = ['./src/public-resource/color.js'];
	return source;
}
