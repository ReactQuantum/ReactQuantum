import React from 'react';

class Stats extends React.Component {
    constructor(props) {
      super(props);
   }



    render() {
        return (
        <div>
          <h1>Component Name: {this.props.stats.name}</h1>
          <h1>Render Time: {this.props.stats.time}</h1>
        </div>
      )

    }
  }

  export default Stats
