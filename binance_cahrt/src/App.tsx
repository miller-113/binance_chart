import { useState } from "react";

import { CandlestickChart } from "./components/Chart/Chart";
import TimeframeSelector from "./components/TimeframeSelector";

function App() {
  const [interval, setInterval] = useState("1m");
  const handleChangeInterval = (val: string) => setInterval(val);
  return (
    <div className="App">
      <CandlestickChart interval={interval} />
      <TimeframeSelector onChange={handleChangeInterval} />
    </div>
  );
}

export default App;
