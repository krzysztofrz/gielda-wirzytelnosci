import React from "react";
import "./SearchBar.scss";

interface Props {
	value: string;
	onChange: (value: string) => void;
	onSearch: () => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, onSearch }) => {
	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch();
		}
	};
	return (
		<div className="search-bar">
			<label htmlFor="search-input" className="search-bar__label">
				Podaj NIP lub nazwę dłużnika
			</label>
			<div className="search-bar__form">
				<input
					id="search-input"
					className="search-bar__input"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyUp={handleKeyUp}
					type="text"
				/>
				<button className="search-bar__button" onClick={onSearch}>
					Szukaj
				</button>
			</div>
		</div>
	);
};
