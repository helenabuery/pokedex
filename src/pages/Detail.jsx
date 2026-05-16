import { useState, useEffect } from 'react'
import { fetchPokemon } from '../services/pokeApi.js'
import styles from './Detail.module.css'

const TYPE_COLORS = {
  fire: '#f0783c', water: '#4896f0', grass: '#5ab85a', electric: '#f0c030',
  psychic: '#e05880', ice: '#78c8f0', dragon: '#7038f8', dark: '#705848',
  fairy: '#f0a8c8', normal: '#a8a878', fighting: '#c03028', flying: '#a890f0',
  poison: '#a040a0', ground: '#e0c068', rock: '#b8a038', bug: '#a8b820',
  ghost: '#705898', steel: '#b8b8d0',
}

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Sp. Ataque',
  'special-defense': 'Sp. Defesa',
  speed: 'Velocidade',
}

function padId(id) {
  return String(id).padStart(3, '0')
}

export default function Detail({ id, onBack }) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchPokemon(id)
      .then(setPokemon)
      .catch(() => setError('Não foi possível carregar o pokémon.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className={styles.page}>
        <button className={styles.back} onClick={onBack}>← voltar</button>
        <div className={styles.center}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <button className={styles.back} onClick={onBack}>← voltar</button>
        <p className={styles.error}>{error}</p>
      </div>
    )
  }

  const mainType = pokemon.types[0]
  const typeColor = TYPE_COLORS[mainType] ?? '#888'

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onBack}>← voltar</button>

      <div className={styles.card} style={{ '--type-color': typeColor }}>
        <div className={styles.top}>
          <div className={styles.meta}>
            <span className={styles.num}>#{padId(pokemon.id)}</span>
            <h1 className={styles.name}>{pokemon.name}</h1>
            <div className={styles.types}>
              {pokemon.types.map(t => (
                <span
                  key={t}
                  className={styles.typeBadge}
                  style={{ background: TYPE_COLORS[t] ?? '#888' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.imgWrap}>
            {pokemon.sprite && (
              <img src={pokemon.sprite} alt={pokemon.name} className={styles.img} />
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Altura</span>
            <span className={styles.infoVal}>{(pokemon.height / 10).toFixed(1)} m</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Peso</span>
            <span className={styles.infoVal}>{(pokemon.weight / 10).toFixed(1)} kg</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Exp. base</span>
            <span className={styles.infoVal}>{pokemon.baseExperience ?? '—'}</span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Habilidades</h2>
          <div className={styles.abilities}>
            {pokemon.abilities.map(a => (
              <span key={a} className={styles.ability}>{a}</span>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Stats base</h2>
          <div className={styles.stats}>
            {pokemon.stats.map(s => (
              <div key={s.name} className={styles.statRow}>
                <span className={styles.statName}>{STAT_LABELS[s.name] ?? s.name}</span>
                <span className={styles.statVal}>{s.value}</span>
                <div className={styles.barBg}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${Math.min(100, (s.value / 255) * 100)}%`,
                      background: typeColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
