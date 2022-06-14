import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

function Campaign({ data, dateFilter, nameFilter }) {
  const currDate = moment(new Date()).format("MM/DD/YYYY");

  const filteredData = data.map(
    ({ name, startDate, endDate, Budget } = data, key) => {
      return (
        <tr key={data.id}>
          <td>{`Campaign ${++key}`}</td>
          <td>{name}</td>
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
    }
  );

  const ApplyDate = () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
      alert("Enter start/end date correctly");
    } else {
      dateFilter(startDate, endDate);
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
            <button onClick={ApplyDate}> Apply Date</button>
          </div>

          <div className="search-items-name">
            <input
              placeholder="Search by name"
              id="name"
              onChange={(e) => nameFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th>Budget</th>
          </tr>
          {filteredData}
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
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      Budget: PropTypes.number,
    })
  ).isRequired,
  dateFilter: PropTypes.func.isRequired,
  nameFilter: PropTypes.func.isRequired,
};

export default Campaign;
