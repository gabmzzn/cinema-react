import Button from "@mui/material/Button/Button"
import Pagination from "@mui/material/Pagination/Pagination"
import { MovieDiscover } from "../../../../../interfaces/Movie"
import { Movie } from "../../../../Layout/Movie/Movie"
import MovieRating from "../../../../Layout/MovieRating/MovieRating"
import css from './FullSection.module.scss'
import { Outlet, Params, useNavigate } from "react-router-dom"
import { MovieCard } from "./MovieCard/MovieCard"

interface FullSectionProps {
	title: string
	section: string
	rating: number | null
	params: Readonly<Params<string>> | undefined
	movies: MovieDiscover[]
	onRatingChange: (value: number | null) => void
	totalPages: number
	cards?: boolean
}

/*
* Full version display with when no 'mini' is true
* Here we show FilterByVote, ViewAll, and Pagination controls
*/
export const FullSection = ({ title, rating, section, params, movies, onRatingChange, totalPages, cards }: FullSectionProps) => {

	/* 
	 * Handles pagination, the fetchMovies() function from parent componet gets 
	 * triggered automatically cause it's useEffect function
	 * is monitoring Routes (params.page) changes
	 */
	let navigate = useNavigate()
	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		section !== 'search' ?
			navigate(`/discover/${section}/${page}`) :
			navigate(`/search/${params?.query}/${page}`)
		onRatingChange(null)
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
						handleChange={(e, value) => onRatingChange(value)}
					/>
				</Button>
			</div>
			<div className={css.main}>
				{params?.page && movies.length !== 0 &&
					<>
						{section !== 'search' ?
							movies.map(movie =>
								<Movie
									key={movie.id}
									id={movie.id}
									title={movie.title}
									poster_path={movie.poster_path}
								/>) :
							movies.map((movie: MovieDiscover) =>
								<MovieCard key={movie.id} movie={movie} />)
						}
						<div className={css.pagination}>
							<Pagination
								page={parseInt(params.page)}
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