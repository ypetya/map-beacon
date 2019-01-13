import React, { Component } from "react";
import * as L from "leaflet";
import './OnMap.css';

class Display extends Component {

    componentDidMount = () => {

        this.map = L.map("map_osm", {
            renderer: L.svg()
        }).setView([51.505, -0.09], 18);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMaps',
            minZoom: 2,
            maxZoom: 30,
            id: "mapbox.streets"
        }).addTo(this.map);

    }

    render = () => {
        const { position, stomp } = this.props;
        if (position && this.map && stomp && !this.timer) {
            const { coords: { latitude, longitude } } = position;
            this.id = Math.random();
            this.props.stomp.subscribe('/locations/*', msg => {

                if(!this.centered) {
                    this.centered=1;
                    this.map.setView([latitude, longitude], 30 - this.map.getZoom());
                }
                const circle = L.circle([latitude, longitude], { radius: 5}).addTo(this.map);
                setTimeout(()=>{circle.remove()},5000);

            });
            this.timer = setInterval(() => {
                this.props.stomp.send(`/locations/${this.id}`, { latitude, longitude }, 'loc');
            }, 5000)
            this.props.stomp.subscribe()
        }
        return <div id="map_osm" className="LeafletMap"></div>;
    }

    componentWillUnmount = () => {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}

export default Display;

