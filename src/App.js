import { useEffect, useState } from "react";
import "./App.css";
import Campaign from "./components/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/campaignSlice";
import { STATUS } from "./constant/constant";
import { normalizeTestData } from "./constant/normalizeData";
import { createSelector } from "reselect";
import { mockData } from "./constant/mockData";

const normalizeDataSelector = createSelector(
  (state) => state.campaign.data,
  (data) =>
    data.map((user) => {
      return { id: user.id, userName: user.username };
    })
);

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.campaign.status);
  const allUsers = useSelector(normalizeDataSelector);
  const renderData = normalizeTestData(allUsers, mockData);
  const [getData, setData] = useState(renderData);

  // Global Method
  window.AddCampaigns = function (campaignData) {
    if (!campaignData) {
      throw new Error("Incorrect data provided");
    }
    const renderData = normalizeTestData(allUsers, campaignData);
    setData([...getData, ...renderData]);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const ApplyDateFilter = (startDate, endDate) => {
    setData(
      getData.filter(
        (data) =>
          new Date(data.startDate) >= new Date(startDate) &&
          new Date(data.endDate) <= new Date(endDate)
      )
    );
  };

  if (status === STATUS.ERROR) {
    return (
      <div className="home">
        <div className="header">
          <h1>Error Occured ....</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="header">
        {status === STATUS.LOADING ? (
          <h1>Loading....</h1>
        ) : (
          <Campaign data={getData} dateFilter={ApplyDateFilter} />
        )}
      </div>
    </div>
  );
}

export default App;
