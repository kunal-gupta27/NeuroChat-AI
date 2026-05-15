import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { MyContaxt } from "./MyContaxt.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
  const { showSidebar } = useContext(MyContaxt);

  return (
    <div className="flex w-full">
      <div className="absolute z-1000 lg:relative">
        {showSidebar && <Sidebar />}
      </div>

      <div className="min-h-screen w-full flex flex-col bg-[#1f1f1f]">
        <Navbar />

        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;