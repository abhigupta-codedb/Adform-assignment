import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

test("Component renders with redux", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
