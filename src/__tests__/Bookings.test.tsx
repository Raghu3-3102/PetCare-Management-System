// __tests__/Bookings.test.tsx
import { render, screen } from "@testing-library/react";
import Bookings from "../components/Booking";
import toast from "react-hot-toast";

// Mock toast to prevent actual popups
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

describe("Bookings Component", () => {
  const petId = 1;

  const mockData = [
    {
      id: 1,
      petId: 101,
      bookingId: 1,
      type: "Boardings",
      status: "Confirmeds",
      start: "2025-08-20",
      end: "2025-08-25",
    },
  ];

  test("renders table with initial data", () => {
    render(<Bookings petId={petId} PetBooking={mockData} />);

    // table headers
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();

    // initial row values
    expect(screen.getByText("Boardings")).toBeInTheDocument();
    expect(screen.getByText("Confirmeds")).toBeInTheDocument();
  });
});
