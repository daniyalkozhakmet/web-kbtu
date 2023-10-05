import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="App" style={{minHeight:"100vh",marginTop:"80px" ,paddingBottom:'50px'}}>
        <Outlet />
      </main>
    </>
  );
};

