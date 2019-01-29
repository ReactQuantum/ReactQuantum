import React, { Component } from "react";
import styled from 'styled-components';

const InputStyled = styled.input`
  width: 10%;
  outline: none;
  display: inline;
`;


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
      <form style={{borderBottom: '0.5px solid #ababab', boxShadow: '0 4px 2px -2px #ababab', paddingBottom: '5px'}}>
         <div style={{ width: '98%', display: 'inline', justifyContent: 'left'}}>
         <label style={{padding: '3px'}}>Green</label><input type="text" style={{ width: '40px', padding: '3px', marginTop: '5px'}} value={this.state.green} placeholder="percentForGreen"  id='green' onChange={this.changeTempPercentages}/>
         <label>Lightgreen</label><input type="text" style={{ width: '40px', padding: '3px'}} value={this.state.lightGreen} placeholder="percentForLightGreen" id='lightGreen' onChange={this.changeTempPercentages}/>
         <label>Yellow</label> <input type="text" style={{ width: '40px', padding: '3px'}} value={this.state.yellow} placeholder="percentForYellow" id='yellow' onChange={this.changeTempPercentages}/>
         <label>Orange</label> <input type="text" style={{ width: '40px', padding: '3px'}} value={this.state.orange} placeholder="percentForOrange" id='orange' onChange={this.changeTempPercentages}/>
          <input type="button" onClick={this.updateTree} value="Submit"></input>
        </div>
      </form>
    )
  }
}

export default PercentColorInput;
