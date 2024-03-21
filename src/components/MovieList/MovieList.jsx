import MovieCard from "../MovieCard/MovieCard";
import css from "../MovieList/MovieList.module.css";

const MovieList = ({ movieList }) => {
	return (
		<ul className={css.movieList}>
			{movieList &&
				Array.isArray(movieList) &&
				movieList.map((movie, index) => {
					return (
						<li className={css.movieItem} key={`${movie.id}_${index}`}>
							<MovieCard movie={movie} />
						</li>
					);
				})}
		</ul>
	);
};

export default MovieList;
