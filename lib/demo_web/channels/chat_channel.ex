defmodule DemoWeb.ChatChannel do
  use DemoWeb, :channel # チャネル関連の機能を使うための宣言

  # chat:lobbyというトピック名のチャネルに接続した時
  def join("chat:lobby", payload, socket) do
    Process.flag(:trap_exit, true) # 異常時にプロセスがクラッシュしない様に設定
    {:ok, load_messages(), socket}
  end

  # クライアントからpingという種類のメッセージがpushされた時
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # クライアントからnew_msgという種類のメッセージがpushされた時
  def handle_in("new_msg", payload, socket) do
    # トピックに接続しているクライアントに対して
    # new_msgという種類で内容がpayloadのメッセージをブロードキャストする
    save_message(payload)
    broadcast! socket, "new_msg", payload
    {:reply, {:ok, payload}, socket}
  end

  defp load_messages() do
    Agent.get(Demo.History, fn messages -> Enum.reverse(messages) end)
  end

  defp save_message(message) do
    Agent.update(Demo.History, fn messages -> [message | messages] end)
  end
end
