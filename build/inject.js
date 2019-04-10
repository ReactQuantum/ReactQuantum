
(() => {
  const extractFiber = () => {
    const hookedTree = Object.values(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._fiberRoots)[0];
    let current
    for (let i of hookedTree.values()) {
      current = i.current;
    }
    return current;
  }

  const filter = fiber => {
    if (!fiber) return fiber;

    const { actualDuration, elementType, child, sibling } = fiber;
    let name;
    if (elementType !== null) {
      if (typeof elementType === 'string') name = elementType.name;
      if (typeof elementType === 'function') name = elementType.name;
      if (typeof elementType === 'object') name = elementType.displayName;
    }

    if (name === undefined || name === '' || name === null) name = 'Unknown';

    const filteredFiber = {
      name,
      renderTime: actualDuration ? 'Only available in Dev Mode' : actualDuration,
      child,
      sibling: filter(sibling)
    };

    return filteredFiber;
  }

  const current = extractFiber();
  const root = filter(current);
  const d3 = fiber => {
    if (fiber.child === null) return fiber;
    const child = vertical(fiber);
    const arr = horizontal(child);
    fiber.child = arr;
    let i = arr.length - 1;
    while (i >= 0) {
      d3(arr[i]);
      i--;
    }
    return fiber;
  }

  const vertical = fiber => {
    let nthCh = fiber;
    nthCh = fiber.child;
    return nthCh;
  }

  const horizontal = fiber => {
    let nthSib = filter(fiber);
    const arr = [nthSib];
    while (nthSib.sibling) {
      nthSib = nthSib.sibling;
      arr.push(nthSib);
    }
    return arr;
  }
  d3(root);

  window.postMessage({
    name: 'inject',
    data: JSON.stringify(root),
  });

})()






