var a = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0]
var current
for (let i of a.values()) {
  current = i.current
}

let nextUnitOfWork = current;
let pushTarget = filter(current);
let prev
let temp = [pushTarget];
console.log(current);
function workLoop() {
  //as long as there's nextUnitOfWork, continue the loop
  while (nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  delete temp[0].return
  console.log(temp)
  console.log(JSON.stringify(temp));
}

function performUnitOfWork(workInProgress) {
  //begin work on current fiber and next becomes its child
  let next = beginWork(workInProgress);
  if (next === null) {
    //if there is no child, current fiber is the last child. Pass it into completeUnitOfWork
    next = completeUnitOfWork(workInProgress);
  }
  //return next to workLoop
  return next;
}

function beginWork(workInProgress) {
  //perform work and return next (child/sibling/parent's sibling) fiber to perform work on
  let pushedFiber = pushTarget;
  if (workInProgress.child !== null && pushTarget.children[0] === undefined) {
    pushedFiber = filter(workInProgress.child);
    pushTarget.children.push(pushedFiber);
    pushTarget = pushedFiber;
  } else if (workInProgress.sibling !== null) {
    pushTarget = pushTarget.return;
    pushedFiber = filter(workInProgress.sibling);
    pushTarget.children.push(pushedFiber);
    // delete pushTarget.return
  } else if (workInProgress.return.sibling !== null) {
    //if it doesn't have child and sibling, it's time to process its parent's sibling
    //its parent and sibling have the same parent.
    //so push the sibling to the parent's return property,
    pushTarget = pushTarget.return;
    pushedFiber = filter(workInProgress.return.sibling);
    pushTarget.children.push(pushedFiber);
    pushTarget = pushedFiber;

  } else if (workInProgress.sibling === null) {
    pushTarget = pushTarget.return;
  }


  return workInProgress.child;
}

function delChildReturn(arr) {
  for (let i = 0; i < arr.length; i++) {
    delete arr[i].return
  }
}

function filter(fiber) {
  let { actualDuration, elementType, sibling, stateNode } = fiber;
  let name = elementType
  if (elementType !== null) {
    if (typeof elementType === "function") {
      name = elementType.name;
    } else if (typeof elementType === "object") {
      name = elementType.displayName;
    }
  } else {
    if (stateNode) {
      if (stateNode.containerInfo) {
        name = stateNode.containerInfo.id
      }
      name = stateNode.nodeNames
    } else {
      name = "Unknown"
    }
  }

  let filteredFiber = {
    name: name,
    renderTime: actualDuration,
    children: []
  };
  if (fiber.return !== null) {
    filteredFiber.return = pushTarget;
  } else {
    filteredFiber.return = null;
  }

  return filteredFiber
}

function completeUnitOfWork(workInProgress) {
  //this while loop iterates until there's no returnFiber or root has been reached.
  while (true) {
    let returnFiber = workInProgress.return;
    let siblingFiber = workInProgress.sibling;
    //set nextUnitOfWork to null
    nextUnitOfWork = completeWork(workInProgress);
    if (siblingFiber !== null) {
      // If there is a sibling, return it to perform work for this sibling
      return siblingFiber;
    } else if (returnFiber !== null) {
      // If there's no more work in this returnFiber, continue the loop to complete the returnFiber.
      if (returnFiber.return !== null && returnFiber.return.sibling === null && pushTarget.return !== null) {
        if (pushTarget.children[0] !== undefined && pushTarget.children[0].return === undefined) {
          pushTarget = pushTarget.return
        }
      }
      if (returnFiber.return !== null && returnFiber.return.sibling !== null) {
        pushTarget = pushTarget.return
        continue
      }
      workInProgress = returnFiber;

      continue;
    } else {
      // We've reached the root.
      return null;
    }
  }
}

function completeWork(workInProgress) {
  if (pushTarget !== null && pushTarget.children[0] !== undefined) {
    delChildReturn(pushTarget.children)
  }
  return null;
}
workLoop();
