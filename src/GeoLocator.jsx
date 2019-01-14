import React, { Component } from "react";

class GeoLocator extends Component {
  state = {};

  showPosition = position => {
    if (!this.position) {
      this.position = position;
      this.setState({ position }, () => console.log(position));
    }

    if (this.props.connected) {
      const {coords:{ latitude, longitude }} = position;
      this.props.stomp.send(
        `/locations/${this.props.id}`,
        { latitude, longitude },
        "loc"
      );
    }
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
        this.timer = setInterval(() => navigator.geolocation.getCurrentPosition(this.showPosition), 5000);
    } else {
      console.error("No navigator.geolocation");
    }
  };

  render = () => {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { position: this.state.position })
    );
    return <>{childrenWithProps}</>;
  };


  componentWillUnmount = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };
}

export default GeoLocator;
