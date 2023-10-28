import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./features/header/header.component";
import Footer from "./features/footer/footer.component";
import AppLoading from "./features/app-loading/app-loading.component";
import HttpClient from "./util/httpClient";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useDispatch } from "react-redux";
import { login } from "./app/reducer/userSlice";
import { addListProvince } from "./app/reducer/provinceSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await HttpClient.get("UserProfile", setLoading);
      user && dispatch(login(user));
      const province = await HttpClient.get("province/getall", setLoading);

      dispatch(addListProvince(province));
    })();
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        pauseOnHover
        pauseOnFocusLoss={false}
        autoClose={3000}
        limit={3}
        theme="colored"
        progressClassName={"Toastify__progress-bar"}
      />
      <AppLoading loading={loading} />
      {!loading && (
        <>
          <Header />
          <div className="w-full bg-neutral-200/10">
            <div className="container mx-auto px-3 xl:max-w-6xl py-10">
              <Outlet />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
