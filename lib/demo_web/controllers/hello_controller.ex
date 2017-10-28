defmodule DemoWeb.HelloController do
  use DemoWeb, :controller # コントローラー関連の機能を使うための宣言

  # conn : コネクションを表現する構造体、render関数はconnを受け取ってVIEWを描画する
  # params : URLパラメータなどの情報を持つマップ
  def hello(conn, params) do
    name = params["name"] # nameというキーをparamsマップから取り出す
    render(conn, "hello.html", %{who: name}) # hello.htmlというテンプレートを、whoというキーに名前を入れて描画する
  end
end
