import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
	it("renders label and input", () => {
		render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);

		expect(screen.getByLabelText(/nip/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /szukaj/i })).toBeInTheDocument();
	});

	it("calls onChange when typing", () => {
		const onChange = jest.fn();
		render(<SearchBar value="" onChange={onChange} onSearch={() => {}} />);

		fireEvent.change(screen.getByRole("textbox"), { target: { value: "123" } });
		expect(onChange).toHaveBeenCalledWith("123");
	});
});
