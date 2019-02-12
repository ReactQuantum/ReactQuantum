// This is the file that gets appended to the DOM of the user's application;
// Algorithms in this file are responsible for deep cloning, filtering, diffing, and serializing the React Fiber tree extracted from the user's React application

// Deep clones the Fiber tree extracted from the user's React application
function deepClone(obj) {
  var visitedNodes = [];
  var clonedCopy = [];
  function clone(item) {
    if (typeof item === "object" && !Array.isArray(item) && item !== null) {
      if (visitedNodes.indexOf(item) === -1) {
        visitedNodes.push(item);
        var cloneObject = {};
        // To be addressed: delete item.memoizedProps;
        clonedCopy.push(cloneObject);
        for (var i in item) {
          if (item.hasOwnProperty(i)) {
            cloneObject[i] = clone(item[i]);
          }
        }

        return cloneObject;
      } else {
        return clonedCopy[visitedNodes.indexOf(item)];
      }
    }
    else if (typeof item === "object" && Array.isArray(item)) {
      if (visitedNodes.indexOf(item) === -1) {
        var cloneArray = [];
        visitedNodes.push(item);
        clonedCopy.push(cloneArray);
        for (var j = 0; j < item.length; j++) {
          cloneArray.push(clone(item[j]));
        }
        return cloneArray;
      } else {
        return clonedCopy[visitedNodes.indexOf(item)];
      }
    }

    return item; 
  }
  return clone(obj);
}

// Extracting the Fiber tree from React application and initiating cloning process
function pullAndCloneTree() {
  const hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0];
  let current;
  for (let i of hookedTree.values()) {
    current = i.current;
  }
  let treeToFilter;
  let clonedTree = deepClone(current);
  let initiallyRendered = JSON.parse(sessionStorage.getItem("initiallyRendered"));
  if (initiallyRendered !== null) {
    treeToFilter = diffing(clonedTree)
  } else {
    sessionStorage.setItem("initiallyRendered", "true");
    treeToFilter = clonedTree;
  }
  filterDelCirc(treeToFilter);
}

// We are using the current and previous cloned Fiber trees and their effect tag properties to update render frequency

function diffing(newTree) {
  let nextUnitOfWork = newTree;
  function workLoop() {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    return newTree
  }


  function performUnitOfWork(workInProgress) {
    let next = beginWork(workInProgress);
    if (next === null) {
      next = completeUnitOfWork(workInProgress);
    }
    return next;
  }

  function beginWork(workInProgress) {
    let newEffect = workInProgress.effectTag;
    if (newEffect === 0 || newEffect === 2) {
      workInProgress.commitCount = 1;
    } else if (newEffect === 3 || newEffect === 4) {
      workInProgress.commitCount = workInProgress.alternate.commitCount + 1;
    }
    if (workInProgress.child !== null) {
    }
    return workInProgress.child;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      let returnFiber = workInProgress.return;
      let siblingFiber = workInProgress.sibling;
      nextUnitOfWork = completeWork(workInProgress);
      if (siblingFiber !== null) {
        return siblingFiber;
      } else if (returnFiber !== null) {
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
  return workLoop();
}

// This function filters out properties associated with render metrics; deletes circular references for serialization
function filterDelCirc(tree) {

  let targ = filter(tree)
  const arr = [targ];
  let curr;

  function filter(fiber) {
    let { actualDuration, commitCount, elementType, memoizedState, pendingProps } = fiber;
    let name = elementType;
    if (elementType !== null) {
      if (typeof elementType === 'function') {
        name = elementType.name;
      } else if (typeof elementType === 'object') {
        name = elementType.displayName;
      }
    }
    if (name === undefined || name === '' || name === null) {
      name = 'Unknown';
    }

    if (pendingProps) {
      if (Object.keys(pendingProps).includes('children')) {
        delete pendingProps.children;
      }
    }

    let filteredFiber = {
      name,
      renderTime: actualDuration === undefined ? 'Only available in Dev Mode' : actualDuration,
      commitCount: commitCount,
      memoizedState: memoizedState,
      props: pendingProps,
      children: [],
      return: fiber.return !== null ? targ : null,
      sibling: null,

    };

    return filteredFiber;
  }

  function createChild(workInProgress) {

    let next = workInProgress;
    let bottomFiber;
    while (next !== null) {
      curr = filter(next);
      targ.children.push(curr);
      let targSib = curr;
      let lastSib;
      if (next.sibling !== null) {
        let nextSib = next.sibling;
        while (nextSib !== null) {
          const filtSib = filter(nextSib);
          targSib.sibling = filtSib;
          lastSib = nextSib;
          targ.children.push(filtSib);
          targSib = targSib.sibling;
          nextSib = nextSib.sibling;
        }
      }
      targ = curr;
      if (next.child === null) {
        if (next.sibling !== null) {
          let lastChSib = next.sibling;
          let lastChTarg = targ.sibling;
          while (lastChSib !== null) {
            if (lastChSib.child !== null) {
              targ = lastChTarg;
              bottomFiber = lastChSib;
              break;
            }
            lastChTarg = lastChTarg.sibling;
            lastChSib = lastChSib.sibling;
          }
          if (lastChSib === null) {
            bottomFiber = lastSib;
          }

        } else {
          bottomFiber = next;
        }
      }
      next = next.child;
    }
    return bottomFiber;
  }

  function createTree(workInProgress) {
    let next = workInProgress.child;
    let keepClimb = true;
    let keepCreateChild = true;
    while (keepCreateChild) {
      const bottomFiber = createChild(next);
      let climber = bottomFiber;
      let climberSib;
      if (climber.child !== null) {
        climberSib = climber.child;
      }
      while (keepClimb) {
        if (climberSib !== undefined) {
          targ = targ;
          next = climberSib;
          break;
        }
        if (climber.return !== null) {
          if (climber.return.sibling !== null) {
            let parentSib = climber.return.sibling;
            let parentTarg = targ.return.sibling;
            if (parentSib !== null || parentTarg !== null) {
              while (parentSib !== null) {
                if (parentSib.child !== null) {
                  targ = parentTarg;
                  next = parentSib.child;
                  break;
                }
                parentTarg = parentTarg.sibling;
                parentSib = parentSib.sibling;
              }
            }

            if (parentSib === null) {
              targ = targ.return;
              climber = climber.return;
            } else {
              break;
            }
          }
          if (targ !== null) {
            targ = targ.return;
            climber = climber.return;
            if (targ.return === null && climber.return === null) {
              keepClimb = false;
              keepCreateChild = false;
            }
          }
        }
      }
    }

    // deleting circular JSON references
    const noCirc = JSON.stringify(arr, (key, val) => {
      if (!Array.isArray(val) && val !== null && typeof val === 'object') {
        delete val.return;
      }
      return val;
    });

    window.postMessage({
      name: 'inject',
      data: noCirc,
    });
  }

  createTree(tree)
}

pullAndCloneTree();