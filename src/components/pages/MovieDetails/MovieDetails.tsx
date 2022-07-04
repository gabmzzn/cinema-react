import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import css from './MovieDetails.module.scss'
import { MovieDetail } from "../../../interfaces/Movie"
import { LoadingScreen } from "../../Layout/LoadingScreen/LoadingScreen"
import { MoviesSection } from "../MoviesSection/MoviesSection"
import { Cast } from "./Cast/Cast"
import { Header } from "./Header/Header"
import { Media } from "./Media/Media"
import { Overview } from "./Overview/Overview"
const apiKey = process.env.REACT_APP_API_KEY

export const MovieDetails = () => {

	let params = useParams()
	const { id } = params
	const { pathname } = useLocation()
	const [movie, setMovie] = useState<MovieDetail>()
	const [load, setLoad] = useState(false)
	const [trailer, setTrailer] = useState('')

	useEffect(() => {
		setLoad(false)
		async function fetchMovie() {
			const movie = await fetch(`
			https://api.themoviedb.org/3/movie/${id}
			?api_key=${apiKey}
			&language=en-US
			&append_to_response=videos,credits
			`).then(r => r.json())

			//This tries to determine which video is a movie trailer
			//If we dont get a 'trailer' keyword we stick to the first video
			if (movie.videos.results.length > 0) {
				const videoWithTrailer = movie.videos.results.find((vid: { name: string }) =>
					vid.name.includes('trailer') || vid.name.includes('Trailer'))
				setTrailer(videoWithTrailer ? videoWithTrailer.key : movie.videos.results[0].key)
			}
			setMovie(movie)
			setLoad(true)
		}
		fetchMovie()
	}, [id, pathname])

	if (movie && load) {
		return (
			<div className={css.details}>
				<Header
					title={movie.title}
					release_date={movie.release_date}
					vote_average={movie.vote_average}
				/>
				<Media
					poster_path={movie.poster_path}
					trailer={trailer}
					genres={movie.genres}
					runtime={movie.runtime}
				/>
				<Overview overview={movie.overview} />
				<Cast cast={movie.credits.cast} />
				<MoviesSection
					mini={20}
					overflow
					section={'similar'}
					movieId={movie.id}
					title={'Similar movies to ' + movie.title}
					sortBy={'popularity.desc'}
				/>
				<div className={css.backdrop}>
					<img
						alt={movie.title}
						src={`https://image.tmdb.org/t/p/w45${movie.backdrop_path}`}
					/>
				</div>
			</div>
		)
	}

	return <LoadingScreen />
}