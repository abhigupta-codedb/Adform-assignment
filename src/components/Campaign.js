import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { getFormattedDate } from "../constant/constant";

function Campaign({ data, dateFilter }) {
  const currDate = moment(new Date()).format("MM/DD/YYYY");
  const [showTable, setTable] = useState(true);
  const [getName, setName] = useState("");

  const filteredData = data
    .filter(
      (data) => data.name.toLowerCase().indexOf(getName.toLowerCase()) >= 0
    )
    .map(({ name, username, startDate, endDate, Budget } = data, key) => {
      return (
        <tr key={data.id}>
          <td>{name}</td>
          <td>{username}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>
            {new Date(endDate) > new Date(currDate) ? (
              <GreenLabel />
            ) : (
              <RedLabel />
            )}
          </td>
          <td>{Budget}$</td>
        </tr>
      );
    });

  const ApplyDate = () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
      alert("Enter start/end date correctly");
    } else if (new Date(startDate) > new Date(endDate)) {
      setTable(false);
    } else {
      dateFilter(getFormattedDate(startDate), getFormattedDate(endDate));
    }
  };

  return (
    <div className="App">
      <div className="search">
        <div className="search-items">
          <div className="search-items-date">
            <input
              placeholder="Start Date"
              id="startDate"
              type="text"
              onFocus={(e) => {
                e.target.type = "date";
              }}
            />
          </div>
          <div className="search-items-date">
            <input
              placeholder="End Date"
              id="endDate"
              type="text"
              onFocus={(e) => {
                e.target.type = "date";
              }}
            />
          </div>
          <div className="search-items-date">
            <button onClick={ApplyDate}>Apply Date</button>
          </div>

          <div className="search-items-name">
            <input
              placeholder="Search by name"
              id="name"
              value={getName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <table>
          <thead />
          <tbody>
            <tr>
              <th>Name</th>
              <th>User Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Active</th>
              <th>Budget</th>
            </tr>
            {showTable && filteredData}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const RedLabel = () => {
  return (
    <div>
      <span className="redlable" />
      <span className="status">Inactive</span>
    </div>
  );
};

export const GreenLabel = () => {
  return (
    <div>
      <span className="greenlable" />
      <span className="status">Active</span>
    </div>
  );
};

Campaign.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      Budget: PropTypes.number,
    })
  ).isRequired,
  dateFilter: PropTypes.func.isRequired,
};

export default Campaign;
