/** Keeps numbers in check by rounding to nearest 0.5 */
export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
/** Converts HEX to Normalized RGB */
export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ]
    : null;
}
/** Returns type of cubix. Ie: edge, corner, or center */
export function getCubeType(position) {
  const [x, y, z] = position;
  if (x === 0.5 && y === 0.5) return "center";
  else if ((x === 0 || x === 1) && (y === 0 || y === 1)) return "corner";
  else return "edge";
}