import React, { Component } from "react";

import './DisplayCanvas.css';
class Display extends Component {

    constructor(props) {
        super(props);
        const { height, width } = this.props;

        this.data = {
            cx: width / 2, cy: height / 2,
            r: Math.min(width, height) / 2,
            width, height
        }
    }

    canvas = React.createRef();

    updateCanvas = domNode => () => {
        const { cx, cy, r, width, height } = this.data;
        const ctx = domNode.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();

        if (this.props.position) {
            const time = new Date();
            const angle = ((2 * Math.PI) / 60) * time.getSeconds();

            ctx.beginPath();
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
            ctx.stroke();

            
        }

        ctx.beginPath();
        ctx.fillStyle = this.props.connected ? 'green' : 'red';

        ctx.arc(cx, cy, r / 10, 0, 2 * Math.PI);
        ctx.fill();

        if (this.props.connected) {
            // draw others
        }

        window.requestAnimationFrame(this.updateCanvas(this.canvas.current));
    }

    componentDidMount = () => {
        this.id = Math.random();
        // this.props.stomp.subscribe('/locations/*',msg => {
        //      console.log(msg);
        // });
        // this.timer=setInterval(()=>{
        //     this.props.stomp.send(`/locations/${this.id}`,{},this.props.position);
        // })
        window.requestAnimationFrame(this.updateCanvas(this.canvas.current));
    }

    render = () => {
        return <canvas ref={this.canvas} id="display" width={this.props.width} height={this.props.height}></canvas>;
    }
}

export default Display;