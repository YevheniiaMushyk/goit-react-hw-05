import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "../MovieCast/MovieCast.module.css";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import CastCard from "../CastCard/CastCard";
import Loader from "../Loader/Loader";

const MovieCast = () => {
	const [castValue, setCastValue] = useState(null);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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

		async function fetchCast() {
			setCastValue(null);
			setIsError(false);
			setIsLoading(true);
			try {
				const { data } = await axios.get(`movie/${movieId}/credits`, options);
				setCastValue(data.cast);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCast();
	}, [movieId]);

	return (
		<>
			{isLoading && <Loader />}
			{isError ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<ul className={css.castList}>
					{castValue &&
						Array.isArray(castValue) &&
						castValue.map((cast, index) => {
							return (
								<li className={css.castItem} key={`${cast.id}_${index}`}>
									<CastCard cast={cast} />
								</li>
							);
						})}
				</ul>
			)}
		</>
	);
};

export default MovieCast;
