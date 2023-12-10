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
import { Context } from "../providers";
import ExpenseAccordionItem from "./ExpenseAccordionItem";
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
  const { api } = useContext(Context);
  console.log(expenses);
  // type Expense = {
  //   title: string;
  //   creator: string;
  //   transactionDate: Date;
  //   totalAmount: number;
  //   groupName: string;
  //   imageSrc: string;
  //   // payments: [];
  // };
  // const allExpenses: Expense[] = [
  //   {
  //     title: "title",
  //     creator: "creator",
  //     transactionDate: new Date(),
  //     totalAmount: 11.1,
  //     groupName: "",
  //     imageSrc: "food-drink",
  //   },
  //   {
  //     title: "title2",
  //     creator: "creator2",
  //     transactionDate: new Date(),
  //     totalAmount: 50.0,
  //     groupName: "groupname2",
  //     imageSrc: "entertainment",
  //   },
  // ];

  type Category = {
    name: string;
    iconSrc: string;
  };

  const categories: Category[] = [
    { name: "General", iconSrc: "/ss/receipt.png" },
    { name: "Food & Drink", iconSrc: "/ss/food-drink.png" },
    { name: "Entertainment", iconSrc: "/ss/entertainment.png" },
    { name: "Transportation", iconSrc: "/ss/car.png" },
    { name: "Home", iconSrc: "/ss/home.png" },
    { name: "Custom", iconSrc: "/ss/custom.png" },
  ];

  const defaultContent: JSX.Element = (
    <div className="expense-dropdown">
      <div className="flex">
        <Popover className="" placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Image
              className="expense-img hover-gray cursor"
              width={85}
              src="/ss/receipt.png"
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="bg-white rounded-md p-3 border-gray-300 border-[1.5px] -translate-y-2 translate-x-[30px]">
              <table>
                <tbody className="text-[14px]">
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}:</td>
                      <td>
                        <Image
                          // onClick={()=>{}}
                          className="hover-gray"
                          width={30}
                          src={category.iconSrc}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PopoverContent>
        </Popover>
        <div className="ml-3">
          <h3 className="py-[3px]">Name of Expense {api}</h3>
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
              <strong>Jenny</strong>
              &nbsp;owes&nbsp;
              <strong>$25.00</strong>
            </p>
          </div>
        </div>
        <div className="w-1/2 pr-3 pl-1"></div>
      </div>
    </div>
  );

  // console.log(group.expenses)
  return (
    <div className="mid-container">
      <div className="p-3 bg-[#EEEEEE] flex border-b justify-between">
        <h1 className="topbar">{group.groupName}</h1>
        <ExpenseSettle />
      </div>
      <Accordion className="p-0 w-full">
        {expenses.map((expense: any) => {
          return (
            <AccordionItem
              key={expense._id}
              textValue="default"
              className="expense-parent"
              title={<ExpenseAccordionItem path="group-test" expense={expense} />}
              hideIndicator
            >
              {defaultContent}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MiddleGroups;
