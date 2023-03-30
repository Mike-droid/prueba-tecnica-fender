import { useState, useEffect } from "react"

export const CharacterDetails = ({ character }) => {
  const [showWorldInfo, setShowWorldInfo] = useState(false)
  const [worldInfo, setWorldInfo] = useState({})
  const [films, setFilms] = useState([])
  const [loadingFilms, setLoadingFilms] = useState(true)
  const [loadingWorlds, setLoadingWorlds] = useState(true)

  useEffect(() => {
    async function fetchFilms() {
      const promises = character.films.map(async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
      })
      const data = await Promise.all(promises)
      setFilms(data);
      setLoadingFilms(false);
    }
    fetchFilms()
  }, [character.films]);

  useEffect(() => {
    async function fetchWorld() {
      const response = await fetch(character.homeworld)
      const data = await response.json()
      setWorldInfo(data)
      setLoadingWorlds(false);
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
      {
        loadingWorlds? <p>Loading world...</p> : ( <p onClick={toggleWorldInfo}>Homeworld name: {worldInfo.name}</p> )
      }
      {showWorldInfo && (
        <>
          <p>Homeworld population: {worldInfo.population}</p>
          <p>Homeworld climate: {worldInfo.climate}</p>
          <p>Homeworld gravity: {worldInfo.gravity}</p>
        </>
      )}
      <h3>Films:</h3>
      {
        loadingFilms? <p>Loading films...</p> : (
          <ul>
            {
              films.map((film) => (
                <li key={film.title}>{film.title}</li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}
