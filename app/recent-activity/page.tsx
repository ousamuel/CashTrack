"use client";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import RightGroups from "../components/RightGroups";
import MiddleRecentActivity from "../components/MiddleRecentActivity";
export default function RecentActivity() {
  return (
    <div>
      <Header path="recent-activity" />
      <div className="main-body">
        <LeftDash path="recent-activity" />
        <MiddleRecentActivity />
        <RightGroups />
      </div>
    </div>
  );
}
