import React, { Component } from "react";
import StayScrolled from "react-stay-scrolled";

const Log = ({ text, key }) => (
  <p key={key}>
    <span className="message">{text}</span>
  </p>
);

class LogList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.stayScrolled(); // Or: this.scrollBottom
  }

  // componentDidMount() {
  //   const { stayScrolled, scrollBottom } = this.props;

  //   // Make the parent StayScrolled component scroll down if it was already scrolled
  //   stayScrolled();

  //   // Make the parent StayScrolled component scroll down, even if not completely scrolled down
  //   // scrollBottom();
  // }

  storeScrolledControllers({ stayScrolled, scrollBottom }) {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }
  render() {
    return (
      <StayScrolled provideControllers={this.storeScrolledControllers}>
        {this.props.logs.map((c, i) => <Log key={c.id} text={c.data} />)}
      </StayScrolled>
    );
  }
}

export default LogList;
