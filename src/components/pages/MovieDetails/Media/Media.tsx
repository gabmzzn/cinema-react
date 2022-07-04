import css from './Media.module.scss'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Chip from '@mui/material/Chip'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import Button from '@mui/material/Button'
import { VideoModal } from './VideoModal/VideoModal'
import { useState } from 'react'
import { MovieDetail } from '../../../../interfaces/Movie'

interface MediaProps {
	poster_path: string | null
	trailer: string
	runtime: number
	genres: [{ id: number; name: string }]
}

export const Media = (movie: MediaProps) => {

	const poster = movie.poster_path ?
		`https://image.tmdb.org/t/p/w300${movie.poster_path}` :
		'/images/movie_thumbnail.svg'

	const [modalOpen, setModalOpen] = useState(false)

	return (
		<div className={css.mainMedia}>
			<VideoModal
				trailer={movie.trailer}
				modalOpen={modalOpen}
				onClickModalClose={() => setModalOpen(false)}
			/>
			<div>
				<img alt="Movie poster" className={css.poster} src={poster} />
			</div>
			<div style={{ width: '67%' }}>
				<div className={css.trailer} onClick={() => setModalOpen(true)}>
					<div className={css.playButton}>
						<PlayArrowRoundedIcon sx={{ fontSize: '6em' }} />
					</div>
					<img alt="Movie trailer" className={css.trailerImage}
						src={`https://i.ytimg.com/vi/${movie.trailer}/0.jpg`}
					/>
				</div>
				<div className={css.info}>
					<Button variant="outlined">
						<b style={{ display: 'flex', alignItems: 'center' }}>
							BUY TICKES NOW
							<LocalActivityIcon fontSize="small" />
						</b>
					</Button>
					{movie.genres.map((g: { name: string }, i: number) =>
						<Chip
							key={i} color="primary" variant="outlined"
							label={g.name}
						/>
					)}
					<Chip className={css.runtime}
						color="primary" variant="outlined"
						label={`Runtime: ${movie.runtime} mins`}
					/>
				</div>
			</div>
		</div>
	)
}