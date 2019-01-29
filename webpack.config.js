const path = require('path');

module.exports = {
  entry: './src/devtools.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'webpack-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react', '@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.$css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    port: 3000,
    open: true,
  },
};
