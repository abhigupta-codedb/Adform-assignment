import { useEffect } from "react";
import "./App.css";
import Campaign from "./components/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/campaignSlice";
import { STATUS } from "./constant/helpers";
import { mockData } from "./constant/mockData";
import {
  normalizeUsersSelector,
  normalizeTestData,
} from "./store/selectors/selectors";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.campaign.status);
  const allUsers = useSelector(normalizeUsersSelector);
  const renderData = normalizeTestData(allUsers, mockData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
          <Campaign data={renderData} allUsers={allUsers} />
        )}
      </div>
    </div>
  );
}

export default App;
