import css from "./CastCard.module.css";
import DefaultImage from "../DefaultImage/DefaultImage";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const CastCard = ({ cast }) => {
	return (
		<div>
			<div className={css.castImg}>
				{cast.profile_path ? <img src={`${BASE_URL}${cast.profile_path}`} alt={cast.name ? cast.name : "actor foto"} /> : <DefaultImage />}
			</div>
			<p className={css.castName}>{cast.name ? cast.name : "No data"}</p>
			<p className={css.castCharacter}>Character: {cast.character ? cast.character : "No data"}</p>
		</div>
	);
};

export default CastCard;
