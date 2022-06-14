import React from 'react';

export const Producto = ({ title, image, description, price }) => {
  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};
