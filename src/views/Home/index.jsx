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
      <Row bsPrefix="row icons-top">
        <Col xs={3}>
          <img class='icons'src={btnBusqueda} />
        </Col>
        <Col xs={6}>
          <img class='icons clp'src={CLP} />
        </Col>
        <Col xs={3}>
          <img class='icons'src={btnCondcutor} />
        </Col>
      </Row>
      <Col  bsPrefix="col btns-bottom ">
        <Row>
          <Col xs={4}>
            <img id='security'class='icons'src={btnSeguridad} />
            <img id='panic'class='icons'src={btnPanico} />
          </Col>
          <Col xs={4}>
            <img class='icons'src={btnIniciar} />
          </Col>
          <Col xs={4}>
            <img class='icons'src={btnLocalizacion} />
          </Col>
        </Row>
        <Row xs={12}>
          <Col> 
            <img class='sos' src={btnEmergencia}></img>
          </Col> 
        </Row>
      </Col>

  </Container>
)

export default Home