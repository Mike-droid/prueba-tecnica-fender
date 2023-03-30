export const CharacterDetails = ({ character }) => {
  console.log(character)
  return (
    <>
      <h1>{character.name}</h1>
      <h2>Data:</h2>
      <p>Birth year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
      <p>Hair color: {character.hair_color}</p>
      <p>Eye color: {character.eye_color}</p>
      
    </>
  )
}
