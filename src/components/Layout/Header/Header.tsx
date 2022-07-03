import css from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Input from '@mui/material/Input/Input'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import Button from '@mui/material/Button/Button'
export const Header = () => {

	let navigate = useNavigate()
	const [query, setQuery] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (query !== undefined) {
			const timer = setTimeout(() => {
				query !== '' ? navigate(`/search/${query}/1`) : navigate('/discover/')
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [query])

	function handleQuery(query: string, key: boolean) {
		if (query === '') {
			setQuery(query)
		} else if (query.trim().length > 0) {
			key ? setQuery(query) : navigate(`/search/${query}/1`)
		}
	}

	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<div className={css.content}>
					<Link to='/discover/' onClick={() => setQuery('')}>
						<h1 className={css.logo}>CINEMA<LocalMoviesIcon />REACT</h1>
					</Link>
					<div className={css.search}>
						<Input
							placeholder="Search for your favorites movies"
							sx={{ color: 'white' }}
							fullWidth
							value={query}
							onChange={e => handleQuery(e.target.value, true)}
							onKeyPress={(e: any) => {
								if (e.key === "Enter") {
									e.preventDefault()
									handleQuery(e.target.value, false)
								}
							}}
						/>
					</div>
					<div className={css.buttons}>
						<Button variant="outlined">LOG IN</Button>
						<Button variant="contained"><b>REGISTER</b></Button>
					</div>
				</div>
			</div>
		</div>)
}