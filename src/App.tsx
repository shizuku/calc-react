import React, { useRef } from "react";
import "./App.css";
import { calc } from "./utils/Calculator";
import { Input } from "antd";

const { Search } = Input;

function App() {
  let re = useRef<HTMLDivElement>(null);
  return (
    <div className="App">
      <div className="content">
        <Search
          placeholder="input expression"
          onSearch={(value) => {
            let r = calc(value);
            if (re.current) {
              re.current.innerText = "result: " + r.toString();
            }
          }}
          enterButton="OK"
        />
        <div ref={re} className="result">
          result:
        </div>
      </div>
    </div>
  );
}

export default App;
