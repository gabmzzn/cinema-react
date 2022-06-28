import css from './Header.module.scss'

export const Header = () => {
	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<h2>React Movies</h2>
			</div>
		</div>)
}