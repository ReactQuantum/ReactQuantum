import React from 'react';
import styled from 'styled-components';

const StatsStyled = styled.div`
  color: #595959;
  text-shadow: 1px 1px 2px #a3a3a3; 
  font-size: 8px;
  font-family: "Trebuchet MS";
  margin: 1em;
  padding: 0.25em 1em;
  width: 35%;
  height: auto;
  text-align: left;
  float: left;
`;

class Stats extends React.Component {
    constructor(props) {
      super(props);
   }



    render() {
        return (
<<<<<<< HEAD
        <div>
          <h1>Component Name: <br/>{this.props.stats.name}</h1>
          <h1>Total Render Time: <br/>{this.props.stats.totalTime}</h1>
          <h1>Individual Render Time: <br/>{this.props.stats.individualTime}</h1>
        </div>
=======
          <StatsStyled>          
              <h1>Component Name: {this.props.stats.name}</h1>
              <h1>Total Render Time: {this.props.stats.totalTime}</h1>
              <h1>Individual Render Time: {this.props.stats.individualTime}</h1>
          </StatsStyled>
>>>>>>> dev
      )

    }
  }

  export default Stats
