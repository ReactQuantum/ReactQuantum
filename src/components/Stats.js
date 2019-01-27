import React from 'react';
import styled from 'styled-components';

const StatsStyled = styled.div`
  color: white;
  background-color: #a3a3a3;
  font-size: 12px;
  font-family: "Trebuchet MS";
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid #424242;
  width: 50%;
  height: 140px;
  -webkit-box-shadow: 4px 5px 10px 0px rgba(0,0,0,0.38);
-moz-box-shadow: 4px 5px 10px 0px rgba(0,0,0,0.38);
box-shadow: 4px 5px 10px 0px rgba(0,0,0,0.38);
border-radius: 8px 113px 8px 8px;
-moz-border-radius: 8px 113px 8px 8px;
-webkit-border-radius: 8px 113px 8px 8px;
border: 0.5px solid #000000;
`;

class Stats extends React.Component {
    constructor(props) {
      super(props);
   }



    render() {
        return (
          <StatsStyled>          
              <h1>Component Name: {this.props.stats.name}</h1>
              <h1>Total Render Time: {this.props.stats.totalTime}</h1>
              <h1>Individual Render Time: {this.props.stats.individualTime}</h1>
          </StatsStyled>
      )

    }
  }

  export default Stats
