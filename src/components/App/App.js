import React from 'react';
import { pokemonURLS } from '../../services/getPokemonURLS';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonURLS: [],
      pokemonList: [],
    }
  }

  componentDidMount() {
    pokemonURLS()
      .then(data => this.setState({ pokemonURLS: data.results },() => {
        console.log('primer fetch', this.state.pokemonURLS)
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

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}
export default App;
