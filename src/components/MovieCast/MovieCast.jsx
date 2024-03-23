import css from "../MovieCast/MovieCast.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import CastCard from "../CastCard/CastCard";

const MovieCast = () => {
	const [castValue, setCastValue] = useState({});
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	axios.defaults.baseURL = "https://api.themoviedb.org/3/";
	const { movieId } = useParams();

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2YzMzU0OWYzYjc3MDE2MDcxYzYwYTlmM2IyNWU4NiIsInN1YiI6IjY1ZmMxMmRmNjA2MjBhMDE3YzI3MTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bpsk2SRHCKtimBFb0iVHaVxrP_IpAcKrpk3AiH6f_Uo",
			},
			params: {
				language: "en-US",
			},
		};

		async function fetchMovies() {
			setCastValue({});
			try {
				const { cast } = await axios.get(`movie/${movieId}/credits`, options);
				setCastValue(cast);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			}
		}

		fetchMovies();
	}, [movieId]);

	return (
		<>
			{!isError ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<ul className={css.castList}>
					{castValue &&
						Array.isArray(castValue) &&
						castValue.map((cast, index) => {
							return (
								<li className={css.castItem} key={`${cast.id}_${index}`}>
									<CastCard cast={castValue} />
								</li>
							);
						})}
				</ul>
			)}
		</>
	);
};

export default MovieCast;
