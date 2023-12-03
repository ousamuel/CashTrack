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

export default function ExpenseAccordionItem() {
  return (
    <div className="expense-trigger open-down">
      <div className="max-w-[35px] mr-[5px] text-center flex flex-col justify-center inline-block">
        <p className="text-[10px] uppercase">oct</p>
        <p className="text-[20px] ">30</p>
      </div>

      <div className="max-w-[50px]">
        <Image
          width={35}
          src="/ss/receipt.png"
          alt="icon"
        />
      </div>
      <div className="max-w-[500px] text-left flex flex-col">
        <p className="text-[16px] text-black text-left my-auto font-bold expense-title">
          Name of Expense
        </p>
        <p className="mt-[3px] expense-group ">Name of Group</p>
      </div>
      <div className="max-w-[115px] px-2 text-right">
        <p className="expense-owe">you paid</p>
        <h4 className="mt-[3px] text-[16px] text-black font-bold">$50.00</h4>
      </div>
      <div className="px-1 max-w-[135px]">
        <p className="expense-owe">you lent Jenny</p>
        <h4 className="mt-[3px] text-[16px] green font-bold">$25.00</h4>
      </div>
    </div>
  );
}
