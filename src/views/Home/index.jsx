import React from 'react';
import Maps from '../../components/Maps';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
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