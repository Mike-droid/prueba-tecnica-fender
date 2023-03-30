import { SWAPI_URL } from '../api/apiURL';
import { CharacterDetails } from '@/components/CharacterDetails';

export default function Character({ character }) {
  return <CharacterDetails character={character}/>
}

export async function getServerSideProps({ params }) {
  const { id } = params
  try {
    const response = await fetch(`${SWAPI_URL}/people/${id}`);
    const character = await response.json();
    return {
      props: {
        character,
      },
    };
  } catch (error) {
    return {
      props: {
        character: [],
      },
    };
  }
}
