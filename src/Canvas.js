import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { Group, Euler, Vector3, Matrix4, DoubleSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSprings, animated as a, config } from "react-spring/three";
import { keys, isPressed } from "./keys";
import CubixMaterial from "./material";
import {
  roundHalf,
  hexToRgb,
  rotation,
  rotationMatrixZ,
  rotationMatrixX,
  rotationMatrixY,
  getCubeType
} from "./utils";

import {
  CUBE_SIZE,
  RUBIX_AMOUNT,
  GROUP_COLORS,
  __prev__,
  __next__
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

/**
 * A group is one face of the cube, the one that can be rotated
 * @param {[x, y, z]} position
 */
function getGroupNumberByPosition(position) {
  const [x, y, z] = position;
  return [
    x / CUBE_SIZE,
    y / CUBE_SIZE + RUBIX_AMOUNT,
    z / CUBE_SIZE + RUBIX_AMOUNT * 2
  ];
}

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

  const [springs, set] = useSprings(sides, i => {
    const position = getPositionByIndex(i);

    return {
      position,
      rotation: [0, 0, 0],
      config: { duration: 350 }
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

  const keyDown = e => {
    const { keyCode } = e;
    const checkKey = isPressed(e);
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

        let newPos = cube.position.clone();
        const newRotation = cube.rotation.clone();

        let matrix;
        if (checkKey(keys.q)) {
          matrix = rotationMatrixZ(dir.current);
        } else if (checkKey(keys.w)) {
          matrix = rotationMatrixY(dir.current);
        } else if (checkKey(keys.e)) {
          matrix = rotationMatrixX(dir.current);
        }
        newPos.applyMatrix4(matrix);
        newRotation.setFromRotationMatrix(matrix);

        return {
          position: newPos.toArray().map(roundHalf),
          rotation: newRotation.toArray()
        };
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, []);

  return springs.map((props, i) => {
    const position = getPositionByIndex(i);

    const type = getCubeType(position);
    const belongsToGroup = getGroupNumberByPosition(position);

    const color = `#${(
      "00000" + ((Math.random() * (1 << 24)) | 0).toString(16)
    ).slice(-6)}`;

    const key = `cube-${i}`;

    return (
      <Cube
        {...props}
        color={color}
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
