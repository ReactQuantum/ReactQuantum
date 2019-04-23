import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import '../styles/Shit.css';

class SVGChart extends React.Component {

  render() {
    const div = new ReactFauxDOM.Element('div')


    //DOM manipulations done, convert to React
    return div.toReact()

  }

}

export default SVGChart
