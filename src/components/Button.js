import React, { Component } from "react";
import styled from 'styled-components';

const ButtonStyled = styled.button`
  -moz-box-shadow: 3px 4px 0px 0px #3dc21b;
	-webkit-box-shadow: 3px 4px 0px 0px #3dc21b;
	box-shadow: 3px 4px 0px 0px #3dc21b;
	background-color:#44c767;
	-moz-border-radius:42px;
	-webkit-border-radius:42px;
	border-radius:42px;
	border:1px solid #18ab29;
  display: flex;
  justify-content: center;
	cursor:pointer;
	color:#ffffff;
	font-family: Trebuchet MS;
	font-size:14px;
	font-weight:bold;
	// padding:16px 31px;
	text-decoration:none;
  text-shadow:2px 1px 3px #2f6627;
  text-align: center;
  width: auto;
  `;

class Button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ButtonStyled id={this.props.id} onClick={this.props.clicked} style={{ width: 75, height: 45 }}>
        {this.props.counter}
      </ButtonStyled>
    )
  }

}

export default Button;

