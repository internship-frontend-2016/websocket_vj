# websocketでチャットを作成

##忘れないこと
* packageの確認お願いします。

## npmインストール

###expressをインストール
```
npm install express --save
```

###socket.ioをインストール
```
npm install socket.io --save
```


## 各バージョン

以下のバージョンで動作します

```
Node.js: v4.5.0
```


## 構造
```
├─ build	  // コンパイル先ディレクトリ
│
├─ gulp   // gulpファイル
│   ├── config.js  // パス等設定ファイル
│   ├── tasks      // 実行されるタスク
│   └── util
│
│
├── src    // 開発用ディレクトリ
│   ├── img    // そのままbuild/imgへコピーされる
│   ├── js     // main.jsをコンパイルしてbuildへ
│   ├── sass   // sassファイルをコンパイルしてbuildへ
│   └── index.ejs   // コンパイルしてbuildへ
└─index.js //websocket用サーバー
```

### ビルドツール

* Gulp              （ タスクランナー )
* gulp-ejs          （ ejs -> html コンパイル )
* gulp-ruby-sass    （ sass -> css コンパイル )
* browserify        （ jsファイルを統合 )
* js-hint           （ jsファイルのチェック )
* BrowserSync       （ ローカルサーバーを起動 )
* gulp.spritesmith  （ スプライト画像を作成 )



## 実行
###srcファイルをコンパイル
```
>gulp
```
###Node.jsでwebsocket用のサーバーを立てる
```
>node index.js
```
