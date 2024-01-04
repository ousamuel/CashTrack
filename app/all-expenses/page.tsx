"use client";
import Header from "../header";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";
const LeftDash = dynamic(() => import("../components/LeftDash"), {
  loading: () => <div className="left-container">Loading...</div>,
});
const MiddleAllExpenses = dynamic(
  () => import("../components/MiddleAllExpenses"),
  {
    loading: () => <div className="mid-container text-center">Loading ...</div>,
  }
);
const RightAllExpenses = dynamic(
  () => import("../components/RightAllExpenses"),
  {
    loading: () => <div className="right-container">Loading...</div>,
  }
);

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
