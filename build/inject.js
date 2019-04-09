import extractFiber from './extractFiber.js'
import filter from './filter.js'

(current => {
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

})(extractFiber())






