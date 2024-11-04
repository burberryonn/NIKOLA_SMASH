import { useState } from "react";
function Game({}) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((prev) => ++prev)}></button>
      <p>{count}</p>
    </>
  );
}

export default Game;
