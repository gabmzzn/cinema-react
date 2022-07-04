import Rating from '@mui/material/Rating'

interface MovieRatingProps {
	value: number | null
	handleChange:
	(event: React.SyntheticEvent<Element, Event>,
		value: number | null) => void
}

export default function MovieRating(props: MovieRatingProps) {

	const { value, handleChange } = props

	return (
		<Rating
			size='large'
			name="simple-controlled"
			value={value}
			onChange={(event, value) => handleChange(event, value)}
		/>
	)
}
