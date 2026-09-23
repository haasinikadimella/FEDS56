import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    setCount(count - 1);
  }
  function reset() {
    setCount(0);
  }
  return (
    <>
      <h2>Counter Demonstration</h2>
      <h2>COUNT = {count}</h2>
      <center>
        <button style={{background:"green",color:"white",width:"120px"}} onClick={increase}>Increase</button>
        <button style={{background:"red",color:"white",width:"120px"}} onClick={decrease}>Decrease</button>
        <button style={{background:"blue",color:"white",width:"120px"}} onClick={reset}>Reset</button>
      </center>
    </>
  );
}
export default Counter;