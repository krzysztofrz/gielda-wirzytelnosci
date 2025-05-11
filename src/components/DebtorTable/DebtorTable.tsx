import React from "react";
import "./DebtorTable.scss";
import { Debtor } from "../../types/Debtor";

type SortKey = "Name" | "NIP" | "Value" | "Date";
type SortDirection = "asc" | "desc";

interface Props {
	data: Debtor[];
	onSort: (key: SortKey) => void;
	currentSort: { key: SortKey; direction: SortDirection };
}

const formatDate = (iso: string) => {
	const d = new Date(iso);
	return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${d.getFullYear()}`;
};

export const DebtorTable: React.FC<Props> = ({ data, onSort, currentSort }) => {
	return (
		<table className="debtor-table">
			<thead>
				<tr className="debtor-table__header">
					<th onClick={() => onSort("Name")}>
						Dłużnik
						<span
							className={`sort-icon ${
								currentSort.key === "Name" ? currentSort.direction : ""
							}`}
						/>
					</th>
					<th onClick={() => onSort("NIP")}>
						NIP
						<span
							className={`sort-icon ${
								currentSort.key === "NIP" ? currentSort.direction : ""
							}`}
						/>
					</th>
					<th onClick={() => onSort("Value")}>
						Kwota zadłużenia
						<span
							className={`sort-icon ${
								currentSort.key === "Value" ? currentSort.direction : ""
							}`}
						/>
					</th>
					<th onClick={() => onSort("Date")}>
						Data powstania zobowiązania
						<span
							className={`sort-icon ${
								currentSort.key === "Date" ? currentSort.direction : ""
							}`}
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((debtor, idx) => (
					<tr className="debtor-table__row" key={idx}>
						<td>{debtor.Name}</td>
						<td>{debtor.NIP}</td>
						<td>
							{debtor.Value !== undefined ? debtor.Value.toFixed(2) : "-"}
						</td>
						<td>{formatDate(debtor.Date)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
