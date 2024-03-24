import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../MovieReviews/MovieReviews.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ReviewCard from "../ReviewCard/ReviewCard";

const MovieReviews = () => {
	const [reviews, setReviews] = useState(null);
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
			setReviews(null);
			setIsError(false);
			setIsLoading(true);
			try {
				const { data } = await axios.get(`movie/${movieId}/reviews`, options);
				setReviews(data.results);
				if (data.results.length <= 0) {
					setIsError(true);
					setErrorMessage("Sorry, there are no reviews on this movie");
				}
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
		<div>
			{isLoading && <Loader />}
			{isError ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<ul className={css.reviewList}>
					{reviews &&
						Array.isArray(reviews) &&
						reviews.map((review, index) => {
							return (
								<li className={css.reviewItem} key={`${review.id}_${index}`}>
									<ReviewCard review={review} />
								</li>
							);
						})}
				</ul>
			)}
		</div>
	);
};

export default MovieReviews;
