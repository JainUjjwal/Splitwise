import React from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* {user ? <Main /> : <Main />} */}
        <Main />
      </div>
    </BrowserRouter>
  );
};

export default App;
