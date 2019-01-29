function pullAndCloneTree() {
  function deepClone(obj) {
    const visitedNodes = [];
    const clonedCopy = [];
    function clone(item) {
      if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
        if (visitedNodes.indexOf(item) === -1) {
          visitedNodes.push(item);
          const cloneObject = {};
          clonedCopy.push(cloneObject);
          if (Object.keys(item).includes('alternate')) {
            cloneObject._REACT_QUANTUM_render_count = 0;
          }

          for (let i in item) {
            if (item.hasOwnProperty(i)) {
              cloneObject[i] = clone(item[i]);
            }
          }
          return cloneObject;
        }
        return clonedCopy[visitedNodes.indexOf(item)];
      }
      if (typeof item === 'object' && Array.isArray(item)) {
        if (visitedNodes.indexOf(item) === -1) {
          const cloneArray = [];
          visitedNodes.push(item);
          clonedCopy.push(cloneArray);
          for (let j = 0; j < item.length; j += 1) {
            cloneArray.push(clone(item[j]));
          }
          return cloneArray;
        }
        return clonedCopy[visitedNodes.indexOf(item)];
      }

      return item; // not object, not array, therefore primitive
    }
    return clone(obj);
  }

  let currentTree;
  function getTree() {
    return new Promise(((resolve) => {
      const hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0];
      let current;
      for (let i of hookedTree.values()) {
        current = i.current;
      }
      console.log(current);

      let tree;

      currentTree = deepClone(current);
      tree = currentTree;

      resolve(tree);
    }));
  }
  getTree();

  return currentTree;
}

function treeConstruct(currentTree) {
  console.log('??????????????');
  const pushTarget = filter(currentTree);
  const temp = [pushTarget];
  let targ = filter(currentTree);
  const arr = [targ];
  let curr;


  // add
  function filter(fiber) {
    let {
      actualDuration, elementType, stateNode, memoizedState, memoizedProps, _REACT_QUANTUM_render_count,
    } = fiber;
    let name = elementType;
    if (elementType !== null) {
      if (typeof elementType === 'function') {
        name = elementType.name;
      } else if (typeof elementType === 'object') {
        name = elementType.displayName;
      }
    } else if (stateNode) {
      if (stateNode.containerInfo) {
        name = stateNode.containerInfo.id;
      }
      name = stateNode.nodeName;
    }

    if (name === undefined || name === '' || name === null) {
      name = 'Unknown';
    }

    if (memoizedProps) {
      memoizedProps = JSON.stringify(memoizedProps, (key, val) => {
        if (!Array.isArray(val) && val !== null && typeof val === 'object') {
          delete val.children;
        }
        return val;
      });
    }

    const filteredFiber = {
      name,
      renderTime: actualDuration === undefined ? 'Only available in Dev Mode' : actualDuration,
      children: [],
      return: fiber.return !== null ? targ : null,
      sibling: null,
      memoizedState,
      memoizedProps,
      _REACT_QUANTUM_render_count,
    };

    return filteredFiber;
  }

  function createChild(workInProgress) {
    // 3.create a child
    let next = workInProgress;
    let bottomFiber;
    // as long as there's child(next)
    while (next !== null) {
      // filter the child(next)
      curr = filter(next);
      // and push it into the children array of its parent(targ)
      targ.children.push(curr);
      let targSib = curr;
      const foundLastSib = false;
      let lastSib;
      // if the child(next) has a sibling,
      if (next.sibling !== null) {
        let nextSib = next.sibling;
        while (nextSib !== null) {
          // filter the sibling
          const filtSib = filter(nextSib);
          // assign it as sibling of the child(next)
          targSib.sibling = filtSib;
          lastSib = nextSib;
          // siblings have same parent(targ); push it to parent's children array
          targ.children.push(filtSib);
          // this loops if current sibling also has a sibling, otherwise loop breaks.
          targSib = targSib.sibling;
          nextSib = nextSib.sibling;
        }
      }
      // the current child becomes the target
      targ = curr;
      // if there's no next child;
      if (next.child === null) {
        // check if there's a sibling;
        // look for sibling that has a child
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
          // if there was no sibling with no child;
          if (lastChSib === null) {
            bottomFiber = lastSib;
          }
          // if so, bottomFiber is the lastSibling
        } else {
          // if sibling doesn't have child.
          // else bottomFiber is current child
          bottomFiber = next;
        }
      }
      next = next.child;
    }
    return bottomFiber;
  }

  function createTree(workInProgress) {
    // 1.next is current fiber's child
    let next = workInProgress.child;
    let keepClimb = true;
    let keepCreateChild = true;
    while (keepCreateChild) {
      // 2.pass in child fiber to createChild function
      const bottomFiber = createChild(next);
      let climber = bottomFiber;
      let climberSib;
      //       if bottomfiber has a child go back into the loop
      if (climber.child !== null) {
        climberSib = climber.child;
      }
      while (keepClimb) {
        if (climberSib !== undefined) {
          targ = targ;
          next = climberSib;
          break;
        }
        // if bottomFiber has a parent
        if (climber.return !== null) {
          // if the parent has a sibling
          //         if (climber.return.sibling !== null && climber.return.sibling.child !== null) {
          if (climber.return.sibling !== null) {
            // break the loop and process the child of that sibling.
            let parentSib = climber.return.sibling;
            let parentTarg = targ.return.sibling;
            // find the first sibling that has the child;
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
          // otherwise, keep climbing up the parent
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

    // deleting circular references
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

  createTree(currentTree);
}
treeConstruct(pullAndCloneTree());
