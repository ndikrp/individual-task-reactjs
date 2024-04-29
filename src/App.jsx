import React, { useState } from "react";
import Fruits from "./components/Fruits";
import UserSelect from "./components/UserSelect";
import BackgroundEditor from "./components/BackgroundEditor";
import logoImg from "/logo.png";

function App() {
  const [fruitAdded, setFruitAdded] = useState(false);

  const handleFruitAdded = () => {
    setFruitAdded(true);
  };

  return (
    <>
      <BackgroundEditor />
      <header>
        <img src={logoImg} alt="Logo" />
        <h1>Fruit Calculator</h1>
        <p>Use the fruits below to calculate your daily calorie intake</p>
      </header>
      <div>
        <UserSelect
          fruitAdded={fruitAdded}
          onFruitFetched={() => setFruitAdded(false)}
        />
        <Fruits onFruitAdded={handleFruitAdded} />
      </div>
    </>
  );
}

export default App;
