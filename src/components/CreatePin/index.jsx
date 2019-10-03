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
import back from '../../img/arrowBack.png';
import { Link } from 'react-router-dom';
  import './CreatePin.css'
  class CreatePin extends Component {
    constructor(props) {
      super(props);
      this.state = {description : "", identify: ""}
      this.selectIdentify = this.selectIdentify.bind(this);
      this.changeDescription = this.changeDescription.bind(this);
      this.savePin = this.savePin.bind(this);
      const {lat, long} = props.match.params;
      this.lat = lat;
      this.long = long;
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
        location : { lat:this.lat, long:this.long},
        time: time,
        title: title,
        comments: []
        }

      if(this.state.identify === ""){
        return (console.log("identificador no hay"))
      }
      console.log(data)
      db.collection('pins').doc(nameDoc).set(data)
      .then(() => {
        this.setState({
          loading:false
        })
        window.location = '/';
      })

    }


    render() {
      console.log(this.lat,this.long )
      console.log(this.state.description)
      return (
        <Container fluid bsPrefix="reports container-fluid">
        <Row bsPrefix="report-header">           
              <Link to="/">
                <img id='arrow' src={back} className="icon" alt="Volver atrás"></img>
              </Link>
              <div className="create-title">
                  <h4 id='title'>Crear Reporte</h4>
              </div>
          </Row>
          <Row  bsPrefix="row identify-icon-container">
            <Col>
              <Row  bsPrefix="row identify-icon-row">
                <Col><img onClick={() => this.selectIdentify("police") } className={this.state.identify == "police" ? "btn-iden selected-btn-iden" : "btn-iden"} src={police} alt="Police" />
              <h5 className='txt-indetify'>Policia</h5>
              </Col>
              <Col><img onClick={() => this.selectIdentify("accident") } className={this.state.identify == "accident" ? "btn-iden selected-btn-iden" : "btn-iden"}src={accident} alt="Accident" />
              <h5 className='txt-indetify'>Accidente</h5>
              </Col>
                {/* <img onClick={() => this.selectIdentify("police") } className={this.state.identify == "police" ? "btn-iden selected-btn-iden" : "btn-iden"} src={police} alt="Police" />
                <img onClick={() => this.selectIdentify("accident") } className={this.state.identify == "accident" ? "btn-iden selected-btn-iden" : "btn-iden"}src={accident} alt="Accident" /> */}
              </Row>
            </Col>
            <Col>
              <Row  bsPrefix="row identify-icon-row">
                <Col><img onClick={() => this.selectIdentify("thief") } className={this.state.identify == "thief" ? "btn-iden selected-btn-iden" : "btn-iden"} src={thief} alt="Thief" />
              <h5 className='txt-indetify'>Robo</h5>
              </Col>
              <Col><img onClick={() => this.selectIdentify("crane") } className={this.state.identify == "crane" ? "btn-iden selected-btn-iden" : "btn-iden"} src={crane} alt="Crane" />
              <h5 className='txt-indetify'>Grúa</h5>
              </Col>
                {/* <img onClick={() => this.selectIdentify("thief") } className={this.state.identify == "thief" ? "btn-iden selected-btn-iden" : "btn-iden"} src={thief} alt="Thief" />
                <img onClick={() => this.selectIdentify("crane") } className={this.state.identify == "crane" ? "btn-iden selected-btn-iden" : "btn-iden"} src={crane} alt="Crane" /> */}
              </Row>
            </Col>
            <Col>
              <Row  bsPrefix="row identify-icon-row">
                <Col >
                <img onClick={() => this.selectIdentify("susp_passenger") } className={this.state.identify == "susp_passenger" ? "btn-iden selected-btn-iden" : "btn-iden"} src={susp_passenger} alt="Susp Pass" />
                <h5 className='txt-indetify'>Pasajero Sospechoso</h5>
              </Col>
              <Col><img id='long-text' onClick={() => this.selectIdentify("need_help") } className={this.state.identify == "need_help" ? "btn-iden selected-btn-iden" : "btn-iden"} src={need_help} alt="Need Help" />
              <h5 className='txt-indetify'>Necesito Ayuda</h5>
              </Col>
                {/* <img onClick={() => this.selectIdentify("susp_passenger") } className={this.state.identify == "susp_passenger" ? "btn-iden selected-btn-iden" : "btn-iden"} src={susp_passenger} alt="Susp Pass" />
                <img onClick={() => this.selectIdentify("need_help") } className={this.state.identify == "need_help" ? "btn-iden selected-btn-iden" : "btn-iden"} src={need_help} alt="Need Help" /> */}
              </Row>
            </Col>
          </Row>
          <Row>
            <textarea className='txt-area'rows={7} cols={30} value={this.state.description}  placeholder="Escribe aquí tu reporte"   onChange={(event) => this.changeDescription(event)} />
        </Row>
        <Row bsPrefix="buttons">
          <button className='btns-report' onClick={()=> this.savePin()}> Reportar</button>

        

            {/* <p>Ingresa tu reporte</p>
            <textarea rows={10} cols={30} value={this.state.description}  placeholder="Descripción"   onChange={(event) => this.changeDescription(event)} />
          </Row>
          <Row>
            <button onClick={()=> this.savePin()}>Reportar</button> */}
          </Row>
        </Container>
      )}
  }

  export default CreatePin