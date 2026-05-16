import { http, HttpResponse } from 'msw'

const PIKACHU = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: { 'official-artwork': { front_default: 'https://artwork/25.png' } },
  },
  types: [{ type: { name: 'electric' } }],
  stats: [
    { stat: { name: 'hp' }, base_stat: 35 },
    { stat: { name: 'attack' }, base_stat: 55 },
    { stat: { name: 'defense' }, base_stat: 40 },
    { stat: { name: 'special-attack' }, base_stat: 50 },
    { stat: { name: 'special-defense' }, base_stat: 50 },
    { stat: { name: 'speed' }, base_stat: 90 },
  ],
  abilities: [
    { ability: { name: 'static' } },
    { ability: { name: 'lightning-rod' } },
  ],
  height: 4,
  weight: 60,
  base_experience: 112,
}

const LIST_RESPONSE = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur',   url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
}

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () =>
    HttpResponse.json(PIKACHU)
  ),

  http.get('https://pokeapi.co/api/v2/pokemon/25', () =>
    HttpResponse.json(PIKACHU)
  ),

  http.get('https://pokeapi.co/api/v2/pokemon', () =>
    HttpResponse.json(LIST_RESPONSE)
  ),
]
