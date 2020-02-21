/**
 * Well really, its utils and constants
 */

 
/**  Size of the individual cube */
const CUBE_SIZE = 0.5;
/** How many rows/colums the cube has */
const RUBIX_AMOUNT = 3;
/** Color by group
 * Top, right, bottom, left, front, back
 */
const GROUP_COLORS = {
  0: "#FFFFFF",
  1: "#b71234",
  2: "#ffd500",
  3: "#ff5800",
  4: "#009b48",
  5: "#0046ad"
};
/** Key for cube to keep prev location ref */
const __prev__ = Symbol("prev-position");
const __next__ = Symbol("next-position");
/** Keeps numbers in check by rounding to nearest 0.5 */
function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
/** Converts HEX to RGB */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ]
    : null;
}

/** Rotation Matrix */
const rotation = Math.PI / 2;
function rotationMatrixZ(invert = 1) {
  const rMatrixZ = new Matrix4();
  rMatrixZ.set(
    Math.cos(rotation * invert),
    -Math.sin(rotation * invert),
    0,
    0,
    Math.sin(rotation * invert),
    Math.cos(rotation * invert),
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  );
  return rMatrixZ;
}
function rotationMatrixX(invert = 1) {
  const rMatrixX = new Matrix4();
  rMatrixX.set(
    1,
    0,
    0,
    0,
    0,
    Math.cos(rotation * invert),
    -Math.sin(rotation * invert),
    0,
    0,
    Math.sin(rotation * invert),
    Math.cos(rotation * invert),
    0,
    0,
    0,
    0,
    1
  );
  return rMatrixX;
}
function rotationMatrixY(invert = 1) {
  const rMatrixY = new Matrix4();
  rMatrixY.set(
    Math.cos(rotation * invert),
    0,
    Math.sin(rotation * invert),
    0,
    0,
    1,
    0,
    0,
    -Math.sin(rotation * invert),
    0,
    Math.cos(rotation * invert),
    0,
    0,
    0,
    0,
    1
    //   Math.sin(rotation * invert),
    //   Math.cos(rotation * invert),
  );
  return rMatrixY;
}

function getCubeType(position) {
  const [x, y, z] = position;
  if (x === 0.5 && y === 0.5) return "center";
  else if ((x === 0 || x === 1) && (y === 0 || y === 1)) return "corner";
  else return "edge";
}

export default {
    CUBE_SIZE,
RUBIX_AMOUNT,
GROUP_COLORS,
cubeRefs,
__prev__,
__next__,
roundHalf,
hexToRgb,
rotation,
rotationMatrixZ,
rotationMatrixX,
rotationMatrixY,
getCubeType
}