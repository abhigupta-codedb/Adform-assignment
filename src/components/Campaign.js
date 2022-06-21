import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { formatCash } from "../helpers/helpers";
import { normalizeTestData } from "../store/selectors/selectors";

const Campaign = ({ data, allUsers }) => {
  const currDate = moment().format("MM/DD/YYYY");
  const renderData = normalizeTestData(allUsers, data);
  const [showTable, setTable] = useState(true);
  const [getName, setName] = useState("");
  const [getDate, setDate] = useState({ startDate: "", endDate: "" });
  const [getData, setData] = useState(renderData);

  // Global Method
  window.AddCampaigns = (campaignData) => {
    if (!campaignData) {
      throw new Error("Incorrect data provided");
    }
    const renderData = normalizeTestData(allUsers, campaignData);
    setData([...getData, ...renderData]);
  };

  const filteredData =
    getData.length > 0 &&
    getData
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
              {moment(endDate).isAfter(currDate) ? (
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
    let startDate = moment(getDate.startDate).format("MM/DD/YYYY");
    let endDate = moment(getDate.endDate).format("MM/DD/YYYY");

    if (startDate === "Invalid date" || endDate === "Invalid date") {
      alert("Invalid start/end date");
    } else if (moment(startDate).isAfter(endDate)) {
      setTable(false);
    } else {
      setData(
        getData.filter(
          (data) =>
            moment(data.startDate).isBetween(startDate, endDate) &&
            moment(data.endDate).isBetween(startDate, endDate)
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
