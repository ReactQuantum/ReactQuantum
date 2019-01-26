import React from 'react';

class Stats extends React.Component {
    constructor(props) {
      super(props);
   }



    render() {
        return (
        <div>
          <h1>Component Name: <br/>{this.props.stats.name}</h1>
          <h1>Total Render Time: <br/>{this.props.stats.totalTime}</h1>
          <h1>Individual Render Time: <br/>{this.props.stats.individualTime}</h1>
        </div>
      )

    }
  }

  export default Stats
