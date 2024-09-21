// webpack.config.js
module.exports = {
    // ...
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: -10,
            reuseExistingChunk: true
          }
        }
      }
    }
  };