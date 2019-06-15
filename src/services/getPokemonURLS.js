const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/?limit=25";

const pokemonURLS = () => fetch(`${ENDPOINT}`).then(res => res.json());

export { pokemonURLS };