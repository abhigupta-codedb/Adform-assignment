import React from "react";
import Campaign from "../Campaign";
import { cleanup, render, screen } from "@testing-library/react";

const dateFilter = jest.fn();
const mockData = [
  {
    id: "1",
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
afterEach(cleanup);

test("it should render all search elements correctly", () => {
  render(<Campaign data={[]} dateFilter={dateFilter} />);

  const startDate = screen.getByPlaceholderText("Start Date");
  expect(startDate).toBeInTheDocument();

  const endDate = screen.getByPlaceholderText("End Date");
  expect(endDate).toBeInTheDocument();

  const linkElement = screen.getByText("Apply Date");
  expect(linkElement).toBeInTheDocument();

  const searchName = screen.getByPlaceholderText("Search by name");
  expect(searchName).toBeInTheDocument();
});

test("it should render table without crashing", () => {
  render(<Campaign data={mockData} dateFilter={dateFilter} />);
  const label = screen.getByText("Jaxspan");
  expect(label).toBeInTheDocument();
});
