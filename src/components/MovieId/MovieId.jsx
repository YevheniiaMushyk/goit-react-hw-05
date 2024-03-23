import DefaultImage from "../DefaultImage/DefaultImage";
import css from "./MovieId.module.css";

import { format } from "date-fns";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieId = (movie) => {
	const formattedDate = (date) => {
		return format(new Date(date), "yyyy");
	};
	return (
		<div className={css.movieIdCard}>
			<div className={css.movieImg}>
				{movie.movie.poster_path ? (
					<img src={`${BASE_URL}${movie.movie.poster_path}`} alt={movie.movie.title ? movie.movie.title : "movie poster"} />
				) : (
					<DefaultImage />
				)}
			</div>
			<div className={css.movieDetails}>
				<p className={css.movieMainTitle}>
					{movie.movie.title ? movie.movie.title : "No data"} (
					<span className={css.movieValue}>{movie.movie.release_date ? formattedDate(movie.movie.release_date) : "No data"}</span>)
				</p>
				<p className={css.movieTitle}>
					vote average: <span className={css.movieValue}>{movie.movie.vote_average ? movie.movie.vote_average : "No data"}</span>
				</p>

				<p className={css.movieTitle}>overview</p>
				<p className={css.movieValue}>{movie.movie.overview ? movie.movie.overview : "No data"}</p>
				<p className={css.movieTitle}>genres</p>
				<ul className={css.movieList}>
					{movie.movie.genres &&
						Array.isArray(movie.movie.genres) &&
						movie.movie.genres.map((genre) => {
							return (
								<li key={genre.id}>
									<span className={css.movieValue}>{genre.name}</span>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default MovieId;
