import React, { Suspense } from 'react';
// const Tree = React.lazy(() => import('react-d3-tree'));
import styled from 'styled-components';
import PercentColorInput from './PercentColorInput';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import SVGChart from './Shit.js';

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

class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div id="treeWrapper" style={{ width: '100%', height: '60em', float: 'right', border: '0.5px solid #ababab', margin: '10px', boxShadow: '1.5px 1.5px 1.5px 1.5px #ababab' }}>
          {this.props.treeData === null ? null : <SVGChart treeData={this.props.treeData}></SVGChart>

          }
        </div>
      </div>

    );
  }
}


export default TreeComponent
