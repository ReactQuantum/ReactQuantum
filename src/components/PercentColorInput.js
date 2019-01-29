import React, { Component } from "react";

class PercentColorInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      green: 0.005,
      lightGreen: 0.001,
      yellow: 0.05,
      orange: 0.01,
    }
    this.cloneTree = this.cloneTree.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.changeTempPercentages = this.changeTempPercentages.bind(this);
  }

  addColor(treeDataArr, green, lightGreen, yellow, orange) {
    let totalTime = treeDataArr[0].renderTime;
    let workToBeDone = [treeDataArr[0]];
    while (workToBeDone.length > 0) {
      let percentTime = workToBeDone[0].individualTime / totalTime;
      if (percentTime < green) {
        workToBeDone[0].nodeSvgShape = {shape: 'ellipse', shapeProps: {rx: 20, ry: 20, fill: '#80b74c'}};
      } else if (percentTime < lightGreen) {
        workToBeDone[0].nodeSvgShape = {shape: 'ellipse', shapeProps: {rx: 20, ry: 20, fill: '#a1c94f'}};
      } else if (percentTime < yellow) {
        workToBeDone[0].nodeSvgShape = {shape: 'ellipse', shapeProps: {rx: 20, ry: 20, fill: '#e6cc38'}};
      } else if (percentTime < orange) {
        workToBeDone[0].nodeSvgShape = {shape: 'ellipse', shapeProps: {rx: 20, ry: 20, fill: '#f69d27'}};
      } else {
        workToBeDone[0].nodeSvgShape = {shape: 'ellipse', shapeProps: {rx: 20, ry: 20, fill: '#e74e2c'}};
      }
      for (var i = 0; i < workToBeDone[0].children.length; i++) {
        workToBeDone.push(workToBeDone[0].children[i]);
      }
      workToBeDone.shift();
    }
    return treeDataArr;
  }

  //deep clone of tree data
  cloneTree(treeDataArr) {
    let newTree = [];
    for (var i = 0; i < treeDataArr.length; i++) {
      let newNode = {};
      for (let k in treeDataArr[i]) {
        if (treeDataArr[i].hasOwnProperty(k)) {
          if (k === 'children') {
            newNode[k] = this.cloneTree(treeDataArr[i][k]);
          } else {
            newNode[k] = treeDataArr[i][k]
          }
        }
      }
      newTree.push(newNode);
    }
    return newTree
  }

  //takes clone of tree date in state of App, updates color based on user input and updates tree
  updateTree() {
    let clone = this.cloneTree(this.props.treeData);
    this.addColor(clone, this.state.green, this.state.lightGreen, this.state.yellow, this.state.orange)
    this.props.updateTreeState(clone);

  }

  changeTempPercentages(e) {
    let temp = {};
    temp[e.target.id] = e.target.value;
    this.setState(temp);
  }


  render() {
    return (
      <form>
        <input type="text" value={this.state.green} placeholder="percentForGreen"  id='green' onChange={this.changeTempPercentages}></input>Green<br/>
        <input type="text" value={this.state.lightGreen} placeholder="percentForLightGreen" id='lightGreen' onChange={this.changeTempPercentages}></input>Lightgreen<br/>
        <input type="text" value={this.state.yellow} placeholder="percentForYellow" id='yellow' onChange={this.changeTempPercentages}></input>Yellow<br/>
        <input type="text" value={this.state.orange} placeholder="percentForOrange" id='orange' onChange={this.changeTempPercentages}></input>Orange<br/>
        <input type="button" onClick={this.updateTree} value="Submit"></input>
      </form>
    )
  }
}

export default PercentColorInput;
