"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "@/app/header";
import LeftDash from "@/app/components/LeftDash";
import MiddleGroups from "@/app/components/MiddleGroups";
import RightGroupBalances from "@/app/components/RightGroupBalances";
import { Context } from "@/app/providers";

export default function GroupPage({ params }: { params: any }) {
  const {
    user,
    groupExpenses,
    setGroupExpenses,
    setSelectedGroup,
    selectedGroup,
    BACKEND_API,
  } = useContext(Context);

  async function fetchGroupData(groupId: string) {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}groups/${groupId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((res) =>
        res.ok
          ? res.json()
          : console.error("error in fetching expensebygroupid")
      )
      .then((data) => {
        const reversedGroupExpenses = data.expenses.toReversed();
        setGroupExpenses(reversedGroupExpenses);
        setSelectedGroup(data);
        // console.log(data);
      });
  }

  useEffect(() => {
    fetchGroupData(params.groupId);
  }, []);

  return (
    <div>
      <Header path={params.groupId} />
      <div className="main-body">
        <LeftDash path={params.groupId} />
        <MiddleGroups group={selectedGroup} expenses={groupExpenses} />
        <RightGroupBalances group={selectedGroup} expenses={groupExpenses} />
      </div>
    </div>
  );
}
