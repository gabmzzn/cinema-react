import Rating from '@mui/material/Rating'

export default function MovieRating(props: { value: number | null, handleChange: any }) {

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
