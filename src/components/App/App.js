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
      pokemonURLS: [],
      pokemonList: [],
      filterByName: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    pokemonURLS()
      .then(data => {
        let list = data.results;
        for (const pokemonData of list) {
          let pokemon = {};
          fetch(`${pokemonData.url}`)
            .then(res => res.json())
            .then(details => pokemon = details)
        }
      }
    )).then(this.state.pokemonList.map(pokemon => fetch(`${pokemon}`))
    .then(res => res.json())
    .then(data => data.evolves_from_species !== null ? console.log(data.evolves_from_species.name) : console.log('vacío'))))
    
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
                <PokeList list={this.state.pokemonList.filter(pokemon => pokemon.name.toUpperCase().includes(this.state.filterByName.toUpperCase()))}/> 
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

.then(response => response.json())

      .then(data => {
        let list = data.results;
        for (let i = 0; i < countPokemons; i++) {
          let pokemon = {}
          fetch(list[i].url)
            .then(response => {
              return response.json();
            })
            .then(data => {
              pokemon = data;
              return data;
            })
            .then(details => {
              fetch(details.species.url)
                .then(data => data.json())
                .then(data => {
                  pokemon.evolves_from = data.evolves_from_species !== null ? data.evolves_from_species.name : null;
                  this.setState({ pokemonList: [...this.state.pokemonList, pokemon] })
                })
            })
        }
      })
  }
