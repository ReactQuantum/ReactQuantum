let hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0]
let current
for (let i of hookedTree.values()) {
  current = i.current
}
// if (nextUnitOfWork !== undefined) {
//   nextUnitOfWork = x
// } else {

//   let nextUnitOfWork = current;
//   let pushTarget = filter(current);
//   let prev
//   let temp = [pushTarget];

// }
//var port = chrome.runtime.connect('2035', { name: "inject-bg" });

var nextUnitOfWork = current;
var pushTarget = filter(current);
var prev
var temp = [pushTarget];


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
    renderTime: actualDuration === undefined ? "Only available in Dev Mode" : actualDuration,
    children: [],
    return: fiber.return !== null ? targ : null,
    sibling: null
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
    while (keepClimb) {
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
  let noCirc = JSON.stringify(arr, function (key, val) {
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
  console.log("temp in inject", noCirc);
  return noCirc;
}

createTree(current)







