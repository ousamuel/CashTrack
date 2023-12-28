import React, { useContext, useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Context } from "../providers";
import ExpenseAccordionItem from "./ExpenseAccordionItem";
import ExpenseContent from "./ExpenseContent";
import ExpenseSettle from "./ExpenseSettle";

export default function MiddleAllExpenses() {
  const { user, userExpenses, deleteExpense } = useContext(Context);
  const { api } = useContext(Context);
  return (
    <div className="mid-container">
      <div className="p-3 bg-[#EEEEEE] flex border-b justify-between">
        <h1 className="topbar">All expenses</h1>
        <ExpenseSettle group={null} />
      </div>
      {userExpenses ? (
        <Accordion className="p-0 w-full overflow-y-scroll">
          {userExpenses.map((expense: any, index: number) => {
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
                    totalReturn={totalReturn}
                    totalUpdatedReturn={totalUpdatedReturn}
                    path={""}
                    expense={expense}
                  />
                }
                hideIndicator
              >
                {user ? (
                  <ExpenseContent
                    deleteExpenseFunction={deleteExpense}
                    totalReturn={totalReturn}
                    expense={expense}
                    index={index}
                  />
                ) : null}
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : null}
    </div>
  );
}
