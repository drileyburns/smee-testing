import React, { Component } from "react";
import Counters from "./counters.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Counters />
      </div>
    );
  }
}

export default App;
