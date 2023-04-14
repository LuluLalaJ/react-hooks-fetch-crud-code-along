import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { set } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  const itemsUrl = "http://localhost:4000/items/";
  useEffect(() => {
    fetch(itemsUrl)
    .then(r => r.json())
    .then(data => setItems(data))
  },[])

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map( item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item
      }
    });
    setItems(updatedItems) 
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter ( item => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdate={handleUpdateItem} onDelete={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
