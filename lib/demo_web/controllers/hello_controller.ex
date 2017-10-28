defmodule DemoWeb.HelloController do
  use DemoWeb, :controller

  def hello(conn, params) do
    name = params["name"]
    render(conn, "hello.html", %{name: name})
  end
end
