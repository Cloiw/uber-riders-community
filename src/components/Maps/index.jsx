import React, { Component } from 'react';
import userIcon from '../../img/user_icon.png';

import './Maps.css'

const google = window.google;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapsRef = React.createRef();
    this.state = { lat: 33.4107511, long: -70.6335647 }
    this.last_coordinate = {lat: 0, long:0};
    this.map = null;
    this.marker = null;
    this.loaded_map = false;
  }
  
  samePosition(position) {
    return (this.last_coordinate.lat === position.coords.latitude && this.last_coordinate.long === position.coords.longitude);
  }
  
  componentDidMount() { 
    const googleScript = document.getElementById('google-map-script')
    console.log(googleScript)
    if (window.google) {
      this.allOk()
    }

    googleScript.addEventListener('load', () => {
      this.allOk()
    })
  }

  allOk() {
    navigator.geolocation.getCurrentPosition((position) => {
      let mapOptions = {
        zoom: 20,
        center: { lat: position.coords.latitude, lng:  position.coords.longitude}
      };
      this.map = new google.maps.Map(this.mapsRef.current, mapOptions);
      this.map = new google.maps.Map(this.mapsRef.current, mapOptions);
      const icon = {
        url: userIcon,
        scaledSize: new google.maps.Size(80, 80), 
      };
      this.marker = new google.maps.Marker({
        position: { lat: position.coords.latitude, lng:  position.coords.longitude },
        map: this.map,
        title: 'Laboratoria',
        icon: icon,
      });
      this.marker.setMap(this.map)
      this.loaded_map = true;
    })
    
    navigator.geolocation.watchPosition((position) => {
      if(this.samePosition(position) || !this.loaded_map) {
        return;
      }
      this.last_coordinate.lat = position.coords.latitude;
      this.last_coordinate.long = position.coords.longitude;
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })

      this.marker.setPosition( { lat: position.coords.latitude, lng:  position.coords.longitude })
      let transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(this.map);
    })
  }

  render() {
    return (
      <div id="divMap" ref={this.mapsRef} ></div>
    )
  }
}


export default Maps;