import React from 'react';
import Maps from '../../components/Maps';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import btnBusqueda from '../../img/btnBusqueda.png'
import btnIniciar from '../../img/btnIniciar.png'
import btnCondcutor from '../../img/user_icon.png'
import btnSeguridad from '../../img/btnSeguridad.png'
import btnPanico from '../../img/btnPanico.png'
import btnLocalizacion from '../../img/btnLocalizacion.png';
import btnEmergencia from '../../img/btnEmergencia.png';
import CLP from '../../img/CLP.png'
import './Home.css'

const Home = () => (
  <Container fluid>
    <Row>
      <Maps/>
    </Row>
      
      <Col  bsPrefix="col btns-bottom ">
        <Row>
          <Col xs={4}>
 
          </Col>
          <Col xs={4}>
     
          </Col>
          <Col xs={4}>
            
          </Col>
        </Row>
        <Row xs={12}>
          <Col> 
            
          </Col> 
        </Row>
      </Col>

  </Container>
)

export default Home