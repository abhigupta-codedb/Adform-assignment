import { useEffect, useState } from "react";
import "./App.css";
import Campaign from "./components/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/campaignSlice";
import { STATUS } from "./constant/constant";
import { normalizeTestData } from "./constant/normalizeData";
import { createSelector } from "reselect";

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
  const [getData, setData] = useState(normalizeTestData(allUsers));

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const ApplyDateFilter = (startDate, endDate) => {
    setData(
      getData.filter(
        (data) => data.startDate >= startDate && data.endDate <= endDate
      )
    );
  };

  const ApplyNameFilter = (searchName = "") => {
    setData(getData.filter((data) => data.username.indexOf(searchName) >= 0));
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
          <Campaign
            data={getData}
            dateFilter={ApplyDateFilter}
            nameFilter={ApplyNameFilter}
          />
        )}
      </div>
    </div>
  );
}

export default App;
