import React, { useEffect } from "react";
import "./App.css";
import { calculate, excahnge, parseTokens } from "./utils/Calculator";

function App() {
  useEffect(() => {
    let a = parseTokens("2*(9+6/3-5)+4");
    console.log(a);
    let b = excahnge(a);
    console.log(b);
    let c = calculate(b);
    console.log(c);
  });
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
