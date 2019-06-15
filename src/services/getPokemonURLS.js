const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=3";

const pokemonURLS = () => fetch(`${ENDPOINT}`).then(res => res.json());

export { pokemonURLS };