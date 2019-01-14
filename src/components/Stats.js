import React from 'react';

class Stats extends React.Component {
    constructor(props) {
      super(props);
   }

    
  
    render() {
        return (
        <div>
           <h1>{this.props.stats}</h1> 
        </div>
      )
        
    }
  }

  export default Stats