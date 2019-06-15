import React from 'react';
import './Pokemon.scss';

const Pokemon = (props) => {
  return (
    
      <h1>{props.pokemon.forms[0].name}</h1>
  );
}
 
export default Pokemon;