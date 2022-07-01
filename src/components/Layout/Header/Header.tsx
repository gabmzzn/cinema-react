import css from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Input from '@mui/material/Input/Input'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
export const Header = () => {

	let navigate = useNavigate()
	const [query, setQuery] = useState<string | undefined>(undefined)

	useEffect(() => {
		console.log(query)
		if (query !== undefined) {
			const timer = setTimeout(() => {
				query !== '' ? navigate(`/search/${query}/1`) : navigate('/discover/')
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [query])

	function handleQuery(query: string, key: boolean) {
		query == '' && navigate('/discover/')
		if (query.trim().length !== 0) {
			key ? setQuery(query) : navigate(`/search/${query}/1`)
		}
	}

	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<div className={css.content}>
					<Link to='/discover/'>
						<h1 className={css.logo}>CINEMA<LocalMoviesIcon />REACT</h1>
					</Link>
					<div className={css.search}>
						<Input
							placeholder="Search for movies"
							sx={{ color: 'white' }}
							fullWidth
							onChange={e => handleQuery(e.target.value, true)}
							onKeyPress={(e: any) => {
								if (e.key === "Enter") {
									e.preventDefault()
									handleQuery(e.target.value, false)
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>)
}