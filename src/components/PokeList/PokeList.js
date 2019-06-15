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
              <li class="pokemon-card" key={index}>{pokemon.forms[0].name}</li>
            </Link>
          )}
        </ul>
      </section>
    </main>
  );
}
 
export default PokeList;