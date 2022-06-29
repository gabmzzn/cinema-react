import css from './Header.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<div className={css.content}>
					<Link to='/'>
						<h2>React Movies</h2>
					</Link>
				</div>
			</div>
		</div>)
}