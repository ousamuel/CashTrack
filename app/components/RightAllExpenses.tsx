"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Link, Button, Tooltip } from "@nextui-org/react";
import { Context } from "../providers";
export default function RightAllExpenses() {
  const { user, userGroups, totalOwed, totalOwe } = useContext(Context);
  type ButtonType = {
    src: string;
    desc: string;
  };

  const buttonArray: ButtonType[] = [
    // { src: "/svgs/list.svg", desc: "Balances" },
    { src: "/svgs/calendar.svg", desc: "Upcoming expenses" },
    { src: "/svgs/settings.svg", desc: "Settings" },
  ];
  // const BalancesComponent: React.FC = () => {
  //   return (
  //     <div>
  //       <h2 className="uppercase">your total balance</h2>
  //       <div className="orange ">
  //         <p className="text-[16px]">you owe</p>
  //         <strong className="text-[28px] leading-none">
  //           ${totalOwe.toFixed(2)}
  //         </strong>{" "}
  //       </div>
  //       <div className="green">
  //         <p className="text-[16px]">you are owed</p>
  //         <strong className="text-[28px]">${totalOwed.toFixed(2)}</strong>
  //       </div>
  //       <div className="flex flex-col">
  //         <strong className="text-[16px]">Net Balance</strong>
  //         <strong className={totalOwe > totalOwed ? "orange" : "green"}>
  // //               {totalOwe > totalOwed ? "-" : ""}$
  //         {Math.abs(totalOwe - totalOwed).toFixed(2)}
  //         </strong>
  //       </div>
  //     </div>
  //   );
  // };
  const ExpensesComponent: React.FC = () => {
    return (
      <div>
        <h2 className="uppercase">upcoming expenses</h2>
        <span>You have not added any recurring expenses yet </span>
      </div>
    );
  };
  
  const RandomComp: React.FC = () => {
    return (
      <div>
        <h2 className="uppercase">upcoming 12312312</h2>
        <span>You have not added any 2312312321312 expenses yet </span>
      </div>
    );
  };
  
  const renderComponent = (desc: string): React.FC => {
    switch (desc) {
      case "Balances":
        return ExpensesComponent;
      case "Upcoming expenses":
        return ExpensesComponent;
      default:
        return RandomComp;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<React.FC | any>(
    ExpensesComponent
  );
  const [selectedDesc, setSelectedDesc] = useState<string>("Balances");
  const handleButtonClick = (desc: string): void => {
    setSelectedDesc(desc);
    const component = renderComponent(desc);
    setSelectedComponent(component);
  };
  return (
    <div className="right-container">
      <div>
        <h2 className="uppercase">your total balance</h2>
        <div className="orange ">
          <p className="text-[16px]">you owe</p>
          <strong className="text-[28px] leading-none">
            ${totalOwe.toFixed(2)}
          </strong>{" "}
        </div>
        <div className="green my-2">
          <p className="text-[16px]">you are owed</p>
          <strong className="text-[28px]">${totalOwed.toFixed(2)}</strong>
        </div>
        <div className="flex flex-col">
          <strong className="text-[16px]">Net Balance</strong>
          <strong
            className={
              totalOwed >= totalOwe ? "green text-[28px]" : "orange text-[28px]"
            }
          >
            {totalOwe > totalOwed ? "-" : ""}$
            {Math.abs(totalOwe - totalOwed).toFixed(2)}
          </strong>
        </div>
      </div>

      {/* {buttonArray.map((obj) => {
        return (
          <Tooltip
            content={
              <div className="bg-black text-white rounded-lg p-2 -translate-y-1">
                {obj.desc}
              </div>
            }
            key={obj.src}
            placement="bottom"
            closeDelay={0}
          >
            <Button
              className={
                selectedDesc == obj.desc
                  ? "popover-trigger popover-open"
                  : "popover-trigger"
              }
              onClick={() => handleButtonClick(obj.desc)}
              disableRipple
            >
              <Image width={15} src={obj.src} alt={obj.src} />
            </Button>
          </Tooltip>
        );
      })} */}
      {/* <div className="mt-2">{selectedComponent}</div> */}
    </div>
  );
}
