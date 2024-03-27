import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "../MovieCast/MovieCast.module.css";
import { instance, options } from "../../url";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import CastCard from "../CastCard/CastCard";
import Loader from "../Loader/Loader";

const MovieCast = () => {
	const [castValue, setCastValue] = useState(null);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { movieId } = useParams();

	useEffect(() => {
		async function fetchCast() {
			setCastValue(null);
			setIsError(false);
			setIsLoading(true);
			try {
				const { data } = await instance.get(`movie/${movieId}/credits`, options);
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
