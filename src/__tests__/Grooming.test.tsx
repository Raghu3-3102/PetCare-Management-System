// __tests__/Grooming.test.tsx
import { render, screen } from "@testing-library/react";
import Grooming from "../components/Grooming";
import toast from "react-hot-toast";

// Mock toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

describe("Grooming Component", () => {
  const petId = 3;

  const mockData = [
    {
      id: "3",
      petId: 103,
      groomId: 5,
      service: "Bath",
      date: "2025-08-14",
      notes: "Energetic",
    },
  ];

  test("renders initial grooming data", () => {
    render(
      <Grooming
        petId={petId}
        Petgrooming={mockData}
        addGrooming={jest.fn()}
      />
    );

    expect(screen.getByText("Bath")).toBeInTheDocument();
    expect(screen.getByText("2025-08-14")).toBeInTheDocument();
    expect(screen.getByText("103")).toBeInTheDocument();
    expect(screen.getByText("Energetic")).toBeInTheDocument();
  });
});
