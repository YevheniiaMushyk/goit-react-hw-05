import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "../MoviesPage/MoviesPage.module.css";
import baseUrl from "../../url";
import Loader from "../../components/Loader/Loader";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [movieList, setMovieList] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [queryPage, setQueryPage] = useState(1);
	const [isScrollToTop, setScrollToTop] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("query");

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2YzMzU0OWYzYjc3MDE2MDcxYzYwYTlmM2IyNWU4NiIsInN1YiI6IjY1ZmMxMmRmNjA2MjBhMDE3YzI3MTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bpsk2SRHCKtimBFb0iVHaVxrP_IpAcKrpk3AiH6f_Uo",
			},
			params: {
				query: query,
				include_adult: false,
				language: "en-US",
				page: queryPage,
			},
		};
		if (!query) return;
		async function fetchSearchMovies() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const { data } = await baseUrl.get("search/movie", options);
				setMovieList((prevList) => [...prevList, ...data.results]);
				if (data.results.length <= 0) {
					setIsError(true);
					setErrorMessage("Sorry, movies with such title were not found. Please try again!");
				}

				if (queryPage < data.total_pages) {
					setIsLoadMore(true);
				}
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchSearchMovies();
	}, [query, queryPage]);

	const onSetSearchQuery = (query) => {
		setMovieList([]);
		setQueryPage(1);
		setSearchParams(query);
		setSearchParams({ query: query });
	};

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setScrollToTop(true);
			} else {
				setScrollToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div className={css.movieContainer}>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					{<SearchForm onSetSearchQuery={onSetSearchQuery} />}
					{!isError ? <MovieList movieList={movieList} /> : <ErrorMessage message={errorMessage} />}
				</>
			)}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</div>
	);
};

export default MoviesPage;
