import { useState, useEffect } from 'react'
import { fetchPokemonList, fetchPokemon, idFromUrl } from '../services/pokeApi.js'
import PokemonCard from '../components/PokemonCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import styles from './Home.module.css'

const PAGE_SIZE = 20

export default function Home({ onSelect }) {
  const [pokemons, setPokemons] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    loadPage(offset)
  }, [offset])

  async function loadPage(off) {
    setLoading(true)
    setError(null)
    setSearchResult(null)
    try {
      const list = await fetchPokemonList(PAGE_SIZE, off)
      setTotal(list.count)
      const details = await Promise.all(
        list.results.map(r => fetchPokemon(idFromUrl(r.url)))
      )
      setPokemons(details)
    } catch (e) {
      setError('Erro ao carregar pokémons. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(query) {
    if (!query) {
      setSearchResult(null)
      return
    }
    setSearching(true)
    setError(null)
    try {
      const p = await fetchPokemon(query)
      setSearchResult(p)
    } catch {
      setError(`Pokémon "${query}" não encontrado.`)
      setSearchResult(null)
    } finally {
      setSearching(false)
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1

  const displayed = searchResult ? [searchResult] : pokemons

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoAccent}>Poké</span>dex
        </div>
        <p className={styles.sub}>
          {total > 0 && !searchResult ? `${total.toLocaleString('pt-BR')} pokémons catalogados` : ''}
        </p>
      </header>

      <div className={styles.searchWrap}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {(loading || searching) && (
        <div className={styles.loadingGrid}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {!loading && !searching && (
        <>
          <div className={styles.grid}>
            {displayed.map(p => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                sprite={p.sprite}
                types={p.types}
                onClick={() => onSelect(p.id)}
              />
            ))}
          </div>

          {!searchResult && total > 0 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setOffset(o => Math.max(0, o - PAGE_SIZE))}
                disabled={offset === 0}
              >
                ← anterior
              </button>
              <span className={styles.pageInfo}>
                {currentPage} / {totalPages}
              </span>
              <button
                className={styles.pageBtn}
                onClick={() => setOffset(o => o + PAGE_SIZE)}
                disabled={offset + PAGE_SIZE >= total}
              >
                próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
