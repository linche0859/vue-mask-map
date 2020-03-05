const NODE_ENV = process.env.NODE_ENV;
module.exports = {
  assetsDir: 'assets',
  publicPath: NODE_ENV === 'production' || NODE_ENV === 'gh-pages'
    ? '/vue-mask-map/'
    : '/'
};
