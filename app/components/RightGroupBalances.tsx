"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Link, Button, Tooltip } from "@nextui-org/react";
export default function RightGroupBalances() {
  type ButtonType = {
    src: string;
    desc: string;
  };

  const buttonArray: ButtonType[] = [
    { src: "/svgs/list.svg", desc: "Group Balances" },
    { src: "/svgs/calendar.svg", desc: "Upcoming expenses" },
    { src: "/svgs/chart.svg", desc: "Trends" },
    // { src: "/svgs/chat.svg", desc: "Whiteboard" },
    // { src: "/svgs/settings.svg", desc: "Settings" },
  ];

  const [owed, setOwed] = useState<number>(40.5);
  const [youOwe, setYouOwe] = useState<number>(155.5);
  const netBalance: number = owed - youOwe;
  const BalancesComponent: React.FC = () => {
    type MemberExpenses = {
      name: string;
      payments: [];
    };
    const membersArray: MemberExpenses[] = [
      { name: "john", payments: [] },
      { name: "kayne", payments: [] },
    ];
    return (
      <div>
        <h2 className="uppercase">Group Balances</h2>
        {membersArray.map((member) => {
          return (
            <div className="flex flex-1 mt-2" key={member.name}>
              <Image
                className="w-[40px] border rounded-full mr-2"
                radius="md"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <p className="flex-1 flex flex-wrap items-center text-[13px]">
                <strong>{member.name}</strong>
                &nbsp;paid&nbsp;
                {/* <strong>${expense.totalAmount.toFixed(2)}</strong>
            &nbsp;and owes&nbsp; */}
                <strong>$25.00</strong>
              </p>
            </div>
          );
        })}
      </div>
    );
  };
  const ExpensesComponent: React.FC = () => {
    return (
      <div>
        <h2 className="uppercase">upcoming expenses</h2>
        <span>You have not added any recurring expenses yet </span>
      </div>
    );
  };
  const TrendsComponent: React.FC = () => {
    return (
      <div>
        <h2 className="uppercase">trends this month</h2>
        <div>
          <h4>Total you paid for</h4>
          <p className="green">{"$12.50"}</p>
          <h4>Your total share</h4>
          <p className="orange">{"$12.50"}</p>
          <h4>Payments made</h4>
          <p className="orange">{"$12.50"}</p>
          <h4>Payments received</h4>
          <p className="green">{"$12.50"}</p>
          <h4>Total change in balance</h4>
          <strong className="green text-[18px]">{"$12.50"}</strong>
        </div>
      </div>
    );
  };
  const renderComponent = (desc: string): React.FC => {
    switch (desc) {
      case "Balances":
        return BalancesComponent;
      case "Upcoming expenses":
        return ExpensesComponent;
      case "Trends":
        return TrendsComponent;
      default:
        return BalancesComponent;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<React.FC | any>(
    BalancesComponent
  );
  const [selectedDesc, setSelectedDesc] = useState<string>("Group Balances");
  const handleButtonClick = (desc: string): void => {
    setSelectedDesc(desc);
    const component = renderComponent(desc);
    setSelectedComponent(component);
  };
  return (
    <div className="right-container">
      {buttonArray.map((obj) => {
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
      })}
      <div className="mt-2">{selectedComponent}</div>
    </div>
  );
}
