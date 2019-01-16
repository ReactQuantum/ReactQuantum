import React from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val c'
    },
    stats: "ANYTHING AT ALL!!!",
    children: [
      {
        name: 'Level 2: A',
        stats: '100ms',
        nodeSvgShape: {
          shape: 'rect',
          shapeProps: {
            width: 20,
            height: 40,
            x: -10,
            y: -10,
          }
        },

        attributes: {
          keyA: 'val A',
        },
        children: [{ name: 'Jen', stats: '101ms', separation: { siblings: 20, nonSiblings: 20 } }, { name: 'john', stats: '102ms', }, { name: 'Jen', stats: '103ms', }, { name: 'john', stats: '120ms', }, { name: 'Jen', stats: '1111ms', }, { name: 'john', stats: '120ms', }]
      },
      {
        name: 'Level 2: B',
        children: [{ name: 'Jen' }, { name: 'john' }, { name: 'Jen' }, { name: 'john' }, { name: 'Jen' }, { name: 'john' }]
      },
      {
        name: 'Level 2: C',
        attributes: { color: 'red' },
        children: [{ name: 'Jen' }, { name: 'john' }, { name: 'Jen' }, { name: 'john' }, { name: 'Jen' }, { name: 'john' }]
      },
    ],
  },
];

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 20,
    height: 20,
    x: -10,
    y: -10,
  }
}

const svgEllipse = {
  shape: 'ellipse',
  shapeProps: {
    rx: 20,
    ry: 10
  }
}



class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOver = this.mouseOver.bind(this);
    this.state = {shape: svgSquare, count: 0};
  }

  // handleOnClick(e) {
  //   // console.log('/sdlfjdsl', this)
  //   // if (this.state.shape === svgSquare) {
  //   //   this.setState({shape: svgEllipse});
  //   // } else {
  //   //   this.setState({shape: svgSquare});
  //   // }
  //   let info = e.stats;
  //   this.props.grabNodeStats(info);
  // }

  
  mouseOver(e) {
    let info = e.stats;
    this.props.grabNodeStats(info);
  }

  render() {

    return (

      <div id="treeWrapper" style={{ width: '100%', height: '20em' }}>

        <Tree orientation='vertical' onMouseOver={this.mouseOver} nodeSvgShape={this.state.shape} separation={{siblings: .3,nonSiblings: .3}} data={myTreeData} />

      </div>

    );
  }
}


export default TreeComponent;
