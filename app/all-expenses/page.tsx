"use client";
import Header from "../header";
import dynamic from "next/dynamic";

const LeftDash = dynamic(() => import("../components/LeftDash"), {
  loading: () => <p>Loading...</p>,
});
const MiddleAllExpenses = dynamic(() => import("../components/MiddleAllExpenses"), {
  loading: () => <p>Loading...</p>,
});
const RightAllExpenses = dynamic(() => import("../components/RightAllExpenses"), {
  loading: () => <p>Loading...</p>,
});

export default function AllExpenses() {
  return (
    <div>
      <Header path="all-expenses" />
      <div className="main-body">
        <LeftDash path="all-expenses" />
        <MiddleAllExpenses />
        <RightAllExpenses />
      </div>
    </div>
  );
}
