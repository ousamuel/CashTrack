import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Context } from "../providers";

interface ExpenseContentProps {
  expense: any;
}
const ExpenseContent: React.FC<ExpenseContentProps> = ({ expense }) => {
  const { user } = useContext(Context);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
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
  ];
  async function deleteExpense() {
    try {
      const response: any = await fetch(
        `http://localhost:8001/expenses/${expense._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else console.log(response.status);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  return (
    <div className="expense-dropdown">
      <div className="flex">
        <Popover className="" placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Image
              className="expense-img hover-gray cursor"
              width={85}
              src={expense.imageSrc}
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
          <h3 className="py-[3px] flex justify-between relative">
            <p className="flex justify-start items-center flex-wrap max-w-[70%]">
              {expense.title.length > 21 ? (
                <div className="flex-wrap">
                  <p className="md:hidden">{expense.title.slice(0, 21)}-</p>
                  <p className="md:hidden">{expense.title.slice(21)}</p>
                  <p className="hidden md:flex">{expense.title}</p>
                </div>
              ) : (
                expense.title
              )}
            </p>
            <div className="flex justify-end">
              {confirmDelete ? (
                <Button
                  className="text-sm text-white bg-red-500 px-1 rounded-md -translate-x-[0px] items-center z-1000"
                  disableRipple
                  onClick={deleteExpense}
                >
                  Delete
                </Button>
              ) : null}
              <Image
                className="hover:cursor-pointer rounded-full"
                width={20}
                src="/svgs/delete.svg"
                onClick={() => setConfirmDelete((prevState) => !prevState)}
              />
            </div>
          </h3>

          <h4 className="mt-[3px] text-[20px] text-black font-bold">
            ${expense.totalAmount.toFixed(2)}
          </h4>
          <p className="text-[12px] text-[#999] my-[3px]">
            Created on{" "}
            {expense.transactionDate.slice(5, 7) +
              "/" +
              expense.transactionDate.slice(8, 10) +
              "/" +
              expense.transactionDate.slice(0, 4)}
          </p>
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
          distributions?
          <div className="flex flex-1 mt-2">
            <Image
              className="w-[40px] border rounded-full mr-2"
              radius="md"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
            <p className="flex-1 flex flex-wrap items-center text-[13px]">
              <strong>
                {expense.creator._id == user._id ? "You" : expense.creator.name}
              </strong>
              &nbsp;paid&nbsp;
              <strong>${expense.totalAmount.toFixed(2)}</strong>
              &nbsp;
              {expense.creator._id == user._id ? "and are owed" : "and is owed"}
              &nbsp;
              <strong>
                {" "}
                $
                {(
                  expense.totalAmount -
                  expense.totalAmount / (expense.users.length + 1)
                ).toFixed(2)}
              </strong>
            </p>
          </div>
          {expense.distributions.map((distribution: any) => {
            console.log(distribution);
            return (
              <div key={distribution._id} className="flex flex-1 mt-2">
                <Image
                  className="w-[40px] border rounded-full mr-2"
                  radius="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <p className="flex-1 flex flex-wrap items-center text-[13px]">
                  <strong>
                    {" "}
                    {distribution.lendingUser._id == user._id
                      ? "You"
                      : distribution.lendingUser.name}
                  </strong>
                  &nbsp;
                  {distribution.lendingUser._id == user._id ? "owe" : "owes"}
                  &nbsp; $
                  <strong className="underline">
                    {distribution.amount.toFixed(2)}
                    {/* {(
                          expense.totalAmount /
                          (expense.users.length + 1)
                        ).toFixed(2)} */}
                  </strong>
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-1/2 pr-3 pl-1"> payments</div>
      </div>
    </div>
  );
};

export default ExpenseContent;
