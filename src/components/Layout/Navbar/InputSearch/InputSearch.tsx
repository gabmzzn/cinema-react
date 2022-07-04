import Input from '@mui/material/Input/Input'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import css from './InputSearch.module.scss'

export const InputSearch = () => {

	let navigate = useNavigate()
	let params = useParams()
	const [query, setQuery] = useState<string>('')

	useEffect(() => {
		params.hasOwnProperty('query') &&
			params.query !== undefined &&
			setQuery(params.query)
	}, [])

	useEffect(() => {
		if (query !== '' && !('query' in params)) {
			setQuery('')
		}
	}, [params])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query === '' && params.hasOwnProperty('query')) {
				navigate('/discover/')
			}
			else if (query !== '' && !/\s/g.test(query)) {
				navigate(`/search/${query}/1`)
			}
		}, 1000)
		return () => clearTimeout(timer)
	}, [query])

	function handleQuery(query: string, key: boolean) {
		key ? navigate(`/search/${query}/1`) : setQuery(query)
	}

	return (
		<div className={css.search}>
			<Input
				placeholder="Search for your favorites movies"
				sx={{ color: 'white' }}
				fullWidth
				value={query}
				onChange={e => handleQuery(e.target.value, false)}
				onKeyPress={(e: React.KeyboardEvent<HTMLImageElement>) => {
					if (e.key === "Enter") {
						e.preventDefault()
						handleQuery((e.target as HTMLInputElement).value, true)
					}
				}}
			/>
		</div>)
}