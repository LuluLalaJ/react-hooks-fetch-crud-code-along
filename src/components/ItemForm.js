import React, { useState, useEffect } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const itemsUrl = "http://localhost:4000/items/";
  
  const newItem = {
    name: name, 
    category: category, 
    isInCart: false,
  }

  function addItemToData(e) {
    e.preventDefault()

    const addItemRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body:JSON.stringify(newItem)
  }

    fetch(itemsUrl, addItemRequest)
    .then(r => r.json())
    .then(newItem => onAddItem(newItem))
    setName('')
    setCategory('Produce')
  }

  return (
    <form className="NewItem" onSubmit={addItemToData}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
