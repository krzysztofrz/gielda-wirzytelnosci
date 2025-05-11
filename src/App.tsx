import React, { useEffect, useState } from "react";
import { Debtor } from "./types/Debtor";
import { getTopDebts, getFilteredDebts } from "./api/debts";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { DebtorTable } from "./components/DebtorTable/DebtorTable";

const App = () => {
	const [debts, setDebts] = useState<Debtor[]>([]);
	const [query, setQuery] = useState("");

	const fetchTop = async () => {
		const data = await getTopDebts();
		setDebts(data);
	};

	const handleSearch = async () => {
		try {
			if (query.length >= 3) {
				const results = await getFilteredDebts(query);
				setDebts(results);
			} else {
				await fetchTop(); // fallback do TOP10
			}
		} catch (err) {
			alert("Wprowadź co najmniej 3 znaki lub spróbuj ponownie.");
		}
	};

	useEffect(() => {
		fetchTop();
	}, []);

	return (
		<div>
			<SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
			<DebtorTable data={debts} />
		</div>
	);
};

export default App;
