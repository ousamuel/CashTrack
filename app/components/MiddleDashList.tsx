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
          ? Object.entries(
              user.expenses.reduce((creditors: any, expense: any) => {
                const creditorName = expense.creator.name;

                // Skip if the creditor is the current user
                if (creditorName === user.name) {
                  return creditors;
                }

                const distributions = expense.distributions
                  .filter(
                    (distribution: any) =>
                      distribution.lendingUser._id === user._id
                  )
                  .map((distribution: any) => ({
                    id: distribution._id,
                    amount: distribution.amount,
                    expenseTitle: expense.title,
                  }));

                if (creditors[creditorName]) {
                  creditors[creditorName].distributions =
                    creditors[creditorName].distributions.concat(distributions);
                } else {
                  creditors[creditorName] = {
                    distributions: distributions,
                  };
                }

                return creditors;
              }, {})
            ).map(([creditorName, creditorData]) => (
              <div key={creditorName}>
                <h3>{creditorName}</h3>
                <ul>
                  {creditorData.distributions.map((distribution: any) => (
                    <li key={distribution.id}>
                      I owe {distribution.amount.toFixed(2)} for{" "}
                      {distribution.expenseTitle}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : "null"}
      </div>
      <div className="w-1/2 pr-3 pl-1">
        {user
          ? user.expenses
              .filter(
                (expense: any) =>
                  expense.creator && expense.creator._id === user._id
              )
              .map((expense: any) => {
                const distributions = expense.distributions.map(
                  (distribution: any) => ({
                    id: distribution._id,
                    amount: distribution.amount,
                    debtorName: distribution.lendingUser.name,
                    distributionTitle: distribution.title,
                  })
                );

                const groupedByDebtor = distributions.reduce((acc, item) => {
                  const key = item.debtorName;
                  acc[key] = acc[key] || { totalAmount: 0, distributions: [] };
                  acc[key].totalAmount += item.amount;
                  acc[key].distributions.push(item);
                  return acc;
                }, {});

                const uniqueDebtors = new Set(Object.keys(groupedByDebtor));

                return (
                  <div key={expense._id}>
                    {Array.from(uniqueDebtors).map((debtorName) => (
                      <div key={debtorName}>
                        <h3>{debtorName}</h3>
                        <p>
                          Total Amount Owed:{" "}
                          {groupedByDebtor[debtorName].totalAmount.toFixed(2)}
                        </p>
                        <ul>
                          {groupedByDebtor[debtorName].distributions.map(
                            (item) => (
                              <li key={item.id}>
                                {item.amount.toFixed(2)} for{" "}
                                {item.distributionTitle}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })
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
