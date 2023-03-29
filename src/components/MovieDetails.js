import Link from "next/link"
import { useState, useEffect } from "react"

export const MovieDetails = ({ movie }) => {
  const [charactersInfo, setCharactersInfo] = useState([])

  useEffect(() => {
    async function fetchCharacters() {
      const promises = movie.characters.map(async (url) => {
        const response = await fetch(url)
        const charData = await response.json()
        console.log('charData: ', charData);
        return charData
      })
      const data = await Promise.all(promises)
      setCharactersInfo(data)
    }
    fetchCharacters()
  }, [movie.characters])

  return (
    <div>
      <h2>
        Episode {movie.episode_id}: {movie.title}
      </h2>
      <p>Release date: {movie.release_date}</p>
      <p>Director: {movie.director}</p>
      <p>Producer(s): {movie.producer}</p>
      <p>Opening crawl: {movie.opening_crawl}</p>
      <ul>
        {charactersInfo.map(char => (
          <li key={char.name}>
            <Link href={char.url}>
              {char.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
