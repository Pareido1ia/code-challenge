import './App.css';
import React from "react";
import MainPage from "./MainPage";

function App() {
  return (
    <div id="app" style={{ minHeight: "100vh" }}>
      <div className="header" >Loop Membership Management</div>
      <MainPage />
    </div>
  );
}

export default App;
