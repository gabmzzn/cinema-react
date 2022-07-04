import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { MovieSearch } from '../../../interfaces/Movie'
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import { MiniSection } from './SectionsModes/MiniSection/MiniSection'
import { FullSection } from './SectionsModes/FullSection/FullSection'
const apiKey = process.env.REACT_APP_API_KEY

interface MoviesSectionProps {
	section: string
	title: string
	sortBy: string
	mini?: number
	top?: boolean
	isLoaded?: () => void
	movieId?: number
	overflow?: boolean
}

/*
* MoviesSection displays on a wrapeable flex-box of Movies components
*	Can be used on portions of page (MiniSection) or as main content of a discovery (FullSection)
*/
export const MoviesSection = (props: MoviesSectionProps) => {

	const { section, title, sortBy, mini, isLoaded, top, movieId, overflow } = props

	const [movies, setMovies] = useState<MovieSearch[] | undefined>()
	const [totalPages, setTotalPages] = useState(0)

	const [loading, setLoading] = useState(true)

	let params = useParams()

	/*
	* Fetch for movies of DISCOVER or SIMILAR acording to props
	* SIMILAR is intended to use when you want to get related movies
	* based on a single movie ID
	*/
	useEffect(() => {
		setLoading(true)
		async function fetchMovies() {
			const movies = await fetch(`
		https://api.themoviedb.org/3/
		${section === 'similar' ? `movie/${movieId}/similar` : 'discover/movie'}
		?api_key=${apiKey}
		&include_adult=false
		&language=en-US
		${mini ? '' : `&page=${params.page}`}
		&sort_by=${sortBy}
		`).then(r => r.json())
			setMovies(movies.results)
			setFetchedMovies(movies.results)
			setTotalPages(movies.total_pages >= 500 ? 500 : movies.total_pages)
			isLoaded && isLoaded()
			setLoading(false)
		}
		fetchMovies()
	}, [params.page, sortBy])

	/* 
 * Handles rating, if we unselect the rating we display the original fetch
 */
	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[]>()
	const [rating, setRating] = useState<number | null>(null)

	useEffect(() => {
		if (rating) {
			const moviesByRating = fetchedMovies?.filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			setMovies(moviesByRating)
		}
		else {
			setMovies(fetchedMovies)
		}
	}, [rating])

	//Here we make sure to not show loading screen when 'mini' is on
	if (loading && !mini) return <LoadingScreen />

	if (movies && mini) {
		return (
			<MiniSection
				top={top}
				title={title}
				section={section}
				movies={movies}
				overflow={overflow}
				miniAmount={mini}
			/>)
	}

	if (movies) {
		return (
			<FullSection
				title={title}
				section={section}
				page={params.page}
				movies={movies}
				rating={rating}
				onRatingChange={value => setRating(value)}
				totalPages={totalPages}
			/>)
	}

	return null
}