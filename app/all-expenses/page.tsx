"use client";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import MiddleAllExpenses from "../components/MiddleAllExpenses";
import RightAllExpenses from "../components/RightAllExpenses";
export default function AllExpenses() {
  return (
    <div>
      <Header />
      <div className="main-body">
        <LeftDash path="all-expenses" />
        <MiddleAllExpenses />
        <RightAllExpenses />
      </div>
    </div>
  );
}
