import React from "react";
import { render } from "react-dom";
import { setStore } from "../Smee/funcStore";
import { useStore } from "../Smee/useStore";

let speedsSum = 0;
let speedsAverage = Infinity;

const App = () => {
  const cardA = useStore("cardA", 0);
  const cardB = useStore("cardB", 0);
  const cardBTotal = useStore("cardBTotal", 0);

  const cardArr = Array.from({ length: cardBTotal }, (_, i) => (
    <CardB key={i} countB={cardB} />
  ));
  return (
    <div>
      <h2>SMEE</h2>
      <h3>Card A Counter: {cardA}</h3>
      <h3>Card B Counter: {cardB}</h3>
      <h4>Total B Components: {cardBTotal}</h4>
      <h3>B Component Speed Average: {speedsAverage}</h3>

      <button
        onClick={() => {
          setStore("cardBTotal", total => total + 1000);
        }}
      >
        Create 1000 B Components
      </button>

      <button onClick={() => setStore("cardA", cardA => cardA + 1)}>
        Increment A
      </button>
      <button
        onClick={() => {
          const before = window.performance.now("App");
          new Promise(() => setStore("cardB", cardB => cardB + 1))
            .then((speedsSum += window.performance.now("App") - before))
            .then((speedsAverage = speedsSum / cardB));
        }}
      >
        Increment B
      </button>
      <div className="container">
        <CardA countA={cardA} />
      </div>
      <div className="container">{cardArr}</div>
    </div>
  );
};

const CardA = props => <div className="gen">{props.countA}</div>;
const CardB = props => <div className="gen">{props.countB}</div>;

render(<App />, document.getElementById("root"));
