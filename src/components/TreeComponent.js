import React from 'react';
import Tree from 'react-d3-tree';


const test1 = {
  name: 'Level 2: C',
  children: [{name: 'Level 3C: A', stats: '101ms'},
  {name: 'Level 3C: B', stats: '102ms', nodeSvgShape: {shapeProps: {width: 20, height: 20, x: -10, y: -10, fill: 'green'}}},
  {name: 'Level 3C: C', stats: '103ms'},
  {name: 'Level 3C: D', stats: '120ms'},
  {name: 'Level 3C: E', stats: '1111ms'}]
};


const test2 = {
  name: 'test 2 Level 2: C',
  children: [{name: 'Level 3C: A', stats: '101ms'},
  {name: 'Level 3C: B', stats: '102ms'},
  {name: 'Level 3C: C', stats: '103ms'},
  {name: 'Level 3C: D', stats: '120ms'},
  {name: 'Level 3C: E', stats: '1111ms'}]
};

const test3 = [{name: 'root',
"children":[
  {"name":"o",
  "children":[
    {"name":"n",
    "children":[
      {"name":"z",
      "children":[
        {"name":"Base.Consumer",
        "children":[
          {"name":"N",
          "children":[
            {"name":"Location.Consumer",
            "children":[
              {"name":"t",
              "children":[
                {"name":"Location.Provider","children":[
                  {"name":"t",
                  "children":[
                    {"name":"Base.Provider",
                    "children":[
                      {"name":"D",
                      "children":[
                        {"name":"Focus.Consumer",
                        "children":[
                          {"name":"t",
                          "children":[
                            {"name":"div",
                            "children":[
                              {"name":"Focus.Provider",
                              "children":[
                                {"name":"n",
                                "children":[
                                  {"name":"t",
                                  "children":[
                                    {"name":"t",
                                    "children":[
                                      {"name":"t",
                                      "children":[
                                        {"name":"t",
                                        "children":[
                                          {"name":"u",
                                          "children":[
                                            {"name":"i",
                                            "children":[
                                              {"name":"div",
                                              "children":[
                                                {"name":"",
                                                "children":[{"name":"header","children":[{"name":"","children":[{"name":"div","children":[{"name":"div","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"img","children":[]},{"name":"span","children":[]}]}]}]}]}]}]}]},{"name":"","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]},{"name":"span","children":[]}]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]}]},{"name":"form","children":[{"name":"input","children":[]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]},{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]}]}]}]}]}]}]}]}]},{"name":"div","children":[{"name":"","children":[{"name":"o","children":[{"name":"div","children":[{"name":"","children":[{"name":"e","children":[{"name":"e","children":[{"name":"","children":[]}]}]}]},{"name":"","children":[{"name":"div","children":[{"name":"div","children":[{"name":"o","children":[{"name":"article","children":[{"name":"","children":[{"name":"o","children":[{"name":"header","children":[{"name":"h1","children":[]}]}]}]},{"name":"div","children":[]},{"name":"div","children":[]},{"name":"a","children":[]}]}]}]}]},{"name":"n","children":[{"name":"div","children":[{"name":"div","children":[{"name":"div","children":[{"name":"n","children":[{"name":"o","children":[{"name":"nav","children":[{"name":"n","children":[{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"span","children":[]},{"name":"#text","children":[]}]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"div","children":[{"name":"button","children":[{"name":"","children":[{"name":"div","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"li","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[{"name":"#text","children":[]}]}]}]}]}]}]},{"name":"","children":[{"name":"div","children":[{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]},{"name":"svg","children":[{"name":"g","children":[{"name":"path","children":[]}]}]}]}]}]}]},{"name":"div","children":[{"name":"","children":[{"name":"div","children":[{"name":"o","children":[{"name":"ul","children":[{"name":"o","children":[{"name":"li","children":[]},{"name":"o","children":[{"name":"li","children":[{"name":"div","children":[{"name":"d","children":[{"name":"div","children":[]},{"name":"div","children":[{"name":"u","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},{"name":"footer","children":[{"name":"","children":[{"name":"div","children":[{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"div","children":[]},{"name":"Unknown","children":[{"name":"","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]}]}]}]}]},{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"div","children":[]},{"name":"","children":[{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]}]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]},{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"div","children":[]},{"name":"Unknown","children":[{"name":"","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]}]}]}]},{"name":"div","children":[{"name":"div","children":[{"name":"","children":[{"name":"div","children":[]},{"name":"","children":[{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"t","children":[{"children":[{"name":"Base.Consumer","children":[{"name":"N","children":[{"name":"Location.Consumer","children":[{"name":"a","children":[]}]}]}]}]}]}]},{"name":"a","children":[{"name":"#text","children":[]},{"name":"","children":[]},{"name":"svg","children":[{"name":"path","children":[]},{"name":"polygon","children":[]}]}]}]},{"name":"a","children":[{"name":"img","children":[]},{"name":"p","children":[]}]}]}]

const myTreeData = test1;


const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 20,
    height: 20,
    x: -10,
    y: -10,
    fill: 'blue'
  }
}

const svgEllipse = {
  shape:'ellipse',
  shapeProps: {
    rx: 20,
    ry: 10
  }
}
//function to be put in componentWillUpdate to change render times into individual render times and add color property accordingly
// function colorParseTree (objInArr) {
//   for (var i = 0; i < objInArr.length; i++) {
//     if (CONDITION ABOUT SPEED) {
//       objectInArr[i].nodeSvgShape =
//     }
//   }
// }



class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOver = this.mouseOver.bind(this);
    this.state = {shape: svgSquare};
  }

  mouseOver(e) {
    let stats = {name: e.name, time: e.time};
    this.props.grabNodeStats(stats);
  }



  //parse through next props to add color property base one render time relative to total render time
  // componentWillUpdate (nextProps, nextState) {
  // }

  render() {

    return (

      <div id="treeWrapper" style={{width: '100%', height: '100em'}}>

        <Tree
          translate={{x: 300, y: 100}}
          orientation={this.props.orientation}
          onMouseOver={this.mouseOver}
          nodeSvgShape={this.state.shape}
          separation={{siblings: .6,nonSiblings: .6}}
          data={this.props.treeData}
        />

      </div>

    );
  }
}


export default TreeComponent;
