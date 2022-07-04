export interface MovieDiscover {
	id: number,
	title: string,
	overview: string,
	poster_path: string | null,
	vote_average: number
	vote_count: number
	release_date: string
	backdrop_path: string | null
}

export interface MovieSearch {
	id: number
	title: string
	overview: string
	genre_id: number[]
	popularity: number
	vote_average: number
	vote_count: number
	release_date: string
	original_language: string
	poster_path: string | null
	backdrop_path: string | null
}

export interface MovieDetail {
	id: number
	title: string
	original_title: string
	overview: string
	tag_line: string | null
	runtime: number
	popularity: number
	vote_average: number
	vote_count: number
	release_date: string
	original_language: string
	poster_path: string | null
	backdrop_path: string | null
	credits: {
		cast: MovieActor[]
	}
	videos?: {
		results: {
			name:string
	}
	}
	genres: [{
		id: number
		name: string
	}]
}

export interface MovieActor {
	name: string
	character: string
	profile_path: string
}