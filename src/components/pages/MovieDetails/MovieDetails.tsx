import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import css from './MovieDetails.module.scss'
import { MovieDetail } from "../../../interfaces/Movie"
import { CircularProgress, Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star'
import { LoadingScreen } from "../../Layout/LoadingScreen/LoadingScreen"
import { Movie } from "../../Movie/Movie"

const apiKey = process.env.REACT_APP_API_KEY


export const MovieDetails = () => {

	const params = useParams()
	const { id, title } = params

	const [movie, setMovie] = useState<MovieDetail>()
	const [similars, setSimilars] = useState<any>()
	const [load, setLoad] = useState(false)

	useEffect(() => {
		setLoad(false)
		async function fetchMovie() {
			const movie = await fetch(`
			https://api.themoviedb.org/3/movie/${id}
			?api_key=${apiKey}
			&language=en-US
			&append_to_response=videos,credits
			`)
				.then(r => r.json())
			setMovie(movie)
		}
		async function fetchSimilars() {
			const similars = await fetch(`
			https://api.themoviedb.org/3/movie/${id}/
			similar?api_key=${apiKey}
			&language=en-US
			`)
				.then(r => r.json())
			setSimilars(similars.results)
			setLoad(true)
		}
		fetchMovie()
		fetchSimilars()
	}, [id])

	let trailer = undefined
	function videoTrailer() {
		//This tries to determine which video is a movie trailer
		//If we dont get a 'trailer' keyword we stick to the first video
		const videos = movie && movie.videos?.results
		if (videos.length > 0) {
			const videoName = videos.find((vid: any) =>
				vid.name.includes('trailer') || vid.name.includes('Trailer')
			)
			trailer = videoName ? videoName.key : videos[0].key
			return true
		}
		return false
	}

	const poster = movie?.poster_path ?
		`https://image.tmdb.org/t/p/w300${movie.poster_path}` :
		'/images/movie_thumbnail.svg'

	const default_thumb = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'

	if (movie && similars && load) {
		return <div className={css.details}>
			<div className={css.header}>
				<h1>{movie.title} ({movie.release_date?.split('-')[0]})
				</h1>
				<h1><StarIcon fontSize='large' sx={{ color: 'darkorange' }} /> {movie.vote_average}</h1>
			</div>
			<div className={css.mainMedia}>
				<img className={css.poster} src={poster} />
				{videoTrailer() &&
					<img className={css.trailer} src={`https://img.youtube.com/vi/${trailer}/maxresdefault.jpg`} />
				}
			</div>
			<div>
				<h2>Sinopsis</h2>
				<h4>{movie.overview}</h4>
			</div>
			<h1>Cast</h1>
			<div className={css.cast}>
				<div className={css.castGradient}>				</div>
				{movie.credits?.cast.map((act: any, i: number) => {
					const img = act.profile_path ?
						`https://image.tmdb.org/t/p/w200${act.profile_path}` :
						default_thumb
					return (
						<div className={css.act} key={i}>
							<div>
								<img src={img} width={'130px'} />
								<p>{act.name}</p>
								<p>{act.character}</p>
							</div>
						</div>
					)
				}
				)}
			</div>
			<div>
				<h1>Similar movies</h1>
				<div className={css.similar}>
					{similars.map((movie: any) => <Movie key={movie.id} movie={movie} />)}
				</div>
			</div>
			<div className={css.backdrops}>
				<img className={css.backdrop1} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
			</div>

		</div>
	}

	return <LoadingScreen />
}