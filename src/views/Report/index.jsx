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
    this.state = {}

  }

  componentDidMount() {
    const id = this.props.match.params;

    db.collection("pins").doc(id.reportsId).onSnapshot((querySnapshot) => {
      console.log(querySnapshot);

      this.setState({
        reportName: querySnapshot.data().title,
        reportDate: querySnapshot.data().time,
        reportIdentify: querySnapshot.data().identify,
        reportDescription: querySnapshot.data().description,
      })

      db.collection("users").doc(querySnapshot.data().author).onSnapshot((dataAccess) => {

        this.setState({
          userId: dataAccess.data().name,
          userCar: dataAccess.data().car_model,
          userPlate: dataAccess.data().plate,
          userIcon: dataAccess.data().icon,
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

  render() {
    return (
      <>
        <Container-Fluid>

          <Row className={this.state.classIdentify}>
            <Col xs={2} sm={2} md={2} xl={2}>
              <Link to="/">
                {/* <button className="icon"> Atrás</button> */}
                <img src={back} className="icon" alt="Volver atrás"></img>
              </Link>
            </Col>
        
            <Col xs={8} sm={8} md={8} xl={8}>
              <h3 className="fontWhite">{this.state.reportName}</h3>
            </Col>

            <Col xs={2} sm={2} md={2} xl={2}>
              {/* <button className="icon" src="">Menú</button> */}
              <img src={menu} className="icon" alt="Botón de menú"></img>
            </Col>
          </Row>


          <Row id="reportDescription">
            <Col xs={12} sm={12} md={12} xl={12} className="">

              <p>{this.state.reportDescription}</p>

            </Col>
          </Row>



          <div id="containerDate" className={this.state.classIdentify}>
            <Row>
              <Col xs={6} md={6} xl={6}>
                <p className="textCenter">Fecha: </p>
              </Col>
              <Col xs={6} md={6} xl={6}>
                <p className="textCenter">Ubicacion:</p>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={6} xl={6}>
                <p className="textCenter">{new Date(this.state.reportDate).toLocaleDateString()}<br/>
                {new Date(this.state.reportDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </Col>
              <Col xs={6} md={6} xl={6}>
                <p className="textCenter">Puma 1180, Recoleta</p>
              </Col>
            </Row>

          </div>


          <Container>
            <Row id="containerUser">
              <Col xs={3} sm={3} md={3} xl={3}>
                <div><img src={photoUser} className="photoUser" alt="Foto de Usuario">
                </img></div>
              </Col>
              <Col xs={9} sm={9} md={9} xl={9}>
                <p>{this.state.userId}</p>
                <p>{this.state.userCar} / {this.state.userPlate}</p>
              </Col>

            </Row>
          <Container>

          </Container>
            <Row>
              <Col xs={12} sm={12} md={12} xl={12}>
                <h4>Comentarios</h4>
              </Col>
            </Row>
          </Container>
        </Container-Fluid>
      </>
    );
  }
}


export default Report;