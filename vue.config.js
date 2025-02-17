const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Project Manager'
    }
  },
  devServer: {
    proxy: {
      "^/api*": {
        ws: true,
        changeOrigin: true,
        target: "http://localhost:3000",
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  }
});
