
function get(index: number, active: number) {
  if (index < active) {
    return 'finish';
  }
  if (index === active) {
    return 'process';
  }

  return 'inactive';
}

export default get;
