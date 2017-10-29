import {Socket} from "phoenix"

class Demo {
  static init(socket) {
    var $messages = $("#messages")
    var $input = $("#message-input")
    var $user = $("#user")

    var addMessage = (msg) => {
      $messages.append(this.messageTemplate(msg))
    };

    socket.onOpen( ev => console.log("OPEN", ev) )
    socket.onError( ev => console.log("ERROR", ev) )
    socket.onClose( ev => console.log("CLOSE", ev))

    // --- JOIN ---

    // chat:lobbyというトピックのチャネル
    var chan = socket.channel("chat:lobby", {})

    // チャネルに接続(join)
    chan.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", (messages) => {
        messages.forEach(addMessage)
        scrollTo(0, document.body.scrollHeight)
      })
      .receive("timeout", () => console.log("Connection interruption"))
    chan.onError(e => console.log("something went wrong", e))
    chan.onClose(e => console.log("channel closed", e))

    // --- INPUT ---

    $input.off("keypress").on("keypress", e => {
      if (e.keyCode == 13) {
        // new_msgという種類のメッセージ(userとbodyのJSON)をチャネルに送信
        chan.push("new_msg", {user: $user.val(), body: $input.val()})
        $input.val("")
      }
    })

    // --- REPLY ---

    // チャネルからnew_msgという種類のメッセージを受信した時の処理
    chan.on("new_msg", msg => {
      addMessage(msg);
      scrollTo(0, document.body.scrollHeight)
    })
  }

  // --- UTILS ---

  static sanitize(html){ return $("<div/>").text(html).html() }

  static messageTemplate(msg){
    let user = this.sanitize(msg.user || "anonymous")
    let body = this.sanitize(msg.body)
    return(`<p><a href='#'>[${user}]</a>&nbsp; ${body}</p>`)
  }
}

export default Demo
