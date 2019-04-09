export const extractFiber = () => {
  const hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0];
  let current
  for (let i of hookedTree.values()) {
    current = i.current;
  }
  console.log(current)
  return current;
}

