import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import css from './MovieDetails.module.scss'
import { MovieDetail } from "../../../interfaces/Movie"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import StarIcon from '@mui/icons-material/Star'
import Chip from '@mui/material/Chip'
import { LoadingScreen } from "../../Layout/LoadingScreen/LoadingScreen"
import { Movie } from "../../Movie/Movie"
import Button from '@mui/material/Button'
import Modal from "@mui/material/Modal/Modal"
import Fade from "@mui/material/Fade/Fade"
import { CircularProgress, LinearProgress } from "@mui/material"
import { MoviesSection } from "../MoviesSection/MoviesSection"
import { Cast } from "./Cast/Cast"
import { createJSDocCallbackTag } from "typescript"


const apiKey = process.env.REACT_APP_API_KEY


export const MovieDetails = () => {

	let params = useParams()
	const { id } = params

	const [movie, setMovie] = useState<MovieDetail>()
	const [load, setLoad] = useState(false)

	const [trailer, setTrailer] = useState()

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
				const videoWithTrailer = movie.videos.results.find((vid: any) =>
					vid.name.includes('trailer') || vid.name.includes('Trailer')
				)
				setTrailer(videoWithTrailer ? videoWithTrailer.key : movie.videos.results[0].key)
			}

			setMovie(movie)
			setLoad(true)
		}
		fetchMovie()
	}, [id])

	const poster = movie?.poster_path ?
		`https://image.tmdb.org/t/p/w300${movie.poster_path}` :
		'/images/movie_thumbnail.svg'

	const [modalOpen, setModalOpen] = useState(false)

	const [ready, setReady] = useState(true)
	const handleLoad = () => setReady(true)

	if (movie && load) {
		return (
			<div className={css.details}>
				<Modal
					sx={{ overflowY: 'scroll' }}
					open={modalOpen}
					disableAutoFocus={true}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					hideBackdrop
				>
					<Fade in={modalOpen}>
						<div className={css.trailerModal} onClick={() => setModalOpen(false)}>
							<iframe width="937" height="537" src={`https://www.youtube.com/embed/${trailer}?modestbranding=1&autohide=1&showinfo=0&autoplay=1`}
								className={css.trailerVideo}
								title={movie.original_title}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
							<div className={css.closeButton}>
								<Button variant="outlined">CLOSE VIDEO TRAILER</Button>
							</div>
						</div>
					</Fade>
				</Modal>
				<div className={css.header}>
					<h1>{movie.title} ({movie.release_date?.split('-')[0]})</h1>
					<h1><StarIcon fontSize='large' sx={{ color: 'darkorange' }} /> {movie.vote_average}</h1>
				</div>
				<div className={css.mainMedia}>
					<img className={css.poster} src={poster} />
					<div style={{ marginLeft: '35px' }}>
						<div style={{ display: 'flex' }}>
							<div className={css.trailer} onClick={() => setModalOpen(true)}>
								<div className={css.playButton}>
									<PlayArrowRoundedIcon sx={{ fontSize: '6em' }} />
								</div>
								<img className={css.trailerImage} src={`https://i.ytimg.com/vi/${trailer}/0.jpg`} />
							</div>
						</div>
						<div className={css.info}>
							<Button variant="contained">BUY TICKETS</Button>
							{movie.genres.map((g, i) => <Chip key={i} color="primary" label={g.name} />)}
							<h4>Runtime: {movie.runtime} mins ⏱️</h4>
						</div>
					</div>
				</div>
				<div>
					<h2>Sinopsis</h2>
					<h4>{movie.overview}</h4>
				</div>
				<Cast movie={movie} />
				<MoviesSection
					mini={20}
					overflow
					isLoaded={handleLoad}
					section={'similar'}
					movieId={movie.id}
					title={'Similar movies to ' + movie.title}
					sortBy={'popularity.desc'}
				/>
				<div className={css.backdrops}>
					<img className={css.backdrop1} src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`} />
				</div>
			</div>)
	}

	return <LoadingScreen />
}