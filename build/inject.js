let x = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
let a = x._fiberRoots
let k = Object.keys(a)[0]
let set = a[k]
for (let i of set.keys()) {
  console.log(i.current)
}