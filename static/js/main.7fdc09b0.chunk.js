(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(25)},16:function(e,t,n){},23:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),a=n(8),r=n.n(a),s=(n(16),n(1)),i=n(3),l=n(2),u=n(4),d=n(9),m=n.n(d),p=n(5),f=(n(23),function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).componentDidMount=function(){n.map=p.map("map_osm",{renderer:p.svg()}).setView([51.505,-.09],18),p.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"OpenStreetMaps",minZoom:2,maxZoom:30,id:"mapbox.streets"}).addTo(n.map)},n.render=function(){var e=n.props,t=e.position,o=e.stomp;if(t&&n.map&&o&&!n.timer){var a=t.coords,r=a.latitude,s=a.longitude;n.id=Math.random(),n.props.stomp.subscribe("/locations/*",function(e){var t=e.headers,o=t.latitude,c=t.longitude;n.centered||(n.centered=1,n.map.setView([o,c],30-n.map.getZoom()));var a=p.circle([o,c],{radius:5}).addTo(n.map);setTimeout(function(){a.remove()},5e3)}),n.timer=setInterval(function(){n.props.stomp.send("/locations/".concat(n.id),{latitude:r,longitude:s},"loc")},5e3),n.props.stomp.subscribe()}return c.a.createElement("div",{id:"map_osm",className:"LeafletMap"})},n.componentWillUnmount=function(){n.timer&&clearInterval(n.timer)},n}return Object(u.a)(t,e),t}(o.Component)),b=function(e){function t(){var e,n;Object(s.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).state={},n.showPosition=function(e){n.setState({position:e},function(){return console.log(e)})},n.componentDidMount=function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(n.showPosition):console.error("No navigator.geolocation")},n.render=function(){var e=n.props.children,t=c.a.Children.map(e,function(e){return c.a.cloneElement(e,{position:n.state.position})});return c.a.createElement(c.a.Fragment,null,t)},n}return Object(u.a)(t,e),t}(o.Component),w="ws://localhost:3490",g=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(i.a)(this,Object(l.a)(t).call(this,e))).onConnect=function(e){n.ws=new WebSocket(e),n.socket=m.a.over(n.ws),n.ws.addEventListener("close",n.reconnect),n.ws.addEventListener("error",n.reconnect),n.socket.connect([],function(){n.setState({websocket:n.socket,connected:!0,savedWs:e},function(){return localStorage.setItem("ws",e)})})},n.reconnect=function(){n.state.connected&&(console.log("Connection should be up, reconnecting in 1 sec"),setTimeout(n.onConnect.bind(n.state.savedWs),1e3))},n.onDisconnect=function(){n.socket.disconnect(function(){n.setState({websocket:null,connected:!1},function(){n.ws.close(),n.ws=n.socket})})},n.renderWidgets=function(){return c.a.createElement(b,null,c.a.createElement(f,{stomp:n.state.websocket,width:256,height:256,connected:n.state.connected}))},n.componentDidMount=function(){n.state.savedWs&&n.onConnect(n.state.savedWs)},n.render=function(){return c.a.createElement(c.a.Fragment,null,n.state.savedWs?c.a.createElement(c.a.Fragment,null):c.a.createElement("header",null,c.a.createElement("input",{ref:n.textInput,type:"text",defaultValue:w}),c.a.createElement("button",{onClick:function(){n.onConnect(n.textInput.current.value)},disabled:!!n.state.websocket},"Connect"),c.a.createElement("button",{onClick:n.onDisconnect,disabled:!n.state.websocket},"Disconnect")),c.a.createElement("main",null,n.renderWidgets()))},n.componentWillUnmount=function(){n.ws&&(n.ws.close(),n.ws=n.socket=null)},n.state={websocket:null,connected:!1,savedWs:localStorage.getItem("ws")},n.textInput=c.a.createRef(),n}return Object(u.a)(t,e),t}(o.Component);r.a.render(c.a.createElement(g,null),document.getElementById("root"))}},[[10,2,1]]]);
//# sourceMappingURL=main.7fdc09b0.chunk.js.map