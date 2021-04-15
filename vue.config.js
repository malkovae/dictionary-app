module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/styles.scss";',
      },
    },
  },
};
