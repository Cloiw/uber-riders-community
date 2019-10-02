
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../data/firebase';
import { Container, Row, Col } from 'react-bootstrap';


class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    }

  componentDidMount() {
    const id = this.props.match.params;

    console.log(id);

    db.collection("pins").doc(id.reportsId).onSnapshot((querySnapshot) => {
      console.log(querySnapshot)
  
      this.setState({
        reportName: querySnapshot.data().title,
        reportDate: querySnapshot.data().time,
      })

    db.collection("users").doc(querySnapshot.data().author).onSnapshot((dataAccess) => {
      console.log(dataAccess.data())
      this.setState({
        userId: dataAccess.data().id,
        userCar: dataAccess.data().car_model,
        userPlate: dataAccess.data().plate,

      })
    })
    })

  }

  render() {
 
    return (
      <>       
          <Row>
            <Col xs={2} sm={2} md={2} xl={2}>
              <Link to="/">
                <button>Atrás</button>
              </Link> 
            </Col>

            <Col xs={8} sm={8} md={8} xl={8}>
              <p>{this.state.reportName}</p>
            </Col>

            <Col xs={2} sm={2} md={2} xl={2}>
              <button>Menú</button>
            </Col>  
          </Row>


          <Row>
            <Col xs={6} md={6} xl={6}>
              <p>Fecha:{this.state.reportDate}</p>
            </Col>
            <Col xs={6} md={6} xl={6}>
              <p>Ubicacion:</p>
            </Col>
          </Row>


          <Row>
              <Col xs={4} md={4} xl={4}>
                <p>Nombre de usuario:{this.state.userId}</p>
                <p>Auto:{this.state.userCar}</p>
                <p>Patente:{this.state.userPlate}</p>
              </Col>
          </Row>
      </>
        );
      }
    }
    
    
export default Report;