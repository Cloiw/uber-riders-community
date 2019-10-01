import React, { Component } from 'react';

const google = window.google;

class Maps extends Component {
    constructor(props) {
        super(props);
        this.mapsRef = React.createRef();
        this.state = { lat: 33.4107511, long: -70.6335647 }
    }

    componentWillMount() {

    }


    componentDidMount() {

        navigator.geolocation.watchPosition((position) => {

            console.log("moviending")
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude

            })
            console.log(this.state)
            let location = { lat: this.state.lat, lng: this.state.long };
            let mapOptions = {
                zoom: 20,
                center: location,

            };

            let map = new google.maps.Map(this.mapsRef.current, mapOptions)
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'EStoy aquiiiiiii!'
            });
            marker.setMap(map)
            google.maps.event.addListener(map, 'bounds_changed', function () {

            });

            let transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);

        }
        )}

    
    render() {
                return(
            <div id = "divMap" ref = { this.mapsRef } ></div>
        )
    }
}


export default Maps;