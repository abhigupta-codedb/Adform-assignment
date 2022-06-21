import React from "react";
import Campaign from "../Campaign";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockData = [
  {
    id: 1,
    name: "Divavu",
    startDate: "9/19/2017",
    endDate: "3/9/2018",
    Budget: 88377,
    userId: "3",
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "11/21/2017",
    endDate: "2/21/2018",
    Budget: 608715,
    userId: 6,
  },
];

const allUsers = [
  {
    id: 1,
    userName: "Bret",
  },
  {
    id: 2,
    userName: "Antonette",
  },
];

afterEach(cleanup);

describe("Test rendering of Campaign component", () => {
  test("it should render all search elements correctly", () => {
    render(<Campaign data={[]} allUsers={[]} />);

    const startDate = screen.getByPlaceholderText("Start Date");
    expect(startDate).toBeInTheDocument();

    const endDate = screen.getByPlaceholderText("End Date");
    expect(endDate).toBeInTheDocument();

    const linkElement = screen.getByText("Apply Date");
    expect(linkElement).toBeInTheDocument();

    const searchName = screen.getByPlaceholderText("Search by name");
    expect(searchName).toBeInTheDocument();
  });

  test("it should render table data without crashing", () => {
    render(<Campaign data={mockData} allUsers={allUsers} />);
    const userName1 = screen.getByText("Bret");
    expect(userName1).toBeInTheDocument();

    const userName2 = screen.getByText("Antonette");
    expect(userName2).toBeInTheDocument();
  });

  test("it should provide correct type for date before click", () => {
    render(<Campaign data={[]} allUsers={[]} />);
    const startDate = screen.getByPlaceholderText("Start Date");
    expect(startDate).toHaveAttribute("type", "text");
  });

  test("it should provide correct type for date after click", () => {
    render(<Campaign data={[]} allUsers={[]} />);
    const startDate = screen.getByPlaceholderText("Start Date");
    userEvent.type(startDate, "12/12/2022");
    expect(startDate).toHaveAttribute("type", "date");
  });
});

describe("Testing components with different simulations", () => {
  test("simulate reset button click", () => {
    render(<Campaign data={[]} allUsers={[]} />);
    const startDate = screen.getByPlaceholderText("Start Date");
    const endDate = screen.getByPlaceholderText("End Date");
    const resetButton = screen.getByText("Reset Date");
    fireEvent.click(resetButton);
    expect(startDate.value).toMatch("");
    expect(endDate.value).toMatch("");
  });

  test("it should correctly filter based on name search", () => {
    render(<Campaign data={mockData} allUsers={allUsers} />);
    const searchName = screen.getByPlaceholderText("Search by name");
    userEvent.type(searchName, "Jaxspan");
    expect(screen.queryByText("Divavu")).not.toBeInTheDocument();
  });
});
