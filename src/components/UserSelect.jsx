import React, { useState } from 'react';

function UserSelect() {
  const [selectedFruits, setSelectedFruits] = useState([]);

  const handleRemoveFruit = id => {
    setSelectedFruits(prev => prev.filter(fruit => fruit.id !== id));
  };

  return (
    <div>
      <h2>User Selected Fruits</h2>
      <ul>
        {selectedFruits.map(fruit => (
          <li key={fruit.id}>
            <img src={fruit.image.src} alt={fruit.image.alt} />
            <span>{fruit.name}</span>
            <button onClick={() => handleRemoveFruit(fruit.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSelect;
