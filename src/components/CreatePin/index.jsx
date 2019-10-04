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
        location : { lat: parseFloat(this.lat), long: parseFloat(this.long)},
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
        // window.location = '/showpins';
        this.props.history.push('/showpins')
      })

    }



  render() {
    console.log(this.state.description)
    return (
      <Container>
        <Row bsPrefix="row icons-top report-header">

              <Link to="/">
                <img id='arrow' src={back} className="icon" alt="Volver atrás"></img>
              </Link>
              <div className="create-title">
                  <h4 id='title'>Crear Reporte</h4>
              </div>
              <div>
                <img id='arrow2' src={back} className="icon" alt="Volver atrás"></img>
              </div>
        </Row>
        <div className='all-icons'> 
          <Row>
            <div className='icon-txt'>
               <img onClick={() => this.selectIdentify("police") } className={this.state.identify == "police" ? "btn-iden selected-btn-iden" : "btn-iden"} src={police} alt="Police" />  
               <h6 className='txt-indetify'>Policia</h6>
            </div>
            <div className='icon-txt'>
               <img onClick={() => this.selectIdentify("accident") } className={this.state.identify == "accident" ? "btn-iden selected-btn-iden" : "btn-iden"}src={accident} alt="Accident" />
               <h6 className='txt-indetify'>Accidente</h6>
            </div>
            <div className='icon-txt'>
              <img onClick={() => this.selectIdentify("thief") } className={this.state.identify == "thief" ? "btn-iden selected-btn-iden" : "btn-iden"} src={thief} alt="Thief" />
               <h6 className='txt-indetify'>Robo</h6>
            </div>
          </Row>
       
         <Row>
           <div className='icon-txt'>
             <img onClick={() => this.selectIdentify("crane") } className={this.state.identify == "crane" ? "btn-iden selected-btn-iden" : "btn-iden"} src={crane} alt="Crane" />
             <h6 className='txt-indetify'>Grúa</h6>   
           </div>
           <div className='icon-txt'>
             <img onClick={() => this.selectIdentify("susp_passenger") } className={this.state.identify == "susp_passenger" ? "btn-iden selected-btn-iden" : "btn-iden"} src={susp_passenger} alt="Susp Pass" />
             <p className='txt-indetify'>Pasajero Sospechoso</p> 
           </div>
            <div className='icon-txt'>
             <img id='long-text' onClick={() => this.selectIdentify("need_help") } className={this.state.identify == "need_help" ? "btn-iden selected-btn-iden" : "btn-iden"} src={need_help} alt="Need Help" />
             <p className='txt-indetify'>Necesito Ayuda</p>
           </div>
         </Row>
         <Row>
          <textarea className='txt-area'rows={7} cols={30} value={this.state.description}  placeholder="Escribe aquí tu reporte"   onChange={(event) => this.changeDescription(event)} />
        </Row>
        <Row >
          {!this.state.loading ? (<button className='btn-report' onClick={()=> this.savePin()}> Reportar</button>) : (null)}
        </Row>
        </div>
       
      </Container>
    )}
}


  export default CreatePin