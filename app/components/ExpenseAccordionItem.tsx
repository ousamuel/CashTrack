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
      <div className="max-w-[35px] text-center flex flex-col justify-center inline-block">
        <p className="text-[10px] uppercase">oct</p>
        <h4 className="text-[20px]">30</h4>
      </div>

      <div className="max-w-[50px]">
        <Popover className="" placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Image
              className="hover-gray"
              width={35}
              src="/images/receipt.png"
              alt="icon"
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="bg-white rounded-md p-3 border-gray-300 border-[1.5px] -translate-y-2 translate-x-[70px]">
              <table>
                <tbody>
                  <tr>
                    <td>Entertainment</td>
                    <td>123</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PopoverContent>
        </Popover>
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
        <p className="expense-owe">you lent Christie</p>
        <h4 className="mt-[3px] text-[16px] green font-bold">$25.00</h4>
      </div>
    </div>
  );
}
