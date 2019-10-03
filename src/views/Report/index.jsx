import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../data/firebase';
import { Container, Row, Col } from 'react-bootstrap';
import './report.css';
import back from '../../img/arrowBack.png';
import menu from '../../img/menu.png';
import photoUser from '../../img/user_icon.png'

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportComments: [],userIcon:null
    }
  }

  componentDidMount() {
    const id = this.props.match.params;;

    db.collection("pins").doc(id.reportsId).onSnapshot((querySnapshot) => {
      this.setState({
        reportName: querySnapshot.data().title,
        reportDate: querySnapshot.data().time,
        reportIdentify: querySnapshot.data().identify,
        reportDescription: querySnapshot.data().description,
        reportLocation: querySnapshot.data().location,
        reportComments: querySnapshot.data().comments,
        
      })
      
      this.geocoder(querySnapshot.data().location)

      db.collection("users").doc(querySnapshot.data().author).onSnapshot((dataAccess) => {

        this.setState({
          userId: dataAccess.data().name,
          userCar: dataAccess.data().car_model,
          userPlate: dataAccess.data().plate,
          userIcon: dataAccess.data().id,
          photoUser: photoUser,
        })
      })

      if (this.state.reportIdentify === "police") return this.setState({ classIdentify: "pinPolice" });
      if (this.state.reportIdentify === "need_help") return this.setState({ classIdentify: "pinHelp" });
      if (this.state.reportIdentify === "accident") return this.setState({ classIdentify: "pinAccident" });
      if (this.state.reportIdentify === "crane") return this.setState({ classIdentify: "pinCrane" });
      if (this.state.reportIdentify === "susp_passenger") return this.setState({ classIdentify: "pinSuspiciousPassenger" });
      if (this.state.reportIdentify === "thief") return this.setState({ classIdentify: "pinThief" });
    })
    console.log("color " + this.state.reportIdentify)
  }
 

  geocoder(location){ 
    let lat= location.lat;
    let lng= location.long;
    fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=nqwjoGIde77r65d8PHVTi2KbII88bOeb&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`)
    .then(res=> 
      res.json().then(res=>{
        this.setState({street: (res.results[0].locations[0].street),
        area:(res.results[0].locations[0].adminArea5)})
      })
    )
  }


  render() {
    return (
      <>
        <Container >
          <Row className={this.state.classIdentify+" title-report"}>
            <Link to="/">
              <img src={back} className="icon icon-arrow" alt="Volver atrás"></img>
            </Link>
            <h4 className="fontWhite ">{this.state.reportName}</h4>
            {/* <button className="icon" src="">Menú</button> */}
            <img src={menu} className="icon icon-dot" alt="Botón de menú"></img>
          </Row>
          <Row id="containerUser">  
            {this.state.userIcon !=null && 
            <img src={require(`../../img/${this.state.userIcon}.png`)} className="photoUser" alt="Foto de Usuario" />}
            <Col bsPrefix="align-user col">
              <p className="p-report-name">{this.state.userId}</p>
              <p className="p-report-name">{this.state.userCar} / {this.state.userPlate}</p>
            </Col>
          </Row>
          <Row id="reportDescription">
            
              <p>{this.state.reportDescription}</p>
         
          </Row>
            <Row bsPrefix={this.state.classIdentify+" marginrow row"} >
              <Col  bsPrefix="subt right col" xs={6} >
                <p className="fontWhite">Fecha </p>
              </Col>
              <Col  bsPrefix="subt left col" xs={6}>
                <p className="fontWhite">Ubicación</p>
              </Col>
            </Row>
            <Row bsPrefix={" marginrow row"}>
              <Col  bsPrefix="date col" xs={6}>
                {this.state.reportDate != undefined && 
                <p className="textRight ">{new Date(this.state.reportDate).toLocaleDateString()}<br />
                  {new Date(this.state.reportDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })+" hrs."}
                </p>
                }
                
              </Col>
            
              <Col bsPrefix="date col" xs={6}>
                <p className="textRight ">{this.state.street}<br/>{this.state.area}</p>
              </Col>
            </Row>
      
          

        
            <Row>
            <div className={this.state.classIdentify+"-color-hr"}></div>
              <Col bsPrefix="comentarios col-12">
                <h4>Comentarios</h4>
              </Col>
              <Col bsPrefix="comentarios-map col-12">
                {console.log(this.state.reportComments)}
                {this.state.reportComments.length != 0 ? this.state.reportComments.map(comment => {
                  return (
                    <div className="comment-div">
                      <Row bsPrefix="row-comment row">
                        <img src={require(`../../img/${comment.author}.png`)} className="photoUserCom" alt="Foto de Usuario" />
                        <Col bsPrefix="marginrow col">
                          <p className="comment-name">{comment.name}</p>
                        <div className="comment-col">
                          <p className="comment-p">{comment.comment}</p>
                        </div>
                        </Col>
                      </Row>
                    </div>
                  )
                }) : <div><p>Aún no hay comentarios</p></div>
                }
              </Col>
            </Row>
      
          </Container>

      </>
    );
  }
}


export default Report;