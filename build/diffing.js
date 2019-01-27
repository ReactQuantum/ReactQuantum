function getTree() {
  let hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0];
  let current
  for (let i of hookedTree.values()) {
    current = i.current
  }
  return current;
}

var current = getTree()
///use above to get the current tree

//use below to get the updated tree
var updated = getTree()
var nextUnitOfWork = updated;

function workLoop() {

  while (nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

}

function performUnitOfWork(workInProgress) {
  let next = beginWork(current, workInProgress);
  if (next === null) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}

function beginWork(current$$, workInProgress) {
  console.log("beginWork current vs wIP---------", current$$, workInProgress)
  let oldProps = current$$.memoizedProps;
  let newProps = workInProgress.pendingProps;
  console.log("comparing old and new", oldProps, newProps)

  if (workInProgress.child !== null) {
    current = current.child;
  }

  return workInProgress.child;
}

function completeUnitOfWork(workInProgress) {
  while (true) {
    let returnFiber = workInProgress.return;
    let siblingFiber = workInProgress.sibling;
    nextUnitOfWork = completeWork(workInProgress);
    if (siblingFiber !== null) {
      current = current.sibling;
      return siblingFiber;
    } else if (returnFiber !== null) {
      current = current.return;
      workInProgress = returnFiber;
      continue;
    } else {
      return null;
    }
  }
}

function completeWork(workInProgress) {
  return null;
}

workLoop()

