import React, { useEffect, useState } from "react";
import { Debtor } from "./types/Debtor";
import { getTopDebts, getFilteredDebts } from "./api/debts";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { DebtorTable } from "./components/DebtorTable/DebtorTable";
import { Loader } from "./components/Loader/Loader";

const App = () => {
	const [debts, setDebts] = useState<Debtor[]>([]);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		try {
			setIsLoading(true);
			if (query.length >= 3) {
				const results = await getFilteredDebts(query);
				setDebts(results);
			} else {
				await fetchTop();
			}
		} catch (err) {
			alert("Wprowadź co najmniej 3 znaki lub spróbuj ponownie.");
		} finally {
			setIsLoading(false);
		}
	};

	const fetchTop = async () => {
		setIsLoading(true);
		const data = await getTopDebts();
		setDebts(data);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchTop();
	}, []);

	return (
		<div>
			<SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
			{isLoading ? <Loader /> : <DebtorTable data={debts} />}
		</div>
	);
};

export default App;
