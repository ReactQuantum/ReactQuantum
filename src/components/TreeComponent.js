import React from 'react';
import Tree from 'react-d3-tree';



const test2 = {
  name: 'Level 2: C',
  children: [{name: 'Level 3C: A', stats: '101ms'},
  {name: 'Level 3C: B', stats: '102ms'},
  {name: 'Level 3C: C', stats: '103ms'},
  {name: 'Level 3C: D', stats: '120ms'},
  {name: 'Level 3C: E', stats: '1111ms'}]
};

const myTreeData = test1;

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



class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {shape: svgSquare, count: 0};
  }

  handleOnClick(e) {
    // console.log('/sdlfjdsl', this)
    // if (this.state.shape === svgSquare) {
    //   this.setState({shape: svgEllipse});
    // } else {
    //   this.setState({shape: svgSquare});
    // }
    let info = e.stats;
    this.props.grabNodeStats(info);
  }


  componentWillUpdate () {
    
  }

  render() {

    return (

      <div id="treeWrapper" style={{width: '100%', height: '50em'}}>

        <Tree orientation='vertical' onClick={this.handleOnClick} nodeSvgShape={this.state.shape} separation={{siblings: .3,nonSiblings: .3}} data={myTreeData} />

      </div>

    );
  }
}


export default TreeComponent;
