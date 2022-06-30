
import css from './MoviesSection.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../components/Movie/Movie'
import { Outlet, Link, useParams } from "react-router-dom"

interface Movies {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
}

const apiKey = process.env.REACT_APP_API_KEY

export const MoviesSection = (props: { section: string }) => {

	const params = useParams()

	const { section } = props

	const [movies, setMovies] = useState<Movies[] | undefined>()
	const [page, setPage] = useState(1)

	const fetchMovies = useCallback(async () => {
		const movies = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&include_adult=false
		&language=en-US
		&page=${page}
		&sort_by=${section == 'trending' ? 'popularity.desc' : 'release_date.desc&vote_count.gte=20'}
		`).then(r => r.json())
		setMovies(movies.results)
		console.log('section')
	}, [page])

	useEffect(() => { fetchMovies() }, [fetchMovies])

	return (
		<>
			<h1>{section == 'trending' ? 'Trending Right Now 🔥' : 'Latest Releases 🍿'}</h1>
			<div className={css.main}>
				{movies ?
					movies.map(movie =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					) : <h1>Loading</h1>}
			</div>
			<Outlet />
		</>
	)
}