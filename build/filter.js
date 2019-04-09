export const filter = fiber => {
  const { actualDuration, elementType } = fiber;
  let name;
  if (elementType !== null) name = typeof elementType === 'function' ? elementType.name : elementType.displayName;
  if (name === undefined || name === '' || name === null) name = 'Unknown';

  const filteredFiber = {
    name,
    renderTime: actualDuration === undefined ? 'Only Available in Dev Mode' : actualDuration,
    child: fiber.child,
    sibling: fiber.sibling
  };

  return filteredFiber;
}
