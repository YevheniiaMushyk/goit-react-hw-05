import { Route, Routes } from "react-router-dom";
import css from "../App/App.module.css";
import Navigation from "../components/Navigation/Navigation";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SkyBackground from "../components/SkyBackground/SkyBackground";

function App() {
	return (
		<div className={css.star}>
			<SkyBackground />
			<header className={css.header}>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
						{/* <Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} /> */}
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
