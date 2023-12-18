import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { Context } from "../providers";
export default function MiddleDashList() {
  const { user, userExpenses, setUserExpenses } = useContext(Context);
  // const ownedExpenses = expenses.filter(
  //   (expense: any) =>
  //     expense.creator && expense.creator._id === userObj._id
  // );
  // const totalPaid = ownedExpenses.reduce(
  //   (total: number, { totalAmount }: { totalAmount: number }) =>
  //     total + totalAmount,
  //   0
  // );
  // const involvedExpenses = expenses.filter(
  //   (expense: any) =>
  //     expense.users && expense.users.includes(userObj._id)
  // );
  // let totalBorrowed = 0;
  // involvedExpenses.map((expense: any) => {
  //   for (let i = 0; i < expense.distributions.length; i++) {
  //     if (expense.distributions[i].lendingUser._id == userObj._id) {
  //       totalBorrowed += expense.distributions[i].amount;
  //       break;
  //     }
  //   }
  // });
  return (
    <div className="p-3 flex">
      <div className="w-1/2 pr-3 pl-1">
        {user
          ? user.expenses
              .filter(
                (expense: any) =>
                  expense.creator && expense.creator._id != user._id
              )
              .map((expense: any) =>
                expense.distributions
                  .filter(
                    (distribution: any) =>
                      distribution.lendingUser._id == user._id
                  )
                  .map((distribution: any) => (
                    <div key={distribution._id}>
                      I owe {distribution.amount} to {expense.creator.name} for {expense.title}
                    </div>
                  ))
              )
          : "null"}
      </div>
      <div className="w-1/2 pr-3 pl-1">
        {user
          ? user.expenses
              .filter(
                (expense: any) =>
                  expense.creator && expense.creator._id == user._id
              )
              .map((expense: any) =>
                expense.distributions.map((distribution: any) => (
                  <div key={distribution._id}>
                    {distribution.lendingUser.name} owes me{" "}
                    {distribution.amount} for {distribution.title}
                  </div>
                ))
              )
          : "null"}
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-1 mt-2">
  <Image
    className="w-[40px] border rounded-full mr-2"
    radius="md"
    src="/images/christie.jpg"
    alt="avatar"
  />
  <p className="flex-1 flex flex-wrap items-center text-[13px]">
    <strong>Sam</strong>
    &nbsp;paid&nbsp;
    <strong>$50.00</strong>
    &nbsp;and owes&nbsp;
    <strong>$25.00</strong>
  </p>
</div> */
}
