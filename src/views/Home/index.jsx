import React from 'react';
import Maps from '../../components/Maps';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import './Home.css'
import { tsPropertySignature } from '@babel/types';

const Home = (props) => (
  <Container fluid>
    <Row>
      <Maps pins={props.pins}/>
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