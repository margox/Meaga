# Meaga

> 一个由Electron和Vue联合打造的本地音乐播放器

## 应用截图
![](http://ww2.sinaimg.cn/large/006tNc79gy1feuk16ug09j31kw0zk7wk.jpg)

## 下载Mac平台安装文件(V1.0.2)
http://cdn.margox.cn/Meaga-1.0.2.dmg

## 开发和打包说明

``` bash
# 安装依赖
npm install

# 进入electron目录安装electron端依赖
cd electron && npm install

# 回退一层
cd ../

# 启动webpack dev server，并以开发模式启动应用
npm start

# 直接以开发模式启动应用（npm start是前提条件）
npm run dev

# 使用webpack打包view端项目
npm run build

# 使用electron-packager将项目打包成可执行文件，打包后的文件在packaged目录下
npm run package

# 使用electron-builder将项目打包成安装文件，打包后的文件在packaged目录下
npm run dist
```

## 使用说明

应用打开之后，点击右上角的加号来添加本地的音乐文件，可以直接将音乐文件拖到应用窗口，暂时只支持mp3格式的音乐。

如果在Favorites列表添加文件，则添加的文件会自动被favorite。

另外建议添加通过网易云音乐或者QQ音乐下载的音乐文件，因为通常都包含了完整的id3标签(歌手、专辑和封面信息等)，对于id3标签不完整的音乐文件，本程序未做测试，可能会导致数据显示不全等情况。

## TODO
- 播放列表排序功能
- 播放列表多选操作功能
- 播放界面 + 歌词功能
- 从网络获取封面图片和歌手图片
- Dock图标右键功能
- 尝试支持热更新
- 尝试支持Windows平台