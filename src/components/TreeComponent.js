import React from 'react';
import Tree from 'react-d3-tree';

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
    this.state = {shape: svgEllipse};
  }

  mouseOver(e) {
    let stats = {name: e.name, time: e.renderTime, individualTime: e.individualTime};
    this.props.grabNodeStats(stats);
  }


  render() {

    return (

      <div id="treeWrapper" style={{width: '100%', height: '100em'}}>

        <Tree
          translate={{x: 300, y: 100}}
          orientation={this.props.orientation}
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
