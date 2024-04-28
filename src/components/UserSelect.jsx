import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function UserSelect({ fruitAdded, onFruitFetched }) {
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedFruitToDelete, setSelectedFruitToDelete] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const fetchUserSelectedFruits = async () => {
    try {
      const response = await fetch("http://localhost:8000/user-fruits");
      if (!response.ok) {
        throw new Error("Failed to fetch user-selected fruits");
      }
      const data = await response.json();
      setSelectedFruits(data);
      onFruitFetched();
    } catch (error) {
      console.error("Error fetching user-selected fruits:", error);
    }
  };

  useEffect(() => {
    fetchUserSelectedFruits();
  }, [fruitAdded]);

  const openConfirmationModal = (fruit) => {
    setSelectedFruitToDelete(fruit);
    setShowBackdrop(true);
  };

  const handleDeleteFruit = async () => {
    if (!selectedFruitToDelete) {
      console.error("No fruit selected for deletion");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/delete-fruit/${selectedFruitToDelete.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Fruit deleted successfully");
        setSelectedFruitToDelete(null);
        fetchUserSelectedFruits();
      } else {
        console.error("Failed to delete fruit");
      }
    } catch (error) {
      console.error("Error deleting fruit:", error);
    }
    setShowBackdrop(false);
  };


  const calculateTotals = () => {
    const totalCalories = selectedFruits.reduce(
      (acc, fruit) => acc + fruit.calories,
      0
    );
    const totalCarbohydrates = selectedFruits.reduce(
      (acc, fruit) => acc + fruit.carbohydrates,
      0
    );
    const totalFat = selectedFruits.reduce((acc, fruit) => acc + fruit.fat, 0);
    const totalProtein = selectedFruits.reduce(
      (acc, fruit) => acc + fruit.protein,
      0
    );
    return { totalCalories, totalCarbohydrates, totalFat, totalProtein };
  };

  const { totalCalories, totalCarbohydrates, totalFat, totalProtein } =
    calculateTotals();

  return (
    <div className="user-container">
      <h2>User Selected Fruits</h2>
      <p>You have selected {selectedFruits.length} fruits to calculate.</p>
      <h3 className="total-info">
        Total calories: {totalCalories}, Total carbohydrates:{" "}
        {totalCarbohydrates}, Total fat: {totalFat}, Total protein:{" "}
        {totalProtein}
      </h3>
      <ul className="fruit-user">
        {selectedFruits.map((fruit) => (
          <li key={fruit.id}>
            <img
              src={`http://localhost:8000/${fruit.image.src}`}
              alt={fruit.image.alt}
              className="fruit-image"
              onClick={() => openConfirmationModal(fruit)}
            />
          </li>
        ))}
      </ul>
      {showBackdrop && <div className="modal-backdrop"></div>}
      {selectedFruitToDelete && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setSelectedFruitToDelete(null);
            setShowBackdrop(false);
          }}
          onConfirm={handleDeleteFruit}
          className="modal"
        />
      )}
    </div>
  );
}

export default UserSelect;
