import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Button,
  Link,
  Accordion,
  AccordionItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import ExpenseAccordionItem from "./ExpenseAccordionItem";
import ExpenseSettle from "./ExpenseSettle";
export default function MiddleAllExpenses() {
  const defaultContent: JSX.Element = (
    <div className="expense-dropdown">
      <div className="flex">
        <Image className="expense-img" width={85} src="/images/receipt.png" />
        <div className="ml-3">
          <h3 className="py-[3px]">Name of Expense</h3>
          <h4 className="mt-[3px] text-[20px] text-black font-bold">$50.00</h4>
          <p className="text-[12px] text-[#999] my-[3px]">updated on date</p>
          <Button
            disableRipple
            className="btn-2 btn-orange text-[11px]"
            radius="lg"
          >
            Edit expense
          </Button>
        </div>
      </div>
      <div className="border-t flex mt-3 pt-2">
        <div className="w-1/2 pr-3 pl-1">
          <div className="flex flex-1 mt-2">
            <Image
              className="w-[40px] border rounded-full mr-2"
              radius="md"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
            <p className="flex-1 flex flex-wrap items-center text-[13px]">
              <strong>Sam</strong>
              &nbsp;paid&nbsp;
              <strong>$50.00</strong>
              &nbsp;and owes&nbsp;
              <strong>$25.00</strong>
            </p>
          </div>
          <div className="flex flex-1 mt-2">
            <Image
              className="w-[40px] border rounded-full mr-2"
              radius="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <p className="flex-1 flex flex-wrap items-center text-[13px]">
              <strong>Christie</strong>
              &nbsp;owes&nbsp;
              <strong>$25.00</strong>
            </p>
          </div>
        </div>
        <div className="w-1/2 pr-3 pl-1"></div>
      </div>
    </div>
  );
  return (
    <div className="mid-container">
      <div className="p-3 bg-[#EEEEEE] flex border-b-2 justify-between">
        <h1 className="topbar">All expenses</h1>
        <ExpenseSettle />
      </div>
      <Accordion className="p-0 w-full">
        <AccordionItem
          key="1"
          textValue="default"
          className="expense-parent"
          title={<ExpenseAccordionItem />}
          hideIndicator
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          textValue="default"
          className="expense-parent"
          title={<ExpenseAccordionItem />}
          hideIndicator
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
