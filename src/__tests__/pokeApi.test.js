import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from './mocks/server.js'
import { fetchPokemon, fetchPokemonList, idFromUrl } from '../services/pokeApi.js'

// ─────────────────────────────────────────────────────────────
// fetchPokemon
// ─────────────────────────────────────────────────────────────
describe('fetchPokemon', () => {
  it('retorna dados normalizados pelo nome', async () => {
    const p = await fetchPokemon('pikachu')

    expect(p.id).toBe(25)
    expect(p.name).toBe('pikachu')
    expect(p.types).toContain('electric')
    expect(p.sprite).toBeTruthy()
    expect(p.stats).toHaveLength(6)
    expect(p.stats[0]).toEqual({ name: 'hp', value: 35 })
    expect(p.abilities).toContain('static')
    expect(p.height).toBe(4)
    expect(p.weight).toBe(60)
  })

  it('retorna dados normalizados pelo id numérico', async () => {
    const p = await fetchPokemon(25)
    expect(p.id).toBe(25)
    expect(p.name).toBe('pikachu')
  })

  it('lança erro com mensagem HTTP quando a API retorna 404', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/missigno', () =>
        new HttpResponse(null, { status: 404 })
      )
    )

    await expect(fetchPokemon('missigno')).rejects.toThrow('HTTP 404')
  })

  it('lança erro quando a API retorna 500', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/quebrado', () =>
        new HttpResponse(null, { status: 500 })
      )
    )

    await expect(fetchPokemon('quebrado')).rejects.toThrow('HTTP 500')
  })
})

// ─────────────────────────────────────────────────────────────
// fetchPokemonList
// ─────────────────────────────────────────────────────────────
describe('fetchPokemonList', () => {
  it('retorna count total e lista de resultados', async () => {
    const list = await fetchPokemonList()

    expect(list.count).toBe(1302)
    expect(Array.isArray(list.results)).toBe(true)
    expect(list.results.length).toBeGreaterThan(0)
    expect(list.results[0]).toHaveProperty('name')
    expect(list.results[0]).toHaveProperty('url')
  })

  it('cada resultado tem nome e URL válidos', async () => {
    const list = await fetchPokemonList()

    for (const r of list.results) {
      expect(typeof r.name).toBe('string')
      expect(r.url).toMatch(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/$/)
    }
  })
})

// ─────────────────────────────────────────────────────────────
// idFromUrl
// ─────────────────────────────────────────────────────────────
describe('idFromUrl', () => {
  it('extrai o id numérico corretamente', () => {
    expect(idFromUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe(1)
    expect(idFromUrl('https://pokeapi.co/api/v2/pokemon/150/')).toBe(150)
    expect(idFromUrl('https://pokeapi.co/api/v2/pokemon/1025/')).toBe(1025)
  })
})
