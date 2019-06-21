import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { pokemonURLS } from '../../services/getPokemonURLS';
import PokeList from '../PokeList/PokeList';
import Pokemon from '../Pokemon/Pokemon';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      filterByName: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    pokemonURLS()
      .then(data => {
        const list = data.results;
        let pokemons = [];
        for (const pokemonData of list) {
          let pokemon = {
            data: {},
            evolvesFrom: '',
            evolvesTo: '',
          };
          fetch(`${pokemonData.url}`)
            .then(res => res.json())
            .then(details => {
              pokemon.data = details;
              if (pokemon.data.species !== null) {
                fetch(`${pokemon.data.species.url}`)
                .then(res => res.json())
                .then(species => {
                  pokemon.evolvesFrom = species.evolves_from_species !== null ?species.evolves_from_species.name : 'none';
                  if (species.evolution_chain.url !== null) {
                    fetch(`${species.evolution_chain.url}`)
                    .then(res => res.json())
                    .then(evolution => {
                      pokemon.evolvesTo = evolution.chain.evolves_to[0].evolves_to[0] !== undefined ? evolution.chain.evolves_to[0].evolves_to[0].species.name : 'none';
                      pokemons.push(pokemon)
                    })
                  }
                })
              }
            })
        }
        console.log(pokemons);
        this.setState({ pokemonList: pokemons })
      }
    )
  }

  handleInputChange(event) {
    const inputValue = event.currentTarget.value;
    this.setState({ filterByName: inputValue });
  }

  render() {
    return (
        <main className="main">
          <Switch>
            <Route exact path="/" render={routerProps => (
              <React.Fragment>
                <section className="search">
                  <label htmlFor="searchPokemon">Busca tu Pokemon</label>
                  <input type="text" id="searchPokemon" name="searchPokeon" value={this.state.filterByName} onChange={this.handleInputChange}/>
                </section>
                <PokeList list={this.state.pokemonList.filter(pokemon => pokemon.data.name.toUpperCase().includes(this.state.filterByName.toUpperCase()))}/> 
              </React.Fragment>
            )}/>
            <Route path="/pokemon/:id" render={routerProps => {
              const pokemonSelected = this.state.pokemonList.find(pokemon => parseInt(pokemon.id) === parseInt(routerProps.match.params.id));
              return pokemonSelected !== undefined ?
              <Pokemon pokemon={pokemonSelected}/> :
              <div className="loader__container">
                <div className="lds-ripple"><div></div><div></div></div>
              </div>
            }}/>
          </Switch>
        </main>
    );
  }
}
export default App;
