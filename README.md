<p align="center">
  <img width="390" height="134" src="https://user-images.githubusercontent.com/35183001/51876992-720b6180-2338-11e9-9d85-faa80c1e4572.png">
</p>
<h4 align="center">Visualize your React application's component performance metrics with a live heat map.</h4>
<p align="center">
<img src="https://img.shields.io/badge/release-beta-yellow.svg?style=plastic">
<img src="https://img.shields.io/badge/contributions-welcome-green.svg?style=plastic">
 <p>

___

<h2>What It Does</h2>
<p>React Quantum parses through your React application to create a color-coded tree model of its component hierarchy. On hover, each tree node will display two key component performance metrics&mdash;render time and re-render frequency&mdash;as well as memoized state and props to indicate what, specifically, initiated the render. 

The beauty is in the heat map: Nodes will change color depending on the component's rendering performance, making it easy to pinpoint possible bottlenecks at a glance. :fire:</p>

![Demo]<iframe src='https://gfycat.com/ifr/JoyousThunderousImpala' frameborder='0' scrolling='no' allowfullscreen width='640' height='444'></iframe>

<h2>How To Get It</h2>
<p>Quantum will soon be available as an extension through the Google Chrome Web Store.<br>
  
In the meantime, local setup instructions are as follows:</p>

1. `$ git clone https://github.com/ReactQuantum/ReactQuantum.git`

2. `$ cd ReactQuantum`

3. `$ npm install`

4. `$ npm run build-dev`

5. Visit chrome://extensions/

6. Click the Load Unpacked button, then select your './ReactQuantum/build' directory

7. Open Chrome Developer Tools (Inspect) on any page that uses React, then click on `React Quantum` at the top of the Developer Tools panel

8. Click the `Start Quantum` button, then refresh the page or set state to trigger a re-render

9. Optimize components!

**NOTE: React Quantum works best for React v16+ local projects in development environments.**

<h2>Definitions</h2>

| Term | Definition |
| --- | --- |
| Render | When a React component instance or DOM element is processed and checked to see if work needs to be done.  |
| Total render time | Total time a component took to render, including its children. |
| Individual render time | Total time an individual component instance or DOM element took to render. |
| Current State | The current state of a component. Only stateful nodes will have a value for this property. |
| Props | The current props object being passed to this node. |
| Commit Count | The number of times a node’s work has started in the commit phase. This could be changes to a component’s state or props, or a DOM element being added or removed. |


<h2>Contribute</h2>
Feel free to fork this repo and submit pull requests. If you'd like to report bugs or send suggestions, please log an issue or contact us at 
<a href="mailto:react.quantum@gmail.com">react.quantum@gmail.com</a>.

<h2>Team</h2>
<p>Altai Chiang (https://github.com/alchi126)</p>
<p>Alyson Swerdloff (https://github.com/alyswerdlova)</p>
<p>Eric Choy (https://github.com/Silly-Turtle)</p>
<p>Jae Park (https://github.com/wjp241)</p>
  

