import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SWAPI_URL } from './api/apiURL';

export default function Home({ data }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    data ? setMovies(data) : handleError();
    setLoading(false);
  }, [data]);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error });
  };

  const changeEpisodeId = (id) => {
    let result = id
    result > 3 ? (result -= 3) : (result += 3);
    return result
  }

  return (
    <div>
      <Head>
        <title>Star Wars Movie List</title>
      </Head>
      <section>
        {loading && <p> Loading...</p>}
        {errorState.hasError && <p>Oh no! There is an error!</p>}
        {!loading && !errorState.hasError && (
          <ul>
            {movies?.results?.map((movie) => {
              const newId = changeEpisodeId(movie.episode_id)
              return (
                <li key={movie.title}>
                  <h2>
                    <Link href={`/films/${newId}`}>
                      Episode {movie.episode_id}: {movie.title}
                    </Link>
                  </h2>
                  <p>Release date: {movie.release_date}</p>
                  <p>Director: {movie.director}</p>
                  <p>Producer(s): {movie.producer}</p>
                </li>
            )})}
          </ul>
        )}
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${SWAPI_URL}/films/`);
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
}
