 
/**  Size of the individual cube */
export const CUBE_SIZE = 0.5;
/** How many rows/colums the cube has */
export const RUBIX_AMOUNT = 3;
/** Color by group
 * Top, right, bottom, left, front, back
 */
export const GROUP_COLORS = {
  0: "#FFFFFF",
  1: "#b71234",
  2: "#ffd500",
  3: "#ff5800",
  4: "#009b48",
  5: "#0046ad"
};
/** Key for cube to keep prev location ref */
export const __prev__ = Symbol("prev-position");
export const __next__ = Symbol("next-position");