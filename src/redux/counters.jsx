import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

const mapStateToProps = state => ({
  aCardTotal: state.add.cardA,
  bCardTotal: state.add.cardB,
  totalBCards: state.add.totalBCards
});

const mapDispatchToProps = dispatch => ({
  addBCardsDis: () => dispatch(actions.addBCards()),
  addADis: () => dispatch(actions.addA()),
  addBDis: () => dispatch(actions.addB())
});

class App extends Component {
  constructor(props) {
    super(props);
    this.speedsSum = 0;
    this.speedsAverage = Infinity;
  }

  render() {
    const cardBArr = Array.from(
      { length: this.props.totalBCards.length },
      (_, i) => <CardB key={i} countB={this.props.bCardTotal} />
    );
    return (
      <div>
        <h2>React-Redux</h2>
        <h3>Card A Counter: {this.props.aCardTotal}</h3>
        <h3>Card B Counter: {this.props.bCardTotal}</h3>
        <h4>Total B Components: {this.props.totalBCards.length}</h4>
        <h3>B Component Speed Average: {this.speedsAverage}</h3>

        <button onClick={() => this.props.addBCardsDis()}>
          Create 1000 B Components
        </button>

        <button onClick={() => this.props.addADis()}>Increment A</button>
        <button
          onClick={() => {
            const before = window.performance.now("App");
            new Promise(() => this.props.addBDis())
              .then((this.speedsSum += window.performance.now("App") - before))
              .then(
                (this.speedsAverage = this.speedsSum / this.props.bCardTotal)
              );
          }}
        >
          Increment B
        </button>

        <div className="container">
          <CardA countA={this.props.aCardTotal} />
        </div>
        <div className="container">{cardBArr}</div>
      </div>
    );
  }
}

const CardA = props => <div className="gen">{props.countA}</div>;
const CardB = props => <div className="gen">{props.countB}</div>;

export default connect(mapStateToProps, mapDispatchToProps)(App);
