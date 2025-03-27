import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className="d-flex justify-content-between">

                <Sidebar />

                <div className="flex-grow-1">

                    <Header />
                    <main className="py-3 p-md-5 overflow-hidden">
                        <Outlet />


                        {/* <Suspense fallback={<></>}>
      {children}
    </Suspense> */}
                    </main>

                </div>
            </div>
        </>
    )
}

export default Dashboard;