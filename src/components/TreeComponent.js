import React from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';


const OrientationButtonStyled = styled.div`
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
font-size: 11px;
font-weight:bold;
padding: 3px 8px;
text-decoration:none;
text-shadow:2px 1px 3px #2f6627;
text-align: center;
width: 20%;
margin: 8px;

&:hover {
  background-color: #3e8e41;
}

&:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 20,
    height: 20,
    x: -10,
    y: -10,
    fill: 'blue'
  }
}

const svgEllipse = {
  shape:'ellipse',
  shapeProps: {
    rx: 20,
    ry: 20
  }
}


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOver = this.mouseOver.bind(this);
    this.state = {
      shape: svgEllipse,
      orientation: 'vertical'
    };

    this.changeOrientation = this.changeOrientation.bind(this);
  }

  mouseOver(e) {
    let stats = {name: e.name, time: e.renderTime, individualTime: e.individualTime};
    this.props.grabNodeStats(stats);
  }

  changeOrientation() {
    if (this.state.orientation === 'vertical') {
      this.setState({ orientation: 'horizontal' })
    } else {
      this.setState({ orientation: 'vertical' })
    }
  }



  //parse through next props to add color property base one render time relative to total render time
  // componentWillUpdate (nextProps, nextState) {
  // }

  render() {

    return (

      <div id="treeWrapper" style={{width: '55%', height: '50em', float: 'right', border: '0.5px solid #ababab', margin: '10px', boxShadow: '2px 2px 2px 2px'}}>
         <OrientationButtonStyled
            id={'button2'}
            clicked={this.changeOrientation}
            counter='Orientation'>
            Change Orientation
          </OrientationButtonStyled>
        <Tree
          translate={{x: 300, y: 100}}
          orientation={this.state.orientation}
          onMouseOver={this.mouseOver}
          nodeSvgShape={this.state.shape}
          separation={{siblings: .6,nonSiblings: .6}}
          data={this.props.treeData}
        />

      </div>

    );
  }
}


export default TreeComponent;
