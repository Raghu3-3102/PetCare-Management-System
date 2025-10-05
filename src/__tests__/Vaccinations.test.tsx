// __tests__/Vaccinations.test.tsx
import { render, screen } from "@testing-library/react";
import Vaccinations from "../components/Vaccinations";
import toast from "react-hot-toast";

// Mock toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

describe("Vaccinations Component", () => {
  const petId = 1;

  const mockData = [
    {
      vacId: 2,
      id: 1,
      petId: 101,
      vaccine: "Distemper",
      date: "2025-10-02",
      due: "2026-10-02",
    },
  ];

  test("renders initial vaccination data", () => {
    render(
      <Vaccinations
        petId={petId}
        petVaccinations={mockData}
        addVaccination={jest.fn()}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Distemper")).toBeInTheDocument();
    expect(screen.getByText("2025-10-02")).toBeInTheDocument();
    expect(screen.getByText("2026-10-02")).toBeInTheDocument();
  });
});
