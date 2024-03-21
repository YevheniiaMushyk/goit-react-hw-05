import css from "./MovieDetailsPage.module.css";

import { format } from "date-fns";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailsPage = (movie) => {
	const formattedDate = format(new Date(`${movie.release_date}`), "yyyy");
	return (
		<>
			<div className={css.movieImg}>
				<img src={`${BASE_URL}${movie.poster_path}`} alt={movie.original_title} />
			</div>
			<p className={css.movieText}>{movie.title}</p>
			<p className={css.movieText}>{formattedDate}</p>
			{/* <p className={css.movieText}>
				`${movie.title} (${formattedDate})`
			</p>
			<p className={css.movieOverview}>overview</p>
			<p className={css.movieOverview}>{movie.overview}</p>
			<p className={css.movieOverview}>genres</p>
			<p className={css.movieOverview}>{movie.genres}</p> */}
		</>
	);
};

export default MovieDetailsPage;
