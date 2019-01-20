let hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0]
let current
for (let i of hookedTree.values()) {
  current = i.current
}

let targ = filter(current)
let arr = [targ];
let curr

function filter(fiber) {
  let { actualDuration, elementType, stateNode } = fiber;
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
      name = stateNode.nodeName
    } else {
      name = "Unknown"
    }
  }

  let filteredFiber = {
    name: name,
    renderTime: actualDuration,
    children: [],
    sibling: null
  };

  if (fiber.return !== null) {
    filteredFiber.return = targ;
  } else {
    filteredFiber.return = null;
  }

  return filteredFiber
}

function createChild(workInProgress) {
  //3.create a child
  let next = workInProgress
  let bottomFiber
  //as long as there's a child
  while (next !== null) {
    //filter the child
    curr = filter(next);
    //push it into parent's children array
    targ.children.push(curr);
    let targSib = curr;
    let lastSib;
    //create a linked list of its siblings of that child,
    if (next.sibling !== null) {
      let nextSib = next.sibling
      while (nextSib !== null) {
        //filter the sibling
        let filtSib = filter(nextSib)
        //assign it as sibling of the child
        targSib.sibling = filtSib
        // siblings have same parent; push it to the children array of the child's parent
        targ.children.push(filtSib);
        //remember the last sibling to keep track of last fiber worked on
        lastSib = nextSib
        //next loop, the current sibling's sibling will be processed
        //to become sibling property of current sibling
        targSib = targSib.sibling
        nextSib = nextSib.sibling
      }
      //the last sibling doens't have a sibling; therefore, null.
      targSib.sibling = null;
    }
    //the current child becomes the target
    targ = curr;
    //if there is no next child;
    if (next.child === null) {
      //and current child had a sibling;
      if (next.sibling !== null) {
        //bottomFiber is the lastSibling
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
    //if next is null, there's no sibling, it has to climb back up to parent
    //but if parent has a sibling it has to climb to that sibling.
    //iterate until there is a parent that has a sibilng
    let climber = bottomFiber;
    while (keepClimb) {
      if (climber.return !== null) {
        if (climber.return.sibling !== null && climber.return.sibling.child !== null) {
          //if there's parent with sibling;
          //stop climbing and break the loop;
          //process the child of that sibling.
          targ = targ.return.sibling;
          next = climber.return.sibling.child;
          break;
        } else {
          //otherwise, keep climbing up
          if (targ !== null) {
            targ = targ.return
            //                        next = climber.return;
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

  return arr;
}

createTree(current)
