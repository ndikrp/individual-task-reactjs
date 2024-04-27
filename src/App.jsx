import React, { useState } from "react";
import Fruits from "./components/Fruits";
import UserSelect from "./components/UserSelect";

function App() {
  const [fruitAdded, setFruitAdded] = useState(false);

  const handleFruitAdded = () => {
    setFruitAdded(true);
  };

  return (
    <div>
      <UserSelect
        fruitAdded={fruitAdded}
        onFruitFetched={() => setFruitAdded(false)}
      />
      <Fruits onFruitAdded={handleFruitAdded} />
    </div>
  );
}

export default App;
