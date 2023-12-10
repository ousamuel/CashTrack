"use client";
import React, { useContext, useState, useEffect } from "react";

import LeftDash from "../components/LeftDash";
import Header from "../header";
import RightGroupBalances from "../components/RightGroupBalances";
import MiddleGroups from "../components/MiddleGroups";
import { Context } from "../providers";
export default function GroupPage() {
  const { selectedGroup } = useContext(Context);
  const [groupExpenses, setGroupExpenses] = useState<any>([]);

  useEffect(() => {
    fetchGroupExpenses(selectedGroup._id);
  }, []);

  async function fetchGroupExpenses(groupId: string) {
    await fetch(`http://localhost:8001/expenses/${groupId}`, {
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
        setGroupExpenses(data);
        // console.log(data)
      });
  }

  return (
    <div>
      <Header path="dashboard" />
      <div className="main-body">
        <LeftDash path="group-test" />
        <MiddleGroups group={selectedGroup} expenses={groupExpenses} />
        <RightGroupBalances />
      </div>
    </div>
  );
}

// interface GroupProps {
//   _id: string;
//   groupName: string;
//   createdDate: string;
//   creator: string;
//   expenses: [];
//   users: [];
// }
// const GroupPage: React.FC<GroupProps> = (group) => {
//   const { selectedGroup } = useContext(Context);
//   return (
//     <div>
//       <Header path="dashboard" />
//       <div className="main-body">
//         <LeftDash path="group-test" />
//         <MiddleGroups path="group-test" />
//         <RightGroupBalances />
//       </div>
//     </div>
//   );
// };
// export default GroupPage;
