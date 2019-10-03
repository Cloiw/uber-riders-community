import React, { Component } from 'react';
import userIcon from '../../img/user_icon.png';
import { db } from '../../data/firebase';
import btnBusqueda from '../../img/btnBusqueda.png'
import btnIniciar from '../../img/btnIniciar.png'
import btnConductor from '../../img/user_icon.png'
import btnSeguridad from '../../img/btnSeguridad.png'
import btnSeguridadActivo from '../../img/btnSeguridadActivo.png'
import locIcon from '../../img/location_icon.png';
import AlertDismissible from '../Alerts/index';
import CLP from '../../img/CLP.png'
import CreatePinIcon from '../../img/create-pin.png'

import {
  Container,
  Row,
} from 'react-bootstrap';
import './Maps.css'
import CreatePin from '../CreatePin';
const google = window.google;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapsRef = React.createRef();
    this.state = { lat: 33.4107511, long: -70.6335647, isMakingPin: false, creatingPin: false, showMakingText: false }
    this.last_coordinate = {lat: 0, long:0};
    this.map = null;
    this.marker = null;
    this.loaded_map = false;
    this.changeIsMakingPin = this.changeIsMakingPin.bind(this);
    this.createListener = this.createListener.bind(this)
    this.reCenter = this.reCenter.bind(this)
    this.active = false
    this.isMakingPin = false;
    this.newPinLat = 0;
    this.newPinLong = 0;
  }
  
  reCenter(){
    console.log("ckic")
    this.map.setCenter(this.center);
    this.map.setZoom(15)
  }
  samePosition(position) {
    return (this.last_coordinate.lat === position.coords.latitude && this.last_coordinate.long === position.coords.longitude);
  }

  changeIsMakingPin() {
    if(this.state.showMakingText){
      this.setState({showMakingText : false})
      google.maps.event.clearListeners(this.map, 'click');
      return
    }
    this.setState({showMakingText : true})
    console.log(!this.isMakingPin)
    this.isMakingPin = !this.isMakingPin;
    this.createListener()
  }

  createListener() {
    const createPin = google.maps.event.addListener(this.map, "click", (e) => {
      this.newPinLong = e.latLng.lng();
      this.newPinLat = e.latLng.lat();
      this.setState({showMakingText : false})
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

  showPins() {
    this.active = !this.active 
    console.log(this.state.pins)
    
    if(this.active === true){
      console.log(this.active)
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
  }else {
    // marker.setMap(null)
  // this.setState({pins: []})
  this.setState({pins: null})

  // console.log('pins',this.state.pins, 'data',this.state.data)
  }
  // console.log('click:',this.active)
}
  

  allOk() {
    console.log("all")
    navigator.geolocation.getCurrentPosition((position) => {
      let mapOptions = {
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
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

    });
  
  
        
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
    
          
    // db.collection("pins").onSnapshot((querySnapshot)=>{
      
    //   this.setState({
    //     pins: querySnapshot.docs.map(doc => {     
    //       return {data: doc.data() }
    //     })
    //   })
    
      
  

    //   this.state.pins.map(e=>{ 
    //     const icon = {
    //       url: require(`../../img/${e.data.identify}.png`),
    //       scaledSize: new google.maps.Size(60, 60), 
    //     };
    //     let marker = new google.maps.Marker({
    //       position: { lat: e.data.location.lat, lng:  e.data.location.long },
    //       map: this.map,
    //       title: 'Laboratoria',
    //       icon: icon,
    //     });
    //       marker.addListener('click', () => { 
    //        window.location = `/report/${e.data.author+"_"+e.data.identify+"_"+e.data.time}`

    //       });
    //       marker.setMap(this.map)

    //     });

    // })

    //     });
      
    // })
          
  }
        
  render() {

    return (
      <div className="alcien">
      {this.state.creatingPin ===false ? (
        <div className="alcien">
        <Container fluid>
          <div className="pruebaa">
          {this.state.showMakingText ? (<div className="text-create"><h2>Selecciona un lugar para colocar tu pin</h2></div>) : null}
            <img src={CreatePinIcon} alt="Boton crear" className={this.state.showMakingText ? "btn-create-pin border-active" : "btn-create-pin"} onClick={()=> this.changeIsMakingPin() }/>

          </div>
          <Row bsPrefix="row icons-top">
              <img alt="Busqueda" className='icons'src={btnBusqueda} />
              <img alt="CLP" className="icons CLP" src={CLP} />
              <img alt="Conductor" className='icons'src={btnConductor} />
          </Row>
    
          <Row  bsPrefix="row icons-bot">
            
              <img alt="Seguridad" id='security' onClick={() => this.showPins()} className='icons'src={!this.active ? btnSeguridad : btnSeguridadActivo}/> 
              <img alt="Iniciar" id="start" className='icons'src={btnIniciar} />
              <img alt="Localizar" className='icons' src={locIcon} id='btn-localizacion' onClick={()=> this.reCenter() } />
          </Row>
          
          <Row className="row alert-bot">
            < AlertDismissible /> 
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