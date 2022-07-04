import css from './Footer.module.scss'

export const Footer = () => {
	return (
		<div className={css.footer}>
			<h5>Created by&nbsp;
				<a href="http://gabmz.dev" target="_blank" rel="noopener noreferrer">
					Juan Gabriel Mazzoleni
				</a>, powered by&nbsp;
				<a href="http://developers.themoviedb.org/3/" target="_blank" rel="noopener noreferrer" >
					The Movie Database API
				</a>
			</h5>
		</div>)
}