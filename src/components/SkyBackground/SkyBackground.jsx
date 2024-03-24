import css from "./SkyBackground.module.css";

const SkyBackground = () => {
	const stars = [];
	for (let i = 0; i < 100; i++) {
		const size = Math.random() * 3;
		const left = Math.random() * window.innerWidth;
		const top = Math.random() * window.innerHeight;
		const animationDuration = Math.random() * 5 + 2;
		stars.push(
			<div
				className={css.star}
				key={i}
				style={{
					position: "absolute",
					width: `${size}px`,
					height: `${size}px`,
					backgroundColor: "#ed00ff",
					borderRadius: "50%",
					left: `${left}px`,
					top: `${top}px`,
					animationDuration: `${animationDuration}s `,
					zIndex: -50,
				}}
			></div>
		);
	}
	return (
		<div
			style={{
				position: "fixed",
				top: "0",
				left: "0",
				width: "100%",
				height: "100vh",
				pointerEvents: "none",
			}}
		>
			{stars}
		</div>
	);
};

export default SkyBackground;
