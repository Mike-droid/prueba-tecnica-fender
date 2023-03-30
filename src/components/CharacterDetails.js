import { useState, useEffect } from "react"

export const CharacterDetails = ({ character }) => {
  const [showWorldInfo, setShowWorldInfo] = useState(false)
  const [worldInfo, setWorldInfo] = useState({})
  const [films, setFilms] = useState([])

  useEffect(() => {
    async function fetchFilms() {
      const promises = character.films.map(async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
      })
      const data = await Promise.all(promises)
      setFilms(data);
    }
    fetchFilms()
  }, [character.films]);

  useEffect(() => {
    async function fetchWorld() {
      const response = await fetch(character.homeworld)
      const data = await response.json()
      console.log(data)
      setWorldInfo(data)
      return data
    }
    fetchWorld()
  }, [character.homeworld])

  const toggleWorldInfo = () => {
    setShowWorldInfo(!showWorldInfo)
  }

  return (
    <>
      <h1>{character.name}</h1>
      <h2>Data:</h2>
      <p>Birth year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
      <p>Hair color: {character.hair_color}</p>
      <p>Eye color: {character.eye_color}</p>
      <br />
      <p onClick={toggleWorldInfo}>Homeworld name: {worldInfo.name}</p>
      {showWorldInfo && (
        <>
          <p>Homeworld population: {worldInfo.population}</p>
          <p>Homeworld climate: {worldInfo.climate}</p>
          <p>Homeworld gravity: {worldInfo.gravity}</p>
        </>
      )}
      <br />
      <h3>Films:</h3>
      <ul>
        {
          films.map((film) => (
            <li key={film.title}>{film.title}</li>
          ))
        }
      </ul>
    </>
  )
}
