import React, { useState, useEffect } from "react";

function Fruits() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    async function fetchFruits() {
      const response = await fetch("http://localhost:8000/fruit");
      const data = await response.json();
      setFruits(data);
    }

    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruit List</h2>
      <ul className="fruit-list">
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <button>
              <img
                className="fruit-image"
                src={`http://localhost:8000/${fruit.image.src}`}
                alt={fruit.image.alt}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fruits;
