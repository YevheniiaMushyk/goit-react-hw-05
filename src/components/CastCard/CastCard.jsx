import css from "./CastCard.module.css";
import DefaultImage from "../DefaultImage/DefaultImage";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const CastCard = ({ cast }) => {
	return (
		<>
			<div className={css.castImgCont}>
				{cast.profile_path ? (
					<img className={css.castImg} src={`${BASE_URL}${cast.profile_path}`} alt={cast.name ? cast.name : "actor foto"} width="337" />
				) : (
					<DefaultImage />
				)}
			</div>
			<p className={css.castName}>{cast.name ? cast.name : "No data"}</p>
			<p className={css.castCharacter}>Character: {cast.character ? cast.character : "No data"}</p>
		</>
	);
};

export default CastCard;
