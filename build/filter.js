export const filter = fiber => {
  if (!fiber) return fiber
  const { actualDuration, elementType, child, sibling } = fiber;
  let name;
  if (elementType !== null) {
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
