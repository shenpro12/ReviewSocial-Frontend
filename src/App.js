import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./features/header/header.component";
import Footer from "./features/footer/footer.component";
import AppLoading from "./features/app-loading/app-loading.component";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
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
