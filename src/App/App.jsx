import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import css from "../App/App.module.css";
import SkyBackground from "../components/SkyBackground/SkyBackground";
import Navigation from "../components/Navigation/Navigation";
import Loader from "../components/Loader/Loader";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews/MovieReviews"));

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<SkyBackground />
			<header className={css.header}>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
					{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
				</Routes>
			</main>
		</Suspense>
	);
}

export default App;
