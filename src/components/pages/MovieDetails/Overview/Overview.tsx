
export const Overview = (movie: { overview: string }) => {
	return (
		<div style={{ marginBottom: '30px' }}>
			<h1>Sinopsis</h1>
			<h3 style={{ fontWeight: '400' }}>{movie.overview}</h3>
		</div>
	)
}