import { format } from "date-fns";
import css from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
	const formattedDate = (data) => format(new Date(data), "dd.MM.yyyy");

	return (
		<>
			<div className={css.reviewDataCon}>
				<p className={css.reviewData}>{review.author ? review.author : "No data"}</p>
				<p className={css.reviewData}>{review.updated_at ? formattedDate(review.updated_at) : "No data"}</p>
			</div>

			<p>{review.content ? review.content : "No data"}</p>
		</>
	);
};

export default ReviewCard;
