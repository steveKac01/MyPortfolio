const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 //publicPath:"/MyPortfolio/"

 publicPath: process.env.NODE_ENV === 'production'
 ? '/MyPortfolio/'
 : '/'
})
