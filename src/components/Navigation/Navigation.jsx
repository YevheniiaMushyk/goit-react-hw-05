import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";
import clsx from "classnames";

const getNavLinkClassNames = ({ isActive }) => clsx(css.headerLink, isActive && css.active);

const Navigation = () => {
	return (
		<>
			<NavLink className={getNavLinkClassNames} to="/">
				Home
			</NavLink>
			<NavLink className={getNavLinkClassNames} to="/movies">
				Movies
			</NavLink>
		</>
	);
};

export default Navigation;
