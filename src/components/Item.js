import React from "react";

function Item({ item, onUpdate, onDelete }) {
  const itemUrl = "http://localhost:4000/items/" + `${item.id}`;

  function addToCartClick() {
    const updatedData = {isInCart: !item.isInCart}

    const updateInCartRequest = {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body:JSON.stringify(updatedData)
    } 

    fetch(itemUrl, updateInCartRequest)
    .then(r => r.json())
    .then(data => onUpdate(data))
  }

  function deleteItem() {
    fetch(itemUrl, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => onDelete(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={addToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={deleteItem}>Delete</button>
    </li>
  );
}

export default Item;
