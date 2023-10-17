import React from "react";
import { AdminPanel } from "./admin/adminPanel";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div>
      <AdminPanel />
      <main
        className="App"
      >
        <Outlet />
      </main>
    </div>
  );
};
