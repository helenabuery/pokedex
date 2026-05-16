import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const q = value.trim().toLowerCase()
    if (q) onSearch(q)
  }

  function handleClear() {
    setValue('')
    onSearch('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="nome ou número..."
          value={value}
          onChange={e => setValue(e.target.value)}
          spellCheck={false}
        />
        {value && (
          <button type="button" className={styles.clear} onClick={handleClear} aria-label="Limpar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button type="submit" className={styles.btn}>Buscar</button>
    </form>
  )
}
