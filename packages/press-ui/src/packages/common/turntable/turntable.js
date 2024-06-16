export function getRotateAngle({
  prizeIndex,
  prizeTotal = 6,
  innerStartAngle = 0,
  laps = 3,
}) {
  const partSize = 360 / prizeTotal;
  const rotateAngle = innerStartAngle
        + laps * 360
        + partSize * prizeIndex
        - (innerStartAngle % 360);

  return rotateAngle;
}
