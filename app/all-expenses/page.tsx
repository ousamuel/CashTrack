"use client";
import { useContext } from "react";
import LeftDash from "../components/LeftDash";
import Header from "../header";
import MiddleAllExpenses from "../components/MiddleAllExpenses";
import RightAllExpenses from "../components/RightAllExpenses";
import { Context } from "../providers";
export default function AllExpenses() {
  const { userExpenses } = useContext(Context);
  // async function fetchAllExpenses(groupId: string) {
  //   await fetch(`http://localhost:8001/groups/${groupId}`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) =>
  //       res.ok
  //         ? res.json()
  //         : console.error("error in fetching expensebygroupid")
  //     )
  //     .then((data) => {
  //       setGroupExpenses(data.expenses);
  //       setSelectedGroup(data);
  //       // console.log(data);
  //     });
  // }

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
