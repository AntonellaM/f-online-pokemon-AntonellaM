import React from 'react';
import { Link } from 'react-router-dom';
import './PokeList.scss';

const PokeList = (props) => {
  return (
    <main>
      <section className="pokemon-results">
        <ul class="pokemon-results__list">
          {props.list.map((pokemon, index) =>
            <Link to={`/pokemon/${pokemon.id}`}>
              <li class="pokemon-card" key={index}>
                <div className="pokemon-details__photo" style={{backgroundImage: `url(${pokemon.sprites.front_default})`}}></div>
                <p>ID/{pokemon.id}</p>
                <h1>{pokemon.forms[0].name}</h1>
                {pokemon.types.map(type => <p>{type.type.name}</p>)}
              </li>
            </Link>
          )}
        </ul>
      </section>
    </main>
  );
}
 
export default PokeList;