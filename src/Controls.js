import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

function Controls() {
  const [active, setActive] = useState(false);
  const transitions = useTransition(active, null, {
    from: {
      transform: "translate3d(0,0px,0)",
      opacity: 0,
      height: 0,
      position: "absolute"
    },
    enter: { transform: "translate3d(0,25px,0)", opacity: 1 },
    leave: { transform: "translate3d(0,0px,0)", opacity: 0, height: 0 }
  });

  return (
    <div style={{ position: "absolute", top: 25, left: 25 }}>
      <button onClick={() => setActive(!active)}>Show controls</button>
      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div style={{ ...props }} key={key}>
              <div style={{ height: "100%" }}>
                <h3>Controls</h3>
                <div className="instruction">
                  <b>Q:</b> Rotate front/back
                </div>
                <div className="instruction">
                  <b>W:</b> Rotate bottom/top
                </div>
                <div className="instruction">
                  <b>E:</b> Rotate left/right
                </div>
                <div className="instruction">
                  <b>1~3:</b> Change group being rotated
                </div>
              </div>
            </animated.div>
          )
        );
      })}
    </div>
  );
}

export default Controls;
