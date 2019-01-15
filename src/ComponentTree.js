import React from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyA: 'val B',
      keyA: 'val c'
    },
    children: [
      {
        name: 'Level 2: A',
        nodeSvgShape: {
          shape: 'rect',
          shapeProps: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
          }
        },

        attributes: {
          keyA: 'val A',
        },
        children: [{name: 'Jen', separation: {siblings: 20, nonSiblings: 20}}, {name: 'john'},{name: 'Jen'}, {name: 'john'},{name: 'Jen'}, {name: 'john'}]
      },
      {
        name: 'Level 2: B',
        children: [{name: 'Jen'}, {name: 'john'},{name: 'Jen'}, {name: 'john'},{name: 'Jen'}, {name: 'john'}]
      },
      {
        name: 'Level 2: C',
        attributes: {color: 'red'},
        children: [{name: 'Jen'}, {name: 'john'},{name: 'Jen'}, {name: 'john'},{name: 'Jen'}, {name: 'john'}]
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
  shape:'ellipse',
  shapeProps: {
    rx:20,
    ry: 10
  }
}


export default class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {shape: svgSquare, count: 0};
  }

  handleOnClick(e) {
    console.log('/sdlfjdsl', this)
    if (this.state.shape === svgSquare) {
      this.setState({shape: svgEllipse});
    } else {
      this.setState({shape: svgSquare});
    }

  }

  render() {
    console.log(this.props)
    return (

      <div id="treeWrapper" style={{width: '50em', height: '20em'}}>

        <Tree orientation='vertical' onClick={this.handleOnClick} nodeSvgShape={this.state.shape} separation={{siblings: .3,nonSiblings: .3}} data={myTreeData} />

      </div>

    );
  }
}
