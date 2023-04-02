class WebSocketClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.listeners = {};
  }

  addEventListener(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
    this.socket.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter((l) => l !== listener);
      this.socket.removeEventListener(type, listener);
    }
  }

  send(data) {
    this.socket.send(data);
  }

  close() {
    this.socket.close();
  }
}

export default WebSocketClient;
