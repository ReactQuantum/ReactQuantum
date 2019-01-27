var hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0]
var current
for (let i of hookedTree.values()) {
  current = i.current
}

var nextUnitOfWork = current;
var pushTarget = filter(current);
var temp = [pushTarget];
var targ = filter(current)
var arr = [targ];
var curr

function filter(fiber) {
  let { actualDuration, elementType, stateNode, memoizedState, pendingProps } = fiber;
  let name = elementType
  if (elementType !== null && elementType.name !== "") {
    if (typeof elementType === "function") {
      name = elementType.name;
    } else if (typeof elementType === "object") {
      name = elementType.displayName;
    }
  } else if (stateNode) {
    if (stateNode.containerInfo) {
      name = stateNode.containerInfo.id
    }
    name = stateNode.nodeName
  }

  if (name === undefined || name === "" || name === null) {
    name = "Unknown"
  }

  var filteredFiber = {
    name: name,
    renderTime: actualDuration === undefined ? "Only available in Dev Mode" : actualDuration,
    children: [],
    return: fiber.return !== null ? targ : null,
    sibling: null,
    memoizedState: memoizedState,
    pendingProps: pendingProps
  };

  return filteredFiber
}

function createChild(workInProgress) {
  //3.create a child
  let next = workInProgress
  let bottomFiber
  //as long as there's child(next)
  while (next !== null) {
    //filter the child(next)
    curr = filter(next);
    //and push it into the children array of its parent(targ)
    targ.children.push(curr);
    let targSib = curr;
    let lastSib;
    //if the child(next) has a sibling,
    if (next.sibling !== null) {
      let nextSib = next.sibling
      while (nextSib !== null) {
        //filter the sibling
        let filtSib = filter(nextSib)
        //assign it as sibling of the child(next)
        targSib.sibling = filtSib
        // siblings have same parent(targ); push it to parent's children array
        targ.children.push(filtSib);
        //remember the last sibling worked on
        lastSib = nextSib
        //this loops if current sibling also has a sibling, otherwise loop breaks.
        targSib = targSib.sibling
        nextSib = nextSib.sibling
      }
      //the last sibling won't have a sibling; thus, null.
      targSib.sibling = null;
    }
    //the current child becomes the target
    targ = curr;
    //if there's no next child;
    if (next.child === null) {
      //check if there's a sibling;
      if (next.sibling !== null) {
        //if so, bottomFiber is the lastSibling
        bottomFiber = lastSib;
      } else {
        //else bottomFiber is current child
        bottomFiber = next;
      }
    }
    next = next.child;
  }
  return bottomFiber;
}

function createTree(workInProgress) {
  // 1.next is current fiber's child
  let next = workInProgress.child
  let keepClimb = true;
  let keepCreateChild = true;
  while (keepCreateChild) {
    //2.pass in child fiber to createChild function
    let bottomFiber = createChild(next);
    let climber = bottomFiber;
    let climberSib
    //if bottomfiber has a child go back into the loop
    if (climber.child !== null) {
      climberSib = climber.child;
    }
    while (keepClimb) {
      if (climberSib !== undefined) {
        targ = targ.sibling;
        next = climberSib;
        break;
      }
      //if bottomFiber has a parent
      if (climber.return !== null) {
        //if the parent has a sibling
        if (climber.return.sibling !== null && climber.return.sibling.child !== null) {
          // break the loop and process the child of that sibling.
          targ = targ.return.sibling;
          next = climber.return.sibling.child;
          break;
        } else {
          //otherwise, keep climbing up the parent
          if (targ !== null) {
            targ = targ.return
            climber = climber.return
            if (targ.return === null && climber.return === null) {
              keepClimb = false;
              keepCreateChild = false;
            }
          }
        }
      }
    }
  }

  //deleting circular references
  var noCirc = JSON.stringify(arr, function (key, val) {
    if (!Array.isArray(val) && val !== null && typeof val === "object") {
      delete val["return"]
    }
    return val
  }
  )
  window.postMessage({
    name: "inject",
    data: noCirc
  })
  return noCirc;
}

createTree(current)






// if (set) {
//   for (let i of set.keys()) {
//     console.log(i.current)
//   }
// } else {
//   console.log('can\'t hook to react')
// }
