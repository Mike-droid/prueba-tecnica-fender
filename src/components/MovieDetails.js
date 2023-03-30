import Link from "next/link"
import { useState, useEffect } from "react"
import styles from '@/styles/MovieDetail.module.scss'

export const MovieDetails = ({ movie }) => {
  const [charactersInfo, setCharactersInfo] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharacters() {
      const promises = movie.characters.map(async (url) => {
        const response = await fetch(url)
        const charData = await response.json()
        return charData
      })
      const data = await Promise.all(promises)
      setCharactersInfo(data)
      setLoading(false)
    }
    fetchCharacters()
  }, [movie.characters])

  const getCharacterUrl = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0])
    return id;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.movieTitle}>
        Episode {movie.episode_id}: {movie.title}
      </h2>
      <p className={styles.crawl}>{movie.opening_crawl}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Director: {movie.director}</p>
      <p>Producer(s): {movie.producer}</p>
      {
        loading? <p>Loading characters...</p> : (
          <>
            <h3>Characters in the movie:</h3>
            <ul className={styles.charactersList}>
              {charactersInfo.map((char) => {
                const newId = getCharacterUrl(char)
                return (
                  <li key={char.name} className={styles.char}>
                    <Link href={`/characters/${newId}`}>
                      {char.name}
                    </Link>
                  </li>
              )})}
            </ul>
          </>
        )
      }
    </div>
  )
}
