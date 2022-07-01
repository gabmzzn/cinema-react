import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import css from './MovieDetails.module.scss'
import { MovieDetail } from "../../../interfaces/Movie"
import { CircularProgress, Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star'

const apiKey = process.env.REACT_APP_API_KEY


export const MovieDetails = () => {

	const params = useParams()
	const { id, title } = params

	const [movie, setMovie] = useState<MovieDetail>()

	useEffect(() => {
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
		fetchMovie()
	}, [])

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

	if (movie) {
		return <div className={css.details}>
			<div className={css.header}>
				<h1>{movie.title} ({movie.release_date?.split('-')[0]})
				</h1>
				<h1><StarIcon fontSize='large' sx={{ color: 'darkorange' }} /> {movie.vote_average}</h1>
			</div>

			<div className={css.mainMedia}>
				<img className={css.poster} src={poster} />
				{videoTrailer() &&
					<iframe width="900" height="400" src={`https://www.youtube.com/embed/${trailer}`}
						title={movie.original_title}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen style={{ borderRadius: '25px' }}
					/>}
			</div>
			<h4>{movie.overview}</h4>
			<div className={css.cast}>
				{movie.credits?.cast.slice(0, 10).map((act: any) => {
					const img = act.profile_path ?
						`https://image.tmdb.org/t/p/w500${act.profile_path}` :
						'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
					return (
						<div className={css.act}>
							<div>
								<h4>{act.name}</h4>
								{/* <h5>{act.character}</h5> */}
								<img src={img} width={'200px'} />
								{/* <p>{act.known_for_department}</p> */}
							</div>
						</div>
					)
				}
				)}
			</div>
			<div className={css.backdrops}>
				<img className={css.backdrop1} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
			</div>

		</div>
	}

	return <CircularProgress size={'200px'} />
}