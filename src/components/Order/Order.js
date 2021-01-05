import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    let backgroundColor;
    switch (ingredientName) {
      case 'bacon':
        backgroundColor = 'linear-gradient(#bf3813, #c45e38)';
        break;
      case 'cheese':
        backgroundColor = 'linear-gradient(#f4d004, #d6bb22)';
        break;
      case 'meat':
        backgroundColor = 'linear-gradient(#7f3608, #702e05)';
        break;
      case 'salad':
        backgroundColor = 'linear-gradient(#228c1d, #91ce50)';
        break;
      default:
        backgroundColor = 'linear-gradient(#f4d004, #d6bb22)';
        break;
    }

    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
      backgroundColor,
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
          color: 'white',
          background: ig.backgroundColor,
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
