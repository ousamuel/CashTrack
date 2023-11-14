"use client";
import MiddleDash from "../components/MiddleDash";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import RightGroups from "../components/RightGroups";
export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="main-body">
        <LeftDash path="dashboard" />
        <MiddleDash />
        <RightGroups />
      </div>
    </div>
  );
}
