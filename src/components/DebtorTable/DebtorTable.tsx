import React from "react";
import "./DebtorTable.scss";
import { Debtor } from "../../types/Debtor";

interface Props {
	data: Debtor[];
}

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
				{data.map((debtor, idx) => (
					<tr className="debtor-table__row" key={idx}>
						<td>{debtor.name}</td>
						<td>{debtor.nip}</td>
						<td>{debtor.amount.toFixed(2)}</td>
						<td>{debtor.date}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
