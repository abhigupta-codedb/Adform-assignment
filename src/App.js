import { useEffect, useState } from "react";
import "./App.css";
import Campaign from "./components/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/campaignSlice";
import { STATUS } from "./constant";
import { apiData } from "./apiData";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.campaign.data);
  const status = useSelector((state) => state.campaign.status);
  const [getData, setData] = useState(apiData);

  console.log("products", products);
  console.log("status", status);
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const ApplyDateFilter = (startDate, endDate) => {
    setData(
      getData.filter(
        (data) => data.startDate >= startDate && data.endDate <= endDate
      )
    );
  };

  const ApplyNameFilter = (searchName = "") => {
    setData(getData.filter((data) => data.name.indexOf(searchName) >= 0));
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
