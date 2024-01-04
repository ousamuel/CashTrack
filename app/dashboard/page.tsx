"use client";
import Header from "../header";
import dynamic from "next/dynamic";
const LeftDash = dynamic(() => import("../components/LeftDash"), {
  loading: () => <div className='left-container'>Loading...</div>,
});
const MiddleDash = dynamic(() => import("../components/MiddleDash"), {
  loading: () => <div className='mid-container text-center'>Loading ...</div>
});
const RightOnTheGo = dynamic(() => import("../components/RightOnTheGo"), {
  loading: () => <div className='right-container'>Loading...</div>,
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
