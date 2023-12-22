"use client";
import MiddleDash from "../components/MiddleDash";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import RightOnTheGo from "../components/RightOnTheGo";
export default function Dashboard() {
  return (
    <div>
      <Header path="dashboard" />
      <div className="main-body">
        <LeftDash path="dashboard" />
        <MiddleDash />
        <RightOnTheGo />
      </div>
    </div>
  );
}
