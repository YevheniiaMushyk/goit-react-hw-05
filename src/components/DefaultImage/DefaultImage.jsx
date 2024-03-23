import css from "./DefaultImage.module.css";

const DefaultImage = () => {
	return (
		<div className={css.defaultImage}>
			<span>No poster</span>
			<span>😒</span>
		</div>
	);
};

export default DefaultImage;
