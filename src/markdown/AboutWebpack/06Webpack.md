## **Webpack**

### 1，什么是webpack

​	现代的javascript应用的静态**模块打包**工具。

​	

### 2，webpack作用

识别某些写法，将其转化为浏览器能识别的写法。

会帮助我们处理模块之间的依赖关系。

将项目打包。



### 3，与gulp对比

gulp更强调的是**前端流程的自动化**，模块化不是核心。

webpack更强调**模块化开发**管理。文件压缩，预处理等功能，是他附带的功能。



### 4，webpack安装

本身依赖node.js环境。

webpack ./src/main.js -o ./src/bundle.js  --mode -development



### 5，webpack配置

开发时依赖

运行时依赖



### 6，loader

css文件处理。还需要style.loader。

less文件处理。还需要依赖less

图片处理。还需要fileloader

vueloader处理。

babelloader。js转es5处理。



### 7，plugins

1），添加版权声明的横幅plugin	new webpack.bannerplugin（'xxxxxxxx'）；

2），打包index.html的HtmlWebpackPlugin

3），压缩混淆代码插件uglifyjs.。

4），webpack-dev-server 当我们保存src文件夹里的代码时，会自动编译到内存中。

5），VueLoaderPlugin



### 8,搭建本地服务器

web-dev-server。



### 9,webpack配置文件的分离

1，依赖webpack-merge

2，需要为不同环境配置不同的配置文件base.config.js/dev.config.js/prod.config.js



### 10,webpack的目录结构

### entry：

webpack启动的入口

### output：

导出到哪个文件夹，并如何命名导出的文件

### loaders：

webpack默认只识别javascript和json，loaders允许webpack识别并转化这些类型的文件并且将他们转化为可识别的模块。将这些文件添加到依赖的graph中。

通过构建规则的方式，将某一种文件与相应的解析器绑定起来。

```javascript
modeule.exports={
	rules:[
		{test:/\.txt$/,use:'raw-loader'}
	]
}
```

### plugins：

为项目提供其他的辅助功能。

### mode:

可以将模式设置为development，production或者none。