import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button id={this.props.id} onClick={this.props.clicked} style={{ width: 75, height: 45 }}>
        {this.props.counter}
      </button>
    )
  }

}

export default Button;

