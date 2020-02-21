import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { Vector3, Matrix4, DoubleSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSprings, animated as a } from "react-spring/three";
import { keys, isPressed } from "./keys";
import CubixMaterial from "./material";
import {
  roundHalf,
  hexToRgb
} from "./utils";

import {
  CUBE_SIZE,
  RUBIX_AMOUNT,
  GROUP_COLORS,
} from "./constants";

extend({ OrbitControls });

const Cube = forwardRef(({ ...rest }, ref) => {
  return (
    <a.group {...rest} ref={ref}>
      {new Array(6).fill().map((_, i) => {
        // Draws each face of the cube
        // really, we should be only drawing what is needed
        // but whatever
        let rotation = new Vector3();
        const position = new Vector3();
        if (i === 0) {
          rotation.setX(-Math.PI / 2);
          position.setY(CUBE_SIZE / 2);
        } else if (i === 1) {
          rotation.setY(Math.PI / 2);
          position.setX(CUBE_SIZE / 2);
        } else if (i === 2) {
          rotation.setX(Math.PI / 2);
          position.setY(-CUBE_SIZE / 2);
        } else if (i === 3) {
          rotation.setY(-Math.PI / 2);
          position.setX(-CUBE_SIZE / 2);
        } else if (i === 4) {
          rotation.setZ(Math.PI / 2);
          position.setZ(CUBE_SIZE / 2);
        } else if (i === 5) {
          rotation.setZ(-Math.PI / 2);
          position.setZ(-CUBE_SIZE / 2);
        }
        const color = hexToRgb(GROUP_COLORS[i]);
        const material = new CubixMaterial({ color });

        return (
          <a.mesh
            key={rest.index + "-" + i}
            rotation={rotation.toArray()}
            position={position.toArray()}
          >
            <planeBufferGeometry
              attach="geometry"
              args={[CUBE_SIZE, CUBE_SIZE, 1]}
            />

            <shaderMaterial
              attach="material"
              args={[material]}
              side={DoubleSide}
            />
          </a.mesh>
        );
      })}
    </a.group>
  );
});

/** Returns starting cube coords */
function getPositionByIndex(i) {
  const offset = CUBE_SIZE;
  const x = (i % RUBIX_AMOUNT) * CUBE_SIZE - offset;
  const y = Math.floor((i / RUBIX_AMOUNT) % RUBIX_AMOUNT) * CUBE_SIZE - offset;
  const z = Math.floor(i / RUBIX_AMOUNT ** 2) * CUBE_SIZE - offset;
  return [x, y, z];
}

function Rubix() {
  const sides = RUBIX_AMOUNT ** 2 * RUBIX_AMOUNT;
  /** Ref to all the cubicles */
  const cubeRefs = useRef(new Array(sides).fill(undefined));
  /** Which side is selected. Uses the coords system */
  const active = useRef(-0.5);
  /** Direction of spin. 1 or -1 */
  const dir = useRef(1);
  /** A queue storing key presses
   * so we always make sure transformations are done
   * on time and not earlier.
   * This avoid translation issues if user
   * tries to rotate while it's in mid rotation
   */
  const moveQueue = useRef([]);
  const lastMove = useRef(0);
  const [duration, setDuration] = useState(250);
  
  /** Set up transition */
  const [springs, set] = useSprings(sides, i => {
    const position = getPositionByIndex(i);
    return {
      position,
      rotation: [0, 0, 0],
      config: { duration }
    };
  });

  /** Manages key press for side selection and rotation direction */
  function handleSideSelection(keyCode) {
    switch (keyCode) {
      case keys["1"]:
        active.current = -0.5;
        break;
      case keys["2"]:
        active.current = 0;
        break;
      case keys["3"]:
        active.current = 0.5;
        break;
      case keys["-"]:
        dir.current = -1;
        break;
      case keys["+"]:
        dir.current = 1;
        break;
      default:
        break;
    }
  }

  /** Processes key press */
  const processMove = keyCode => {
    const checkKey = isPressed({ keyCode });
    handleSideSelection(keyCode);

    if (checkKey(keys.q) || checkKey(keys.w) || checkKey(keys.e)) {
      const cubesToMove = [];

      cubeRefs.current.forEach(cube => {
        if (checkKey(keys.q) && cube.position.z === active.current) {
          cubesToMove.push(cube.uuid);
        } else if (checkKey(keys.w) && cube.position.y === active.current) {
          cubesToMove.push(cube.uuid);
        } else if (checkKey(keys.e) && cube.position.x === active.current) {
          cubesToMove.push(cube.uuid);
        }
      });

      set(i => {
        const cube = cubeRefs.current[i];

        // Keep the untouched cubes where they are
        if (cubesToMove.indexOf(cube.uuid) < 0) {
          return;
        }

        const newPos = cube.position.clone();
        const newRotation = cube.rotation.clone();
        const matrix = new Matrix4();
        const rotation = (Math.PI / 2) * dir.current;

        if (checkKey(keys.q)) {
          matrix.makeRotationZ(rotation);
        } else if (checkKey(keys.w)) {
          matrix.makeRotationY(rotation);
        } else if (checkKey(keys.e)) {
          matrix.makeRotationX(rotation);
        }
        newPos.applyMatrix4(matrix);
        matrix.multiply(cube.matrix);
        newRotation.setFromRotationMatrix(matrix);

        return {
          position: newPos.toArray().map(roundHalf),
          rotation: newRotation.toArray()
        };
      });
    }
  };

  function addToQueue({ keyCode }) {
    moveQueue.current.push(keyCode);
  }

  useEffect(() => {
    window.addEventListener("keydown", addToQueue);

    return () => {
      window.removeEventListener("keydown", addToQueue);
    };
  }, []);

  useFrame(() => {
    if (moveQueue.current.length) {
      const now = Date.now();
      if (now - lastMove.current > duration*1.25) {
        lastMove.current = now;
        const move = moveQueue.current.shift();
        processMove(move);
      }
    }
  });

  return springs.map((props, i) => {
    // const position = getPositionByIndex(i);

    // const type = getCubeType(position);
    // const belongsToGroup = getGroupNumberByPosition(position);

    const key = `cube-${i}`;
    return (
      <Cube
        {...props}
        key={key}
        index={key}
        ref={ref => {
          if (cubeRefs.current[i] === undefined) cubeRefs.current[i] = ref;
        }}
      />
    );
  });
}

function Scene() {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  return (
    <>
      <orbitControls args={[camera, domElement]} />
      <ambientLight />
      <Rubix />
    </>
  );
}

function AppCanvas() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default AppCanvas;
