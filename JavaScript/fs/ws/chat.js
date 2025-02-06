let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// 폼에 있는 메시지를 전송합니다.
document.forms.publish.onsubmit = function () {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// 메시지를 수신하고, 수신한 메시지를 div#messages에 보여줍니다.
socket.onmessage = function (event) {
  let message = event.data;

  let messageElem = document.createElement("div");
  messageElem.textContent = message;
  document.getElementById("messages").prepend(messageElem);
};
