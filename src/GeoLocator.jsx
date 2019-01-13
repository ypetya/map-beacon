import React, { Component } from "react";

class GeoLocator extends Component {
    state = {}

    showPosition = position => {
        this.setState({ position }, ()=>console.log(position));
    }

    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.error('No navigator.geolocation');
        }
    }

    render = () => {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { position: this.state.position })
        );
        return <>{childrenWithProps}</>;
    };
}

export default GeoLocator;
