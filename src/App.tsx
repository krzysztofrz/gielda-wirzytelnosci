import React, { useEffect, useState } from "react";
import { Debtor } from "./types/Debtor";
import { getTopDebts, getFilteredDebts } from "./api/debts";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { DebtorTable } from "./components/DebtorTable/DebtorTable";
import { Loader } from "./components/Loader/Loader";

type SortKey = "Name" | "NIP" | "Value" | "Date";
type SortDirection = "asc" | "desc";

const App = () => {
	const [debts, setDebts] = useState<Debtor[]>([]);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [sortKey, setSortKey] = useState<SortKey>("Name");
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

	const sortedDebts = [...debts].sort((a, b) => {
		const aVal = a[sortKey];
		const bVal = b[sortKey];

		if (sortKey === "Value") {
			return sortDirection === "asc"
				? (aVal as number) - (bVal as number)
				: (bVal as number) - (aVal as number);
		}

		if (sortKey === "Date") {
			const aDate = new Date(aVal as string).getTime();
			const bDate = new Date(bVal as string).getTime();
			return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
		}

		return sortDirection === "asc"
			? String(aVal).localeCompare(String(bVal))
			: String(bVal).localeCompare(String(aVal));
	});

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDirection("asc");
		}
	};

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
			{isLoading ? (
				<Loader />
			) : (
				<DebtorTable
					data={sortedDebts}
					onSort={handleSort}
					currentSort={{ key: sortKey, direction: sortDirection }}
				/>
			)}
		</div>
	);
};

export default App;
