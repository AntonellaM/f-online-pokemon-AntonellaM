import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PokeList.scss';

const PokeList = (props) => {
  return (
    <main>
      <section className="pokemon-results">
        <ul className="pokemon-results__list">
          {props.list.map((pokemon, index) =>
              <Link key={index} className="pokemon-card__link" to={`/pokemon/${pokemon.data.id}`}>
                <li className="pokemon-card" >
                  <div className="pokemon-card__header">
                    <div className="photo" style={{backgroundImage: `url(${pokemon.data.sprites.front_default})`}}></div>
                    <p>ID/{pokemon.data.id}</p>
                  </div>
                  <h1 className="pokemon-card__name">{pokemon.data.forms[0].name}</h1>
                  <div className="pokemon-card__types">
                  {pokemon.data.types.map((type, index) => <p key={index} className="type">{type.type.name}</p>)}
                  </div>
                  <div className="pokemon-card__evolutions">
                    <div className="pokemon-card__evolutions--from">
                      <p className="pokemon-card__evolutions--title">Evolves from:</p>
                      <p className="pokemon-card__evolutions--result">{pokemon.evolvesFrom}</p>
                    </div>
                    <div className="pokemon-card__evolutions--to">
                      <p className="pokemon-card__evolutions--title">Evolves to:</p>
                      <p className="pokemon-card__evolutions--result">{pokemon.evolvesTo}</p>
                    </div>
                  </div>
                </li>
              </Link>
          )}
        </ul>
      </section>
    </main>
  );
}

PokeList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
} 
 
export default PokeList;