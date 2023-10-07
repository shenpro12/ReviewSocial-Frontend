import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./features/header/header.component";
import Footer from "./features/footer/footer.component";
import AppLoading from "./features/app-loading/app-loading.component";
import HttpClient from "./util/httpClient";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await HttpClient.get("UserProfile", setLoading);
      console.log(data);
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
      <Header />
      <div className="w-full h-screen bg-neutral-400/10">
        <div className="container mx-auto px-3 xl:max-w-4xl">
          <Outlet />
        </div>
      </div>
      <div className="w-full h-screen bg-neutral-400/10">
        <div className="container mx-auto px-3 xl:max-w-4xl">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
