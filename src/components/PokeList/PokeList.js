import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PokeList.scss';

class PokeList extends React.Component {
  constructor(props) {
    super(props);
    this.getPokemonEvolution = this.getPokemonEvolution.bind(this);
  }

  getPokemonEvolution(URL) {
    fetch(URL).then(res => res.json()).then(data => data.evolves_from_species !== null ? console.log(data.evolves_from_species.name) : console.log('vacío'))
  }

  render() {
    return (
      <main>
        <section className="pokemon-results">
          <ul className="pokemon-results__list">
            {this.props.list.map((pokemon, index) =>
              <Link key={index} className="pokemon-card__link" to={`/pokemon/${pokemon.id}`}>
                <li className="pokemon-card" >
                  <div className="pokemon-card__header">
                    <div className="photo" style={{backgroundImage: `url(${pokemon.sprites.front_default})`}}></div>
                    <p>ID/{pokemon.id}</p>
                  </div>
                  <h1 className="pokemon-card__name">{pokemon.forms[0].name}</h1>
                  <div className="pokemon-card__types">
                  {pokemon.types.map((type, index) => <p key={index} className="type">{type.type.name}</p>)}
                  </div>
                  <div className="pokemon-card__evolutions">
                    {this.getPokemonEvolution(pokemon.species.url)}
                  </div>
                </li>
              </Link>
            )}
          </ul>
        </section>
      </main>
    );
  }
}

PokeList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
} 
 
export default PokeList;