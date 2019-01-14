import React, { Component } from "react";
import Stomp from "stompjs";
import OnMap from "./OnMap";
import GeoLocator from "./GeoLocator";

const DEFAULT_WS_URL = "ws://localhost:3490";

class SocketLocalstorageConnector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websocket: null,
      connected: false,
      savedWs: localStorage.getItem("ws")
    };
    this.textInput = React.createRef();
  }

  onConnect = wsUrl => {
    this.ws = new WebSocket(wsUrl);
    this.socket = Stomp.over(this.ws);

    this.ws.addEventListener("close", this.reconnect);
    this.ws.addEventListener("error", this.reconnect);

    this.socket.connect(
      [],
      () => {
        this.setState(
          {
            websocket: this.socket,
            connected: true,
            savedWs: wsUrl,
            id: Math.random()
          },
          () => localStorage.setItem("ws", wsUrl)
        );
      }
    );
  };

  reconnect = () => {
    if (this.state.connected) {
      console.log("Connection should be up, reconnecting in 1 sec");
      setTimeout(() => this.onConnect(this.state.savedWs), 1000);
    }
  };

  onDisconnect = () => {
    this.socket.disconnect(() => {
      this.setState({ websocket: null, connected: false }, () => {
        this.ws.close();
        this.ws = this.socket;
      });
    });
  };

  renderWidgets = () => (
    <GeoLocator
      id={this.state.id}
      stomp={this.state.websocket}
      connected={this.state.connected}
    >
      <OnMap
        id={this.state.id}
        stomp={this.state.websocket}
        width={256}
        height={256}
        connected={this.state.connected}
      />
    </GeoLocator>
  );

  componentDidMount = () => {
    if (this.state.savedWs) {
      this.onConnect(this.state.savedWs);
    }
  };
  render = () => (
    <>
      {!this.state.savedWs ? (
        <header>
          <input
            ref={this.textInput}
            type="text"
            defaultValue={DEFAULT_WS_URL}
          />
          <button
            onClick={() => {
              this.onConnect(this.textInput.current.value);
            }}
            disabled={!!this.state.websocket}
          >
            Connect
          </button>
          <button onClick={this.onDisconnect} disabled={!this.state.websocket}>
            Disconnect
          </button>
        </header>
      ) : (
        <></>
      )}
      <main>{this.renderWidgets()}</main>
    </>
  );

  componentWillUnmount = () => {
    if (this.ws) {
      this.ws.close();
      this.ws = this.socket = null;
    }
  };
}

export default SocketLocalstorageConnector;
