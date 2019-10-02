import React, {useState} from 'react';
 import './alerts.css'
import {
    Button,
    Alert,
  } from 'react-bootstrap';


  function AlertDismissible() {
    const [show, setShow] = useState(false);
  
    const closeAlert = () =>{
        setShow(true)
        setTimeout(() =>{setShow(false);}, 5000)
    }
    
    return (
      <>
        <Alert show={show} variant="danger">
          <Alert.Heading>Alerta de Emergencia</Alert.Heading>
          <p>
            La alerta de emergencia de enviara en 5 segundos.
          </p>
          <p>
            Si no tienes ninguna emergencia presiona el boton Cancelar
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-danger">
             Cancelar Alerta
            </Button>
          </div>
        </Alert>
  
        {!show && <Button id='sos'onClick={() => closeAlert()}>EMERGENCIA</Button>}
      </>
    );
  }
  
  
  export default AlertDismissible
// class Alerts extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             show: true
//         }
//     }
//     render(){
//             return (
//               <>
//                 <Alert show={this.show} variant="danger">
//                   <Alert.Heading>How's it going?!</Alert.Heading>
//                   <p>
//                     Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
//                     lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
//                     fermentum.
//                   </p>
//                   <hr />
//                   <div className="d-flex justify-content-end">
//                     <Button onClick={() => this.setState({show: false})} dismissible>
//                       Close me ya'll!
//                     </Button>
                
//                   </div>
//                 </Alert>
          
//                 {!this.show && <Button onClick={() => this.setState({show:true })}>Show Alert</Button>}
//               </>
//             );
//           }
          
//         }      
// export default Alerts