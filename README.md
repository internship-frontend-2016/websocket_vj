# websocketでチャットを作成

##忘れないこと
*node_modulesファイルはありません。
*packageの確認お願いします。
*express入れてください（dependenciesに書き込むの忘れました。）

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
###buildファイルをサーバーに
```
>node index.js
```
