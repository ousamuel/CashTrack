"use client";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import RightGroupBalances from "../components/RightGroupBalances";
import MiddleGroups from "../components/MiddleGroups";
export default function Dashboard() {
  return (
    <div>
      <Header path='dashboard' />
      <div className="main-body">
        <LeftDash path="group-test" />
        <MiddleGroups path="group-test"/>
        <RightGroupBalances />
      </div>
    </div>
  );
}
