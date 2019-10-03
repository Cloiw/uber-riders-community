import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import police from '../../img/police_circle.png'
import thief from '../../img/thief_circle.png'
import susp_passenger from '../../img/susp_passenger_circle.png'
import accident from '../../img/accident_circle.png'
import crane from '../../img/crane_circle.png'
import need_help from '../../img/need_help_circle.png'
import { db } from '../../data/firebase';

import './CreatePin.css'
class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {description : "", identify: ""}
    this.selectIdentify = this.selectIdentify.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.savePin = this.savePin.bind(this);
  }

  selectIdentify(identify){
    this.setState({
      identify: identify
    })
    console.log(this.state.identify)
  }

  changeDescription(el) {
    this.setState({
      description: el.target.value
    })
  }

  savePin(){
    this.setState({
      loading:true
    })
    let userId = "user_lab"
    let time = Date.now()
    let nameDoc = userId+"_"+this.state.identify+"_"+time
    let title = ""
    if(this.state.identify === "police"){
      title = "Carabineros"
    }
    if(this.state.identify === "need_help"){
      title = "Necesito ayuda"
    }
    if(this.state.identify === "susp_passenger"){
      title = "Pasajero sospechoso"
    }
    if(this.state.identify === "thief"){
      title = "Robo"
    }
    if(this.state.identify === "accident"){
      title = "Accidente"
    }
    if(this.state.identify === "crane"){
      title = "Ayuda"
    }
    let data =
      {
      author: userId,
      id: nameDoc,
      description: this.state.description,
      identify: this.state.identify,
      location : { lat:this.props.lat, long:this.props.long},
      time: time,
      title: title,
      comments: []
      }

    if(this.state.identify === ""){
      return (console.log("identificador no hay"))
    }
    db.collection('pins').doc(nameDoc).set(data)
    .then(() => {
      this.setState({
        loading:false
      })
    })

  }


  render() {
    console.log(this.props.lat,this.props.long )
    console.log(this.state.description)
    return (
      <Container fluid>
        <Row>
          <div className="create-title">
            <p>CREACIÓN DE PIN</p>
          </div>
        </Row>
        <Row  bsPrefix="row identify-icon-container">
          <Col>
            <Row  bsPrefix="row identify-icon-row">
              <img onClick={() => this.selectIdentify("police") } src={police} alt="Police" />
              <img onClick={() => this.selectIdentify("accident") } src={accident} alt="Accident" />
            </Row>
          </Col>
          <Col>
            <Row  bsPrefix="row identify-icon-row">
              <img onClick={() => this.selectIdentify("thief") } src={thief} alt="Thief" />
              <img onClick={() => this.selectIdentify("crane") } src={crane} alt="Crane" />
            </Row>
          </Col>
          <Col>
            <Row  bsPrefix="row identify-icon-row">
              <img onClick={() => this.selectIdentify("susp_passenger") } src={susp_passenger} alt="Susp Pass" />
              <img onClick={() => this.selectIdentify("need_help") } src={need_help} alt="Need Help" />
            </Row>
          </Col>
        </Row>
        <Row>
          <p>pañsa</p>
          <textarea rows={10} cols={30} value={this.state.description}  placeholder="Descripción"   onChange={(event) => this.changeDescription(event)} />
        </Row>
        <Row>
          <button onClick={()=> this.savePin()}> crea tu pinsito</button>
        

        </Row>
      </Container>
    )}
}

export default CreatePin