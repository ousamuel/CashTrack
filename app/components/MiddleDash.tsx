import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import ExpenseSettle from "./ExpenseSettle";
import MiddleDashList from "./MiddleDashList";
import MiddleDashChart from "./MiddleDashChart";
export default function MiddleDash() {
  return (
    <div className='mid-container'>
      <div className="p-3 bg-[#EEEEEE] flex justify-between">
        <h1 className="topbar">Dashboard</h1>
        <ExpenseSettle />
      </div>
      <div className="py-[6px] bg-[#EEEEEE] flex justify-between border-y border-gray-300">
        <div className="block ">
          <p>total balance</p>
          <p className='orange'>{"-"} ${"41.87"}</p>
        </div>
        <div className="block border-l border-gray-300">
          <p>you owe</p>
          <p className='orange'>{"-"} ${"41.87"}</p>
        </div>
        <div className="block border-l border-gray-300">
          <p>you are owed</p>
          <p className='green'>{"-"} ${"41.87"}</p>
        </div>
      </div>
      <h2 className="flex uppercase p-2 px-3 text-[14px]">
        <div className="flex w-1/2 justify-between">
          <span>you owe</span>
          <Button disableRipple className="list-btn" radius="lg">
            <Image
              className="h-[12px]"
              width="15px"
              src="/svgs/list.svg"
              alt="list"
            />
            <span className="pl-[2px]">view as list</span>
          </Button>{" "}
        </div>
        <div className="flex w-1/2 justify-between">
          <Button disableRipple className="chart-btn" radius="lg">
            <Image
              className="border-[1.5px] border-black "
              width="12px"
              src="/svgs/chart.svg"
              alt="charts"
            />
            <span className="pl-1">view chart</span>
          </Button>{" "}
          <span>you are owed</span>
        </div>
      </h2>
      <MiddleDashList />
      {/* <MiddleDashChart /> */}
    </div>
  );
}
