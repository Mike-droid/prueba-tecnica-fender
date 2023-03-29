import { SWAPI_URL } from '../api/apiURL';
import { MovieDetails } from '@/components/MovieDetails';

export default function Episode({ movie }) {
  return <MovieDetails movie={movie}/>
}

export async function getServerSideProps({ params }) {
  const { id } = params
  try {
    const response = await fetch(`${SWAPI_URL}/films/${id}`);
    const movie = await response.json();
    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    return {
      props: {
        movie: [],
      },
    };
  }
}
