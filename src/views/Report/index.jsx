
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../data/firebase';


class Report extends React.Component {
  constructor() {
    super();
    this.state = {}

  }

  componentDidMount() {
    const id = this.props.match.params
   console.log(id.reportsId)
   db.collection("pins").doc(id.reportsId).onSnapshot((querySnapshot)=>{
     console.log(querySnapshot.data())
  
    
  })
}

render() {
  return (
    <div className="report">

      <p>ola</p>
      <Link to="/">
        <button>volver</button>
      </Link>

    </div>
);
  }
}


export default Report;