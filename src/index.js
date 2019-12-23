import React, { useState } from "react";
import ReactDOM from "react-dom";
import GiftComponent from "./GiftComponent";

import { useSpring, animated } from "react-spring";
import "./styles.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { InputLabel, FormControl, Input, Button } from "@material-ui/core";

/*
0 % { transform: scale(1); }
25 % { transform: scale(.97); }
35 % { transform: scale(.9); }
45 % { transform: scale(1.1); }
55 % { transform: scale(.9); }
65 % { transform: scale(1.1); }
75 % { transform: scale(1.03); }
100 % { transform: scale(1); }
`*/
function App() {
  const [state, toggle] = useState(true);
  const [completed, setCompleted] = useState(0);

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 }
  });

  const increaseLoading = () => {
    toggle(!state);
    setCompleted(completed + 10);
  };

  if (completed === 100) {
    return (
      <div
        style={{
          margin: "auto",
          marginTop: 100,
          maxWidth: 200
        }}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email :)</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
        <br />
        <br />

        <Button variant="contained" color="secondary">
          Save
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "auto",
        marginTop: 100,
        maxWidth: 200
      }}
    >
      <div onClick={() => increaseLoading()}>
        <animated.div
          style={{
            opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
            transform: x
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
              })
              .interpolate(x => `scale(${x})`)
          }}
        >
          <GiftComponent />
        </animated.div>
      </div>
      <br />
      <br />
      <LinearProgress variant="determinate" value={completed} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
