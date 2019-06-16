import React from 'react';
import { Link } from 'react-router-dom';
import './PokeList.scss';

const PokeList = (props) => {
  return (
    <main>
      <section className="pokemon-results">
        <ul className="pokemon-results__list">
          {props.list.map((pokemon, index) =>
            <Link className="pokemon-card__link" to={`/pokemon/${pokemon.id}`}>
              <li className="pokemon-card" key={index}>
                <div className="pokemon-card__header">
                  <div className="photo" style={{backgroundImage: `url(${pokemon.sprites.front_default})`}}></div>
                  <p>ID/{pokemon.id}</p>
                </div>
                <h1 className="pokemon-card__name">{pokemon.forms[0].name}</h1>
                <div className="pokemon-card__types">
                {pokemon.types.map(type => <p className="type">{type.type.name}</p>)}
                </div>
              </li>
            </Link>
          )}
        </ul>
      </section>
    </main>
  );
}
 
export default PokeList;