import { MdPhotoCamera } from "react-icons/md";
import css from "./DefaultImage.module.css";

const DefaultImage = () => {
	return (
		<div className={css.defaultImage}>
			<MdPhotoCamera className={css.defaultIcon} />
			<span>no image</span>
		</div>
	);
};

export default DefaultImage;
