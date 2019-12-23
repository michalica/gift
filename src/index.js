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
  const [inputValue, setInputValue] = useState("");

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
        <div id="mc_embed_signup">
          <form
            action="https://gmail.us4.list-manage.com/subscribe/post?u=17ba4a4dee99db6a28e2bae8d&amp;id=efb9275ef0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <label for="mce-EMAIL">Vesele Vianoce</label>
              <input
                onChange={e => setInputValue(e.target.value)}
                type="email"
                value={inputValue}
                name="EMAIL"
                class="email"
                id="mce-EMAIL"
                placeholder="email address"
                required
              />
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_17ba4a4dee99db6a28e2bae8d_efb9275ef0"
                  tabindex="-1"
                  value=""
                />
              </div>
              <div style={{ float: "left", marginTop: 20 }} className="clear">
                <input
                  type="submit"
                  value="chcem darcek"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
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
