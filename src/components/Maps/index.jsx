import React, { Component } from 'react';
import userIcon from '../../img/user_icon.png';
import { db } from '../../data/firebase';
<<<<<<< HEAD
=======
import btnBusqueda from '../../img/btnBusqueda.png'
import btnIniciar from '../../img/btnIniciar.png'
import btnCondcutor from '../../img/user_icon.png'
import btnSeguridad from '../../img/btnSeguridad.png'
import btnPanico from '../../img/btnPanico.png'
import btnLocalizacion from '../../img/btnLocalizacion.png';
import btnEmergencia from '../../img/btnEmergencia.png';
import { Redirect } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
>>>>>>> 31f5625b8a188382810ca1f21d7ca5cfe7f1ff9b

import './Maps.css'
import CreatePin from '../CreatePin';

const google = window.google;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapsRef = React.createRef();
    this.state = { lat: 33.4107511, long: -70.6335647, isMakingPin: false, creatingPin: false }
    this.last_coordinate = {lat: 0, long:0};
    this.map = null;
    this.marker = null;
    this.loaded_map = false;
    this.changeIsMakingPin = this.changeIsMakingPin.bind(this);
    this.createListener = this.createListener.bind(this)
    this.reCenter = this.reCenter.bind(this)
    this.isMakingPin = false;
    this.newPinLat = 0;
    this.newPinLong = 0;
  }
  
  reCenter(){
    this.map.setCenter(this.center);
  }
  samePosition(position) {
    return (this.last_coordinate.lat === position.coords.latitude && this.last_coordinate.long === position.coords.longitude);
  }

  changeIsMakingPin() {
    console.log(!this.isMakingPin)
    this.isMakingPin = !this.isMakingPin;
    this.createListener()
  }

  createListener() {
    const createPin = google.maps.event.addListener(this.map, "click", (e) => {
      this.newPinLong = e.latLng.lng();
      this.newPinLat = e.latLng.lat();
      this.setState({creatingPin : true})
      console.log(this.newPinLat)
    })

    if(this.isMakingPin === true ){
      
      console.log("sip")
       return google.maps.event.addListener(createPin)
      }
      console.log("quitar evento")
       google.maps.event.clearListeners(this.map, 'click');
  }
  
  componentDidMount() { 
    const googleScript = document.getElementById('google-map-script')
    console.log(googleScript)
    if (window.google) {
      console.log("if")
       return this.allOk()
    }

    googleScript.addEventListener('load', () => {
      console.log("script")
      this.allOk()
    })
  }

  allOk() {
    console.log("all")
    navigator.geolocation.getCurrentPosition((position) => {
      let mapOptions = {
<<<<<<< HEAD
        zoom: 12,
=======
        zoom: 20,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
>>>>>>> 31f5625b8a188382810ca1f21d7ca5cfe7f1ff9b
        center: { lat: position.coords.latitude, lng:  position.coords.longitude}
      };
      this.center = mapOptions.center
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

    db.collection("pins").onSnapshot((querySnapshot)=>{
      
      this.setState({
        pins: querySnapshot.docs.map(doc => {     
          return {data: doc.data() }
        })
      })

      
      this.state.pins.map(e=>{ 
        const icon = {
          url: require(`../../img/${e.data.identify}.png`),
          scaledSize: new google.maps.Size(60, 60), 
        };
        let marker = new google.maps.Marker({
          position: { lat: e.data.location.lat, lng:  e.data.location.long },
          map: this.map,
          title: 'Laboratoria',
          icon: icon,
        });
          marker.addListener('click', () => { 
           window.location = `/report/${e.data.author+"_"+e.data.identify+"_"+e.data.time}`

          });
          marker.setMap(this.map)

        });

    })

  }

  render() {

    return (
      <div>
      {this.state.creatingPin ===false ? (
        <div>
        <Container fluid>
          <div className="pruebaa">
            <button className="btn-create-pin" onClick={()=> this.changeIsMakingPin() }> center </button>
          </div>
          <Row bsPrefix="row icons-top">
              <img className='icons'src={btnBusqueda} />
              <button className="icons">CLP</button>
              <img className='icons'src={btnCondcutor} />
          </Row>
          <Row  bsPrefix="row prueba">
            <Col xs={4}>
              <img id='security'className='icons'src={btnSeguridad} />
              <img id='panic'className='icons'src={btnPanico} />
            </Col>
            <Col xs={4}>
              <img className='icons'src={btnIniciar} />
            </Col>
            <Col xs={4}>
              <button onClick={()=> this.reCenter() }> center </button>
            </Col>
            <Col>
              <Row>
                <img className='sos' src={btnEmergencia}></img>
              </Row>
            </Col>
          </Row>
          </Container>
      
      <div id="divMap" ref={this.mapsRef} >
      </div></div>
        ) : <CreatePin lat={this.newPinLat} long={this.newPinLong}/> }
    </div>
    )
      }
}


export default Maps;