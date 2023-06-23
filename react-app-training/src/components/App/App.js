import './App.css';
import HelloWorld from "../HelloWorld/HelloWorld";
import {useState} from "react";

function App() {
  const [active, setActive] = useState();
  return (
      <button onClick={() => {
          setActive(test => !test)
      }}>
          {active ? (
              'this button active'
          ) : ('this button is NOT active')}
      </button>
  );
}

export default App;
