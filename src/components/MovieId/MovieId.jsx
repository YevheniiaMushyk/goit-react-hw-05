import { format } from "date-fns";
import css from "./MovieId.module.css";
import DefaultImage from "../DefaultImage/DefaultImage";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieId = ({ movie }) => {
	const formattedDate = (date) => {
		return format(new Date(date), "yyyy");
	};
	return (
		<div className={css.movieIdCard}>
			<div className={css.movieImgContainer}>
				{movie.poster_path ? (
					<img className={css.movieImg} src={`${BASE_URL}${movie.poster_path}`} alt={movie.title ? movie.title : "movie poster"} width="300" height="450" />
				) : (
					<DefaultImage />
				)}
			</div>
			<div className={css.movieDetails}>
				<p className={css.movieMainTitle}>
					{movie.title ? movie.title : "No data"} (<span className={css.movieValue}>{movie.release_date ? formattedDate(movie.release_date) : "No data"}</span>)
				</p>
				<p className={css.movieTitle}>
					vote average: <span className={css.movieValue}>{movie.vote_average ? movie.vote_average : "No data"}</span>
				</p>

				<p className={css.movieTitle}>overview</p>
				<p className={css.movieValue}>{movie.overview ? movie.overview : "No data"}</p>
				<p className={css.movieTitle}>genres</p>
				<ul className={css.movieList}>
					{movie.genres &&
						Array.isArray(movie.genres) &&
						movie.genres.map((genre) => {
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
