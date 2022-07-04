import css from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import Button from '@mui/material/Button/Button'
import { InputSearch } from './InputSearch/InputSearch'


export const Navbar = () => {

	const [scroll, setScroll] = useState(false)

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 5)
		})
	}, [])

	return (
		<div className={css.header}>
			<div className={
				`${css.navbar} 
				${scroll ? css.background : css.noBackground}`}
			>
				<div className={css.content}>
					<Link to='/discover/'>
						<h1 className={css.logo}>CINEMA<LocalMoviesIcon />REACT</h1>
					</Link>
					<InputSearch />
					<div className={css.buttons}>
						<Button variant="outlined">LOG IN</Button>
						<Button variant="contained"><b>REGISTER</b></Button>
					</div>
				</div>
			</div>
		</div>)
}