"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "@/app/header";
import LeftDash from "@/app/components/LeftDash";
import MiddleGroups from "@/app/components/MiddleGroups";
import RightGroupBalances from "@/app/components/RightGroupBalances";
import { Context } from "@/app/providers";

export default function GroupPage(params: any) {
  const {
    user,
    groupExpenses,
    setGroupExpenses,
    setSelectedGroup,
    selectedGroup,
  } = useContext(Context);

  async function fetchGroupData(groupId: string) {
    await fetch(`http://localhost:8001/groups/${groupId}`, {
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
        console.log(data);
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
