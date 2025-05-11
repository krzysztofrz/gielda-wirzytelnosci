import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { DebtorTable } from "./components/DebtorTable/DebtorTable";
import { Debtor } from "./types/Debtor";

const App = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Debtor[]>([]);

	const handleSearch = () => {
		// Tu potem podepniesz zapytanie do API
		// Tymczasowo mock:
		setResults([
			{
				name: "Firma XYZ",
				nip: "1234567890",
				amount: 1200,
				date: "01-01-2024",
			},
			{
				name: "ABC Sp. z o.o.",
				nip: "9876543210",
				amount: 3000,
				date: "15-03-2024",
			},
		]);
	};

	return (
		<div>
			<SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
			<DebtorTable data={results} />
		</div>
	);
};

export default App;
