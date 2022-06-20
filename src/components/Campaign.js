import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { getFormattedDate, formatCash } from "../constant/helpers";
import { normalizeTestData } from "../store/selectors/selectors";

const Campaign = ({ data, allUsers }) => {
  const currDate = moment(new Date()).format("MM/DD/YYYY");
  const [getData, setData] = useState(data);
  const [showTable, setTable] = useState(true);
  const [getName, setName] = useState("");
  const [getDate, setDate] = useState({ startDate: "", endDate: "" });

  // Global Method
  window.AddCampaigns = (campaignData) => {
    if (!campaignData) {
      throw new Error("Incorrect data provided");
    }
    const renderData = normalizeTestData(allUsers, campaignData);
    setData([...getData, ...renderData]);
  };

  const filteredData = getData
    .filter(
      (data) => data.name.toLowerCase().indexOf(getName.toLowerCase()) >= 0
    )
    .map(({ name, username, startDate, endDate, Budget } = data, key) => {
      return (
        <tr key={key}>
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
          <td>{formatCash(Budget)} USD</td>
        </tr>
      );
    });

  const applyDate = () => {
    let startDate = getDate.startDate;
    let endDate = getDate.endDate;

    if (!startDate || !endDate) {
      alert("Enter start/end date correctly");
    } else if (new Date(startDate) > new Date(endDate)) {
      setTable(false);
    } else {
      startDate = getFormattedDate(startDate);
      endDate = getFormattedDate(endDate);
      setData(
        getData.filter(
          (data) =>
            new Date(data.startDate) >= new Date(startDate) &&
            new Date(data.endDate) <= new Date(endDate)
        )
      );
    }
  };

  const resetDate = () => {
    setData(data);
    setDate({ startDate: "", endDate: "" });
  };

  const setMinEndDate = (date) => {
    if (date) {
      document.getElementById("endDate").min = date;
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
              onSelect={(e) => {
                e.target.type = "date";
              }}
              value={getDate.startDate}
              onChange={(e) => {
                setMinEndDate(e.target.value);
                setDate((date) => {
                  return { ...date, startDate: e.target.value };
                });
              }}
            />
          </div>
          <div className="search-items-date">
            <input
              placeholder="End Date"
              id="endDate"
              type="text"
              onSelect={(e) => {
                e.target.type = "date";
              }}
              value={getDate.endDate}
              onChange={(e) =>
                setDate((date) => {
                  return { ...date, endDate: e.target.value };
                })
              }
            />
          </div>
          <div className="search-items-date">
            <button onClick={applyDate}>Apply Date</button>
          </div>

          <div className="search-items-date">
            <button onClick={resetDate}>Reset Date</button>
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
};

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
};

export default Campaign;
