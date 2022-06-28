import css from './Header.module.scss'

export const Header = () => {
	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<div className={css.content}>
					<h2>React Movies</h2>
					{/* <Rating size="large" /> */}
				</div>
			</div>
		</div>)
}