import React from "react";
import Fruits from "./components/Fruits";
import UserSelect from "./components/UserSelect";
import logoImg from "../public/logo.png";

function App() {
  return (
    <>
      <header>
        <img src={logoImg} alt="logo" />
        <h1>Fruit Calorie</h1>
        <p>Get the calorie count of your favorite fruits!</p>
      </header>
      <main>
        <UserSelect />
        <Fruits />
      </main>
    </>
  );
}

export default App;
