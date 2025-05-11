// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import App from "./App";
// import * as api from "./api/debts";
// import axios from "axios";

// jest.mock("axios");
// // mock API
// jest.spyOn(api, "getFilteredDebts").mockResolvedValue([
// 	{
// 		Id: 1,
// 		Name: "Firma ABC",
// 		NIP: "1234567890",
// 		Date: "2024-01-01",
// 		Value: 1000,
// 		Address: "",
// 		DocumentType: "",
// 		Price: 0,
// 		Number: "",
// 	},
// ]);

// describe("App integration", () => {
// 	it("searches and displays results", async () => {
// 		render(<App />);

// 		fireEvent.change(screen.getByRole("textbox"), {
// 			target: { value: "firma" },
// 		});
// 		fireEvent.click(screen.getByRole("button", { name: /szukaj/i }));

// 		await waitFor(() => {
// 			expect(screen.getByText(/firma abc/i)).toBeInTheDocument();
// 		});
// 	});
// });

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as api from "./api/debts";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App integration", () => {
	beforeEach(() => {
		// mock getTopDebts (axios.get)
		mockedAxios.get.mockResolvedValue({
			data: [
				{
					Id: 99,
					Name: "Default Firma",
					NIP: "9999999999",
					Date: "2023-01-01",
					Value: 500,
					Address: "",
					DocumentType: "",
					Price: 0,
					Number: "",
				},
			],
		});

		// mock getFilteredDebts (axios.post)
		mockedAxios.post.mockResolvedValue({
			data: [
				{
					Id: 1,
					Name: "Firma ABC",
					NIP: "1234567890",
					Date: "2024-01-01",
					Value: 1000,
					Address: "",
					DocumentType: "",
					Price: 0,
					Number: "",
				},
			],
		});
	});

	it("searches and displays results", async () => {
		render(<App />);

		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "firma" },
		});
		fireEvent.click(screen.getByRole("button", { name: /szukaj/i }));

		await waitFor(() => {
			expect(screen.getByText(/firma abc/i)).toBeInTheDocument();
		});
	});
});
