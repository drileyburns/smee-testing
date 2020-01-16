import React from "react";
import { render } from "react-dom";
import { setStore, useStore } from "react-smee";
import styled from 'styled-components';

let speedsSum = 0;
let speedsAverage = Infinity;

const StyledDiv = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: pink;
`;


const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const ButtonCardTotal = styled.button`
  padding: 0.15em 2em;
  backgroundColor: red;
`;

const ButtonCardA = styled.button`
  padding: 0.20em 2em;
  backgroundColor: pink;
`;

const ButtonCardB = styled.button`
  padding: 0.20em 2em;
  backgroundColor: pink;
`;

const Hr1  = styled.hr`
  border-top: 1px dashed pink;
  border-bottom: 1px dashed pink;
`;



const App = () => {
  const cardA = useStore("cardA", 0);
  const cardB = useStore("cardB", 0);
  const cardBTotal = useStore("cardBTotal", 0);

  const cardArr = Array.from({ length: cardBTotal }, (_, i) => (
    <CardB key={i} countB={cardB} />
  ));
 
  return (
   
    <StyledDiv>
    
      <h3>Card A Counter: {cardA}</h3>
      <h3>Card B Counter: {cardB}</h3>
      <h4>Total B Components: {cardBTotal}</h4>
      <h3>B Component Speed Average: {speedsAverage}</h3>

      <ButtonCardTotal
        onClick={() => {
          setStore("cardBTotal", total => total + 1000);
        }}
      >
        Create 1000 B Components
        </ButtonCardTotal>
       
        <Hr1/>

      <ButtonCardA onClick={() => setStore("cardA", cardA => cardA + 1)}>
        Increment A
      </ButtonCardA>

    <ButtonCardB
        onClick={() => {
          const before = window.performance.now("App");
          new Promise(() => setStore("cardB", cardB => cardB + 1))
            .then((speedsSum += window.performance.now("App") - before))
            .then((speedsAverage = speedsSum / cardB));
        }}
      >
        Increment B
      </ButtonCardB>

      <div className="container">
        <CardA countA={cardA} />
      </div>
      <div className="container">{cardArr}</div>
    </StyledDiv>
   
  );
};

const CardA = props => <div className="gen">{props.countA}</div>;

const CardB = props => <div className="gen">{props.countB}</div>;

render(<App />, document.getElementById("root"));
