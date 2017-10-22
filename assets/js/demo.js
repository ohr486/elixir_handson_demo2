import {Socket} from "phoenix"

class Demo {
  static init(socket) {
    var $messages = $("#messages")
    var $input = $("#message-input")
    var $user = $("#user")

    socket.onOpen( ev => console.log("OPEN", ev) )
    socket.onError( ev => console.log("ERROR", ev) )
    socket.onClose( ev => console.log("CLOSE", ev))

    // --- JOIN ---

    var chan = socket.channel("chat:lobby", {})
    chan.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))
      .receive("timeout", () => console.log("Connection interruption"))
    chan.onError(e => console.log("something went wrong", e))
    chan.onClose(e => console.log("channel closed", e))

    // --- INPUT ---

    $input.off("keypress").on("keypress", e => {
      if (e.keyCode == 13) {
        chan.push("new_msg", {user: $user.val(), body: $input.val()})
        $input.val("")
      }
    })

    // --- REPLY ---

    chan.on("new_msg", msg => {
      $messages.append(this.messageTemplate(msg))
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
