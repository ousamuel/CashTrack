"use client";
import Header from "../header";
import dynamic from "next/dynamic";

const LeftDash = dynamic(() => import("../components/LeftDash"), {
  loading: () => <p>Loading...</p>,
});
const MiddleDash = dynamic(() => import("../components/MiddleDash"), {
  loading: () => <p>Loading...</p>,
});
const RightOnTheGo = dynamic(() => import("../components/RightOnTheGo"), {
  loading: () => <p>Loading...</p>,
});

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
