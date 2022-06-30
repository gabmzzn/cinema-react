
import css from './MoviesSection.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../Movie/Movie'
import { Outlet, Link, useParams, useNavigate } from "react-router-dom"
import MovieRating from '../../Layout/MovieRating/MovieRating'
import Pagination from '@mui/material/Pagination'
import { MovieSearch } from '../../../interfaces/Movie'

const apiKey = process.env.REACT_APP_API_KEY

export const MoviesSection = (props: { section: string, title: string, sortBy: string }) => {

	let params = useParams()
	let navigate = useNavigate()

	const { section, title, sortBy } = props

	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[] | undefined>()
	const [movies, setMovies] = useState<MovieSearch[] | undefined>()
	const [totalPages, setTotalPages] = useState<number>()

	const fetchMovies = useCallback(async () => {
		const movies = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&include_adult=false
		&language=en-US
		&page=${params.page}
		&sort_by=${sortBy}
		`).then(r => r.json())
		setMovies(movies.results)
		setFetchedMovies(movies.results)
		setTotalPages(movies.total_pages >= 500 ? 500 : movies.total_pages)
	}, [params.page])

	useEffect(() => { fetchMovies() }, [fetchMovies])

	const [rating, setRating] = useState<number | null>(null)

	useEffect(() => {
		if (rating) {
			console.log(fetchedMovies)
			const moviesByRating = fetchedMovies?.filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			console.log(moviesByRating)
			setMovies(moviesByRating)
		} else {
			setMovies(fetchedMovies)
		}
	}, [rating])

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		navigate(`/discover/${section}/${page}`)
	}

	return (
		<>
			<div className={css.header}>
				<h1>{title}</h1>
				<MovieRating
					value={rating}
					handleChange={(e: number, value: number) => setRating(value)}
				/>
			</div>
			<div className={css.main}>
				{movies && params.page ?
					<>
						{movies.map(movie =>
							<Link
								to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
								key={movie.id}
							>
								<Movie movie={movie} />
							</Link>
						)}
						<Pagination count={totalPages} page={parseInt(params.page)} onChange={handlePageChange} />
					</>
					: <h1>Loading</h1>}
				{movies && movies.length == 0 && <h1>Oops! No movies found with your selected rating</h1>}
			</div>
			<Outlet />
		</>
	)
}