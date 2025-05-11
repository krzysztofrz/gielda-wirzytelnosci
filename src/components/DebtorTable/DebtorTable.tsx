import React from "react";
import "./DebtorTable.scss";
import { Debtor } from "../../types/Debtor";

interface Props {
	data: Debtor[];
}

const formatDate = (iso: string) => {
	const d = new Date(iso);
	return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${d.getFullYear()}`;
};

export const DebtorTable: React.FC<Props> = ({ data }) => {
	return (
		<table className="debtor-table">
			<thead>
				<tr className="debtor-table__header">
					<th>Dłużnik</th>
					<th>NIP</th>
					<th>Kwota zadłużenia</th>
					<th>Data powstania zobowiązania</th>
				</tr>
			</thead>
			<tbody>
				{data.map((debtor, idx) => {
					console.log(debtor);
					return (
						<tr className="debtor-table__row" key={idx}>
							<td>{debtor.Name}</td>
							<td>{debtor.NIP}</td>
							<td>
								{debtor.Value !== undefined ? debtor.Value.toFixed(2) : "-"}
							</td>
							<td>{formatDate(debtor.Date)}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
