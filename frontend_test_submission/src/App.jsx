import React, { useEffect } from "react";
import { sendLog } from "./services/logger";

function App() {
  useEffect(() => {
    sendLog({
      stack: "frontend",
      level: "info",
      pkg: "components",
      message: "App mounted successfully",
    });
  }, []);

  return (
    <div className="App">
      <h2>Log Test</h2>
    </div>
  );
}

export default App;
