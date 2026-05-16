const BASE_URL = 'https://pokeapi.co/api/v2'

/**
 * Retorna lista paginada de pokémons.
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<{ count: number, results: { name: string, url: string }[] }>}
 */
export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

/**
 * Retorna ficha normalizada de um pokémon pelo nome ou id.
 * @param {string|number} nameOrId
 */
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

/**
 * Extrai o id numérico a partir da URL da PokeAPI.
 * Ex: "https://pokeapi.co/api/v2/pokemon/1/" → 1
 */
export function idFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}
