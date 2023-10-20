const rules = require('./webpack.rules');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {resolve} = require("path");
//const assets = ['glb','gltf']
const assets = ['3d']

const copyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin({
    patterns: [{ from: resolve(__dirname, 'src/static', asset), to: asset }],
  });
});


rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' },  { loader: 'postcss-loader' }],
},
{
    test: /\.(gltf|glb)$/,
    use:[
		{
			loader: 'file-loader',
			options:
			{
				outputPath: 'assets/models/'
			}
		}
	]
  },);

rules.push({
  test: /\.(svg|png|jpg|gif|glb|gltf)$/,
  include: [
    resolve(__dirname, "./src/")
  ],
  type: "asset/inline",
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins:copyPlugins,
};
