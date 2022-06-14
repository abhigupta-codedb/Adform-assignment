import React from "react";
import ReactDOM from "react-dom";
import Campaign from "./Campaign";
import { cleanup, render } from "@testing-library/react";

const dateFilter = jest.fn();
const nameFilter = jest.fn();

afterEach(cleanup);

test("it should render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Campaign
      data={[]}
      dateFilter={dateFilter}
      nameFilter={nameFilter}
    ></Campaign>,
    div
  );
});

test("it should render all search elements correctly", () => {});
