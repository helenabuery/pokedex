const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchPokemon(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other['official-artwork'].front_default
      ?? data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    stats: data.stats.map(s => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name),
    baseExperience: data.base_experience,
  }
}

export function idFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}