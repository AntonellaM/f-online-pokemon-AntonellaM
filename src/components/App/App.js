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
      .then(data => this.setState({ pokemonURLS: data.results },() => {
        for (const pokemonData of this.state.pokemonURLS) {
          fetch(`${pokemonData.url}`).then(res => res.json()).then(details => {
            this.state.pokemonList.push(details);
            let newPokemonList = this.state.pokemonList;
            this.setState({ pokemonList: newPokemonList })
          })
        }
      }
    ))
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
                <PokeList list={this.state.pokemonList.filter(pokemon => pokemon.name.includes(this.state.filterByName))}/> 
              </React.Fragment>
            )}/>
            <Route path="/pokemon/:id" render={routerProps => {
              const pokemonSelected = this.state.pokemonList.find(pokemon => parseInt(pokemon.id) === parseInt(routerProps.match.params.id));
              return pokemonSelected !== undefined ?
              <Pokemon pokemon={pokemonSelected}/> :
              <div className="loader__container">
                <div class="lds-ripple"><div></div><div></div></div>
              </div>
            }}/>
          </Switch>
        </main>
    );
  }
}
export default App;
