# Elixirハンズオン#2 サンプルコード

[![Join the chat at https://gitter.im/elixir_handson_demo2/Lobby](https://badges.gitter.im/elixir_handson_demo2/Lobby.svg)](https://gitter.im/elixir_handson_demo2/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## イベントページ

[Elixir初心者向けハンズオン vol2 ](https://beam-lang.connpass.com/event/60655/)

## イベント資料

[wiki](https://github.com/ohr486/elixir_handson_demo2/wiki)

## 事前準備

[こちら](https://github.com/ohr486/elixir_handson_demo2/wiki/%E4%BA%8B%E5%89%8D%E6%BA%96%E5%82%99)から必要な環境をインストールしてください。

## ハンズオンテキスト

[ハンズオンテキスト](https://github.com/ohr486/elixir_handson_demo2/wiki/%E3%83%8F%E3%83%B3%E3%82%BA%E3%82%AA%E3%83%B3%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88)

## 質問チャット

[Gitter](https://gitter.im/elixir_handson_demo2/Lobby)

## デモアプリの起動手順

```
$ mix deps.get
$ mix compile
$ cd assets
$ npm install
$ node node_modules/brunch/bin/brunch build
$ cd ..
$ iex -S mix phx.server
```

ブラウザで``http://localhost:4000``を開く

* チャット画面: http://localhost:4000
* 挨拶画面: http://localhost:4000/hello?name=名前
