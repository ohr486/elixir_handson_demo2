defmodule DemoWeb.ChatChannel do
  use DemoWeb, :channel

  def join("chat:lobby", payload, socket) do
    Process.flag(:trap_exit, true)
    {:ok, socket}
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("new_msg", payload, socket) do
    broadcast! socket, "new_msg", payload
    {:reply, {:ok, payload}, socket}
  end
end
