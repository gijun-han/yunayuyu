#目標
* Mobile3G基準（750Kb）、ファーストビューを0.5秒以内に表示する方法を考える
  1. ファーストレスポンスに含まれる内容でファーストビューが動作するようにする
  2. タスク
        * 動的なレスポンスを返すため、phpで軽量フレームワークを開発
        * ファーストレスポンスを構成するhtml/js/cssの可読性を高める仕組みを考える（メンテナンスのため）

* 直帰率を下げる方法を考える
  1. ファーストビューにユーザが欲しいキーワードを含む楽しい見せ方を研究する

* 外部MVVMフレームワークを導入し開発効率を上げる。
  1. AngularJS 、 KnockoutJS 、 Ractive.js、VueJsを検討する。
  2. 現実的に100%SPAを作ることはないと思うので、既存webサイトを一部SPAぽく見せる方法を考える。


# 検証用モック

> 検証用のモックアプリを開発しながらいろいろ研究していく。

##開発環境構成

### grunt / gulp
> build担当
> 
> gulpのほうは可読性が悪いのでgruntでいく。buildスピードは対して変わらないことが判明。

### webpack
> js/html/cssのモジュール化

### vuejs
> MVVM Javascript Framework
> 
> 一番軽量だったのでこちらを選択。機能・パファマンスは他のフレームワークと変わりがない。

### sass
> css作成

### html
> template作成

### php
> first-viewの動的なところ

 
    

## 設定
css編集のために事前に[Ruby](http://www.ruby-lang.org/en/downloads/)と[Sass](http://sass-lang.com/download.html)をインストールする必要がある。
```bash
    > ruby -v
    > sass -v
```

rubyとsassがインストールされてあることを確認した後、node_moduleをインストール
```bash
    > npm install
```

Note:`gem install sass`してもsassのインストールができない場合は、`gem sources i`して現在の環境が"<http://rubygems.org/>"であることを確認し、もし異なる場合は`gem sources a`で追加する。追加後は`gem sources r`で既存sourceを削除する
```bash
    > gem source i
    *** CURRENT SOURCES ***
    https://rubygems.org/
    
    > gem sources a http://rubygems.org
    
    > gem source i
    *** CURRENT SOURCES ***
    https://rubygems.org/
    http://rubygems.org/
    
    > gem source r https://rubygems.org/
    
    > gem source i
    *** CURRENT SOURCES ***
    http://rubygems.org/


## 実行

```bash
    > npm run init
    > npm run dev
```

#### grunt
```bash
    > grunt
    > grunt dev
    
    //production
    > grunt build
```

## DEMO

http://demo.yunayuyu.com/?page=top

* 最初0.5秒内にファーストビューを表示
  + 映画のサムネイルが自動でゆっくりスライドされる
       * jsが読み込まれる時間を稼ぐ。
* 4秒以内に関連js読み込み完了
  + STOPボタン押すと、touchスクロールが有効になり、自由にスクロールができる。
