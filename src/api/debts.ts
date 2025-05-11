import axios from "axios";
import { Debtor } from "../types/Debtor";

const API_BASE = "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment";

export const getTopDebts = async (): Promise<Debtor[]> => {
	try {
		const response = await axios.get(`${API_BASE}/GetTopDebts`);
		return response.data;
	} catch (error) {
		console.error("Error fetching top debts", error);
		throw new Error("Nie udało się pobrać dłużników.");
	}
};

export const getFilteredDebts = async (phrase: string): Promise<Debtor[]> => {
	if (phrase.length < 3)
		throw new Error("Fraza musi mieć co najmniej 3 znaki.");

	try {
		const response = await axios.post(
			`${API_BASE}/GetFilteredDebts`,
			{ phrase },
			{ headers: { "Content-Type": "application/json" } }
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching filtered debts", error);
		throw new Error("Wystąpił błąd podczas wyszukiwania.");
	}
};

export const getDebtsCount = async (): Promise<number> => {
	try {
		const response = await axios.get(`${API_BASE}/GetDebtsCount`);
		return response.data;
	} catch (error) {
		console.error("Error fetching debts count", error);
		throw new Error("Nie udało się pobrać listy uytkowników.");
	}
};
