import React, { useState, useEffect } from "react";

function Fruits({ onFruitAdded }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    async function fetchFruits() {
      try {
        const response = await fetch("http://localhost:8000/fruit");
        const data = await response.json();
        setFruits(data);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    }

    fetchFruits();
  }, []);

  const handleAddFruit = async (fruit) => {
    try {
      const response = await fetch("http://localhost:8000/add-fruit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fruit }),
      });
      if (response.ok) {
        console.log("Fruit added successfully");
        onFruitAdded(); 
      } else {
        console.error("Failed to add fruit");
      }
    } catch (error) {
      console.error("Error adding fruit:", error);
    }
  };

  return (
    <div className="fruits-container">
      <h2>Fruit List</h2>
      <p>You can add fruits to calculate</p>
      <ul className="fruit-list">
        {fruits.map((fruit) => (
          <li key={fruit.id} className="fruit-item">
            <button onClick={() => handleAddFruit(fruit)}>
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
