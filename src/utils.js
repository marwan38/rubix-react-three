import {Matrix4} from 'three';

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

/** Rotation Matrix */
const rotation = Math.PI / 2;
const _matrix4 = new Matrix4();
export function rotationMatrixZ(invert = 1) {
  const rMatrixZ = _matrix4.clone();
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
export function rotationMatrixX(invert = 1) {
  const rMatrixX = _matrix4.clone();
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
export function rotationMatrixY(invert = 1) {
  const rMatrixY = _matrix4.clone();
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

/** Returns type of cubix. Ie: edge, corner, or center */
export function getCubeType(position) {
  const [x, y, z] = position;
  if (x === 0.5 && y === 0.5) return "center";
  else if ((x === 0 || x === 1) && (y === 0 || y === 1)) return "corner";
  else return "edge";
}