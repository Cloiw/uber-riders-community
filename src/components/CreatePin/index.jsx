import React, {Component} from 'react';


class CreatePin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>olaaaaaa{this.props.lat}...{this.props.long} </p>
      </div>
    )}
}

export default CreatePin