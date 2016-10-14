# NodeRocket
    这是一个基于express实现的二次封装框架，目的在于帮助开发人员快速搭建可使用的web应用
## 操作说明
### 准备操作
1. 将项目克隆到本地环境（由于改项目还未封装完善，所以暂时没有放到npm仓库中）
2. 安装babel编译器，可输入如下指令进行安装（默认系统已经配置好node环境）
    1. npm install －g babel-cli （－g 代表全局安装，由于项目使用到es6语法糖，所以需要通过babel将es6d的代码） 
    2. 设置webstorm的fileWatcher，使其可以利用刚才安装的babel自动为我们编译es6语法代码。（通过babel编译后会多出两个文件，分别是＊-compiled.js、＊-compiled.js.map）
    ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/babel_record.gif?raw=true)￼
3. 将克隆下来的项目安装依赖文件
    1. 到当前项目执行npm install指令，系统自动将项目需要依赖的文件下载到node_modules文件夹中，依赖的文件（js）在package.json中有列明 
4. 安装mongodb（本项目暂时使用的是mongodb，后期会适应更多的数据库）
    1. mongodb的安装请查看[官网](https://www.mongodb.com/download-center#community)
    2. mongodb创建用户名和密码可以查看[我的博客](http://www.jianshu.com/p/56675b38660e)
    
### 代码配置
    打开项目根目录的sys->appConfig.json文件，配置数据库信息和appInfo信息
    （appInfo信息暂时只有scanPackages，这个属性是指系统中要扫描作为主要业务提供的包）
￼       ![](https://github.com/dapaer/dapaer-s-pic-resource/blob/gh-pages/img/appConfig_record.gif?raw=true)
### 运行代码
