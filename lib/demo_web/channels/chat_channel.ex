defmodule DemoWeb.ChatChannel do
  use DemoWeb, :channel # チャネル関連の機能を使うための宣言

  # chat:lobbyというトピック名のチャネルに接続した時
  def join("chat:lobby", payload, socket) do
    Process.flag(:trap_exit, true) # 異常時にプロセスがクラッシュしない様に設定
    {:ok, socket}
  end

  # クライアントからpingという種類のメッセージがpushされた時
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # クライアントからnew_msgという種類のメッセージがpushされた時
  def handle_in("new_msg", payload, socket) do
    # トピックに接続しているクライアントに対して
    # new_msgという種類で内容がpayloadのメッセージをブロードキャストする
    broadcast! socket, "new_msg", payload
    {:reply, {:ok, payload}, socket}
  end
end
