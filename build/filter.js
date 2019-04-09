export const filter = fiber => {
  let { actualDuration, elementType } = fiber;
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


  let filteredFiber = {
    name,
    renderTime: actualDuration === undefined ? 'Only available in Dev Mode' : actualDuration,
    children: [],
    return: fiber.return !== null ? targ : null,
    sibling: null,
  };

  return filteredFiber;
}
