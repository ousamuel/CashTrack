import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import ExpenseAccordionItem from "./ExpenseAccordionItem";

export default function MiddleRecentActivity() {
  return (
    <div className='mid-container'>
      <div className="p-3 bg-[#EEEEEE] flex border-b-2 justify-between">
        <h1 className="topbar">Recent Activity</h1>
      </div>
      <div className="p-3 flex">
        <div className="w-1/2 pr-3 pl-1">
          <div className="flex flex-1 mt-2">
            <Image
              className="w-[40px] border rounded-full mr-2"
              radius="md"
              src="/images/christie.jpg"
              alt="avatar"
            />
            <p className="flex-1 flex flex-wrap items-center text-[13px]">
              <strong>middlerecent</strong>
              &nbsp;paid&nbsp;
              <strong>$50.00</strong>
              &nbsp;and owes&nbsp;
              <strong>$25.00</strong>
            </p>
          </div>
        </div>
        <div className="w-1/2 pr-3 pl-1">1</div>
      </div>
    </div>
  );
}
