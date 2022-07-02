import css from './LoadingScreen.module.scss'
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded'
import LinearProgress from '@mui/material/LinearProgress'

export const LoadingScreen = () => {

	return (
		<div className={css.screen}>
			<div className={css.loader}>
				<LocalMoviesRoundedIcon sx={{ fontSize: "160px" }} />
				<LinearProgress />
			</div>
		</div>)
}