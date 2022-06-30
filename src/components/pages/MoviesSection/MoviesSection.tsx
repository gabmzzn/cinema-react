import css from './MoviesSection.module.scss'
import { useEffect, useState } from 'react'
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

	useEffect(() => {
		async function fetchMovies() {
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
		}
		fetchMovies()
	}, [params.page, sortBy])

	const [rating, setRating] = useState<number | null>(null)

	useEffect(() => {
		if (rating) {
			const moviesByRating = fetchedMovies?.filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			setMovies(moviesByRating)
		} else {
			setMovies(fetchedMovies)
		}
	}, [rating, fetchedMovies])

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		navigate(`/discover/${section}/${page}`)
		setRating(null)
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
				{movies && params.page && movies.length !== 0 ?
					<>
						{movies.map(movie =>
							<Link
								to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
								key={movie.id}
							>
								<Movie movie={movie} />
							</Link>
						)}
						<div className={css.pagination}>
							<Pagination
								page={parseInt(params.page)}
								onChange={handlePageChange}
								count={totalPages}
								siblingCount={3} size='large'
							/>
						</div>
					</>
					: <h1>Loading</h1>}
				{movies && movies.length === 0 && <h1>Oops! No movies found with your selected rating</h1>}
			</div>
			<Outlet />
		</>
	)
}