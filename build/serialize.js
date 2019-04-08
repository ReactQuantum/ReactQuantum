export const serialize = () => {
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
