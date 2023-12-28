import React, { useContext, useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Context } from "../providers";
import ExpenseAccordionItem from "./ExpenseAccordionItem";
import ExpenseContent from "./ExpenseContent";
import ExpenseSettle from "./ExpenseSettle";

interface GroupType {
  _id: string;
  groupName: string;
  createdDate: string;
  creator: string;
  expenses: [];
  users: [];
}
type MiddleGroupsProps = {
  group: GroupType;
  expenses: any;
};
const MiddleGroups: React.FC<MiddleGroupsProps> = ({ group, expenses }) => {
  const { api, user, setGroupExpenses, deleteExpense } = useContext(Context);

  return (
    <div className="mid-container">
      <div className="p-3 bg-[#EEEEEE] flex border-b justify-between">
        <h1 className="topbar">{group.groupName}</h1>
        <ExpenseSettle group={group} />
      </div>
      {expenses.length && user ? (
        <Accordion className="p-0 w-full overflow-y-scroll">
          {expenses.map((expense: any, index: number) => {
            const totalReturn = expense.distributions.reduce(
              (
                total: number,
                { amount }: { amount: number; }
              ) => total + amount ,
              0
            );
            const totalUpdatedReturn = expense.distributions.reduce(
              (
                total: number,
                { amount, payment }: { amount: number; payment: number }
              ) => total + amount - payment,
              0
            );
            return (
              <AccordionItem
                key={expense._id}
                textValue="default"
                className="expense-parent"
                title={
                  <ExpenseAccordionItem
                    path="groups"
                    totalReturn={totalReturn}
                    totalUpdatedReturn={totalUpdatedReturn}
                    expense={expense}
                  />
                }
                hideIndicator
              >
                <ExpenseContent
                  totalReturn={totalReturn}
                  expense={expense}
                  index={index}
                  deleteExpenseFunction={deleteExpense}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <h2 className="uppercase text-center text-lg pt-4">
          Add an expense to get started
        </h2>
      )}
    </div>
  );
};

export default MiddleGroups;
