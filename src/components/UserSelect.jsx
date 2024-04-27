import React, { useEffect, useState } from "react";

function UserSelect({ fruitAdded, onFruitFetched }) {
  const [selectedFruits, setSelectedFruits] = useState([]);

  const fetchUserSelectedFruits = async () => {
    try {
      const response = await fetch("http://localhost:8000/user-fruits");
      if (!response.ok) {
        throw new Error("Failed to fetch user-selected fruits");
      }
      const data = await response.json();
      setSelectedFruits(data);
      onFruitFetched(); // Notify parent component that fruits have been fetched
    } catch (error) {
      console.error("Error fetching user-selected fruits:", error);
    }
  };

  useEffect(() => {
    fetchUserSelectedFruits();
  }, [fruitAdded]);

  return (
    <div>
      <h2>User Selected Fruits</h2>
      <ul className="fruit-user">
        {selectedFruits.map((fruit) => (
          <li key={fruit.id}>
            <img
              src={`http://localhost:8000/${fruit.image.src}`}
              alt={fruit.image.alt}
              className="fruit-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSelect;
