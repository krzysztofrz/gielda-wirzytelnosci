import axios from "axios";
import { Debtor } from "../types/Debtor";

const API_BASE = "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment";

export const getTopDebts = async (): Promise<Debtor[]> => {
	const response = await axios.get(`${API_BASE}/GetTopDebts`);
	return response.data;
};

export const getFilteredDebts = async (phrase: string): Promise<Debtor[]> => {
	if (phrase.length < 3)
		throw new Error("Search phrase must be at least 3 characters");
	const response = await axios.post(
		`${API_BASE}/GetFilteredDebts`,
		{ phrase },
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return response.data;
};

export const getDebtsCount = async (): Promise<number> => {
	const response = await axios.get(`${API_BASE}/GetDebtsCount`);
	return response.data;
};
