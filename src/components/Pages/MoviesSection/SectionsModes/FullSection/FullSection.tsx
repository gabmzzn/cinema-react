import Button from "@mui/material/Button/Button"
import Pagination from "@mui/material/Pagination/Pagination"
import { MovieSearch } from "../../../../../interfaces/Movie"
import { Movie } from "../../../../Layout/Movie/Movie"
import MovieRating from "../../../../Layout/MovieRating/MovieRating"
import css from './FullSection.module.scss'
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

interface FullSectionProps {
	title: string
	section: string
	page: string | undefined
	movies: MovieSearch[]
	onRatingChange: (e: MovieSearch[] | undefined) => void
	totalPages: number
}

export const FullSection = ({ title, section, page, movies, onRatingChange, totalPages }: FullSectionProps) => {

	/* 
	 * Handles rating, if we unselect the rating we display the original fetch
	 */
	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[]>(movies)
	const [rating, setRating] = useState<number | null>(null)

	useEffect(() => {
		if (rating) {
			const moviesByRating = [...fetchedMovies].filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			onRatingChange(moviesByRating)
		}
		else {
			onRatingChange(fetchedMovies)
		}
	}, [rating])

	/* 
	 * Handles pagination, the fetchMovies() function from parent componet gets 
	 * triggered automatically cause it's useEffect function
	 * is monitoring Routes (params.page) changes
	 */
	let navigate = useNavigate()
	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		navigate(`/discover/${section}/${page}`)
		setRating(null)
	}

	return (
		<div className={css.main}>
			<div className={css.header}>
				<h1>{title}</h1>
				<Button variant="outlined">
					<b style={{ margin: '3px 9px 1px 1px' }}>
						FILTER BY VOTE
					</b>
					<MovieRating
						value={rating}
						handleChange={(e, value) => setRating(value)}
					/>
				</Button>
			</div>
			<div className={css.main}>
				{page && movies.length !== 0 &&
					<>
						{movies.map(movie =>
							<Movie
								key={movie.id}
								id={movie.id}
								title={movie.title}
								poster_path={movie.poster_path}
							/>)}
						<div className={css.pagination}>
							<Pagination
								page={parseInt(page)}
								onChange={handlePageChange}
								count={totalPages}
								siblingCount={3} size='large'
							/>
						</div>
					</>}
				{movies.length === 0 && <h1>Oops! No movies found with your selected rating</h1>}
			</div>
			<Outlet />
		</div>)
}