import styles from './PokemonCard.module.css'

const TYPE_COLORS = {
  fire: '#f0783c', water: '#4896f0', grass: '#5ab85a', electric: '#f0c030',
  psychic: '#e05880', ice: '#78c8f0', dragon: '#7038f8', dark: '#705848',
  fairy: '#f0a8c8', normal: '#a8a878', fighting: '#c03028', flying: '#a890f0',
  poison: '#a040a0', ground: '#e0c068', rock: '#b8a038', bug: '#a8b820',
  ghost: '#705898', steel: '#b8b8d0',
}

function padId(id) {
  return String(id).padStart(3, '0')
}

export default function PokemonCard({ id, name, sprite, types, onClick }) {
  const mainType = types?.[0] ?? 'normal'
  const color = TYPE_COLORS[mainType] ?? '#a8a878'

  return (
    <button className={styles.card} onClick={onClick} style={{ '--type-color': color }}>
      <span className={styles.num}>#{padId(id)}</span>
      <div className={styles.imgWrap}>
        {sprite
          ? <img src={sprite} alt={name} className={styles.img} loading="lazy" />
          : <div className={styles.noImg}>?</div>
        }
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.types}>
        {types?.map(t => (
          <span
            key={t}
            className={styles.type}
            style={{ background: TYPE_COLORS[t] ?? '#888', color: '#fff' }}
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  )
}
