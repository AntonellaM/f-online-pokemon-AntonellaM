import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';
import './Pokemon.scss';

const Pokemon = (props) => {
  return (
    <div className="pokemon__container">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="pokemon-details">
        <div className="pokemon-details__photo" style={{backgroundImage: `url(${props.pokemon.sprites.front_default})`}}></div>
        <p>ID/{props.pokemon.id}</p>
        <h1>{props.pokemon.forms[0].name}</h1>
        {props.pokemon.types.map(type => <p>{type.type.name}</p>)}
        {props.pokemon.stats.map(stats => 
        <div className="pokemon-details__characteristics">
          <p class="characteristic__name">{stats.stat.name}</p>
          <ProgressBar class="characteristic__bar" now={stats.base_stat} label={`${stats.base_stat}%`} />
        </div>
        )}
      </div>   
    </div>
  );
}
 
export default Pokemon;