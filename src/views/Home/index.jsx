import React from 'react';
import Maps from '../../components/Maps';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import btnBusqueda from '../../img/btnBusqueda.png'
import btnIniciar from '../../img/btnIniciar.png'
import btnCondcutor from '../../img/btnConductor.png'
import btnSeguridad from '../../img/btnSeguridad.png'
import btnPanico from '../../img/btnPanico.png'
import btnLocalizacion from '../../img/btnLocalizacion.png'



const Home = () => (
  <Container fluid>
    <div class='mapaqlo'>
      <Maps>

      </Maps>
    </div>
    <Row>
      <Col xs={6}>
        <img src={btnBusqueda} />
      </Col>
      <Col xs={6}>
        <img src={btnCondcutor} />
      </Col>
    </Row>

    <Row md={12}>
      <Col xs={4}>
        <img src={btnSeguridad} />
      </Col>
      <Col xs={4}>
        <img src={btnIniciar} />
      </Col>
      <Col xs={4}>
        <img src={btnLocalizacion} />
      </Col>
    </Row>




  </Container>
)

export default Home