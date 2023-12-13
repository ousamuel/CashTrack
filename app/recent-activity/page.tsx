"use client";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import MiddleRecentActivity from "../components/MiddleRecentActivity";
import RightOnTheGo from "../components/RightOnTheGo";
export default function RecentActivity() {
  return (
    <div>
      <Header path="recent-activity" />
      <div className="main-body">
        <LeftDash path="recent-activity" />
        <MiddleRecentActivity />
        <RightOnTheGo />
      </div>
    </div>
  );
}
