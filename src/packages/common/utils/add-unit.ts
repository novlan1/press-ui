
const REGEXP = /^-?\d+(\.\d+)?$/;

export function addUnit(value: any) {
  if (value == null) {
    return undefined;
  }
  return REGEXP.test(`${value}`) ? `${value}px` : value;
}

export default addUnit;
