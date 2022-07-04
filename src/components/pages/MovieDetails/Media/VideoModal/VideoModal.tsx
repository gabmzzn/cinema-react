import Modal from "@mui/material/Modal/Modal"
import Fade from "@mui/material/Fade/Fade"
import Button from '@mui/material/Button'
import css from './VideoModal.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export const VideoModal = (movie: any) => {

	return (
		<Modal
			sx={{ overflowY: 'scroll' }}
			open={movie.modalOpen}
			disableAutoFocus={true}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			hideBackdrop
		>
			<Fade in={movie.modalOpen}>
				<div className={css.trailerModal} onClick={movie.onClickModalClose}>
					<iframe width="937" height="526" src={`https://www.youtube.com/embed/${movie.trailer}?modestbranding=1&autohide=1&showinfo=0&autoplay=1`}
						className={css.trailerVideo}
						title="Video"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
					<div className={css.closeButton}>
						<Button variant="outlined">
							<CloseRoundedIcon sx={{ fontSize: '1.95rem' }} />
						</Button>
					</div>
				</div>
			</Fade>
		</Modal>
	)
}