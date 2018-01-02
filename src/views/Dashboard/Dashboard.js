import React, { Component } from "react";
import PropTypes from "prop-types";
import LogList from "./LogList";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chunks: [],
      error: null
    };
  }

  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.ws.onmessage = e => {
      this.setState({ chunks: this.state.chunks.concat(JSON.parse(e.data)) });
    };
    this.ws.onerror = e => this.setState({ error: "WebSocket error" });
    this.ws.onclose = e =>
      !e.wasClean &&
      this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` });
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    return (
      <div className="messages">
        <StayScrolled provideControllers={this.storeScrolledControllers}>
          <LogList />
        </StayScrolled>
      </div>
    );
  }
}

Dashboard.propTypes = {
  stayScrolled: PropTypes.func,
  scrollBottom: PropTypes.func
};

export default Dashboard;
