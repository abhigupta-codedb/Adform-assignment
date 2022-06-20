import { useEffect } from "react";
import "./App.css";
import Campaign from "./components/Campaign";
import { useDispatch } from "react-redux";
import { fetchData } from "./store/campaignSlice";
import { STATUS } from "./helpers/helpers";
import { mockData } from "./helpers/mockData";
import { normalizeTestData } from "./store/selectors/selectors";
import { GetApiStatus, GetAllUsers } from "./hooks/hooks";

const App = () => {
  const dispatch = useDispatch();
  const status = GetApiStatus();
  const renderData = normalizeTestData(GetAllUsers(), mockData);

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
          <Campaign data={renderData} />
        )}
      </div>
    </div>
  );
};

export default App;
