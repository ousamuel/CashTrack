import React, { useState, useContext } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { Context } from "../providers";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  title: string;
  totalAmount: number;
  // percents: number[];
  // userIds: string[];
  // distributions: DistributionType[];
};
interface ExpenseSettleProps {
  group: any;
}
type DistributionType = {
  lendingUser: string;
  amount: number;
  title: string;
};
const ExpenseSettle: React.FC<ExpenseSettleProps> = ({ group }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  /*
OPTIONS FOR SETTING IMAGE ON EXPENSE
*/
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
  /*
OPTIONS FOR DISTRIBUTION TYPES (EVENLY, BY PERCENTAGES, CUSTOM SETTING)
*/
  type Option = {
    desc: string;
    iconSrc: string;
  };
  const distributionOptions: Option[] = [
    { desc: "Evenly", iconSrc: "/svgs/equal.svg" },
    { desc: "By Percent", iconSrc: "/svgs/percent.svg" },
    { desc: "Custom", iconSrc: "/svgs/dollar-sign.svg" },
  ];

  const postNewExpense = async function (input: { [key: string]: any }) {
    /// check userPercent, CAN NOT BE 0
    // check userIds can not be empty
    // title and total amount empty already prevents it from being posted
    // ^ probably throwing a form error, just handle it and throw red borders or smth

    // if (sum == 100) {
    //   console.log("100%");
    //   return "100%";
    // } else {
    //   console.log("not 100%");
    //   return 5;
    // }
    try {
      await fetch(`http://localhost:8001/expenses`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: input.title,
          imageSrc: imageSrc,
          creator: user._id,
          group: group._id,
          totalAmount: input.totalAmount,
          distributions: distributionsArr,
          userIds: userIds,
        }),
      })
        .then((res) => (res.ok ? res.json() : console.log(res.status)))
        .then((data) => {
          setGroupExpenses([data, ...groupExpenses]);
          setUserExpenses([data, ...userExpenses]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleExpense: SubmitHandler<FormData> = (data) => {
    postNewExpense(data);
  };
  const {
    user,
    groupExpenses,
    setGroupExpenses,
    userExpenses,
    setUserExpenses,
  } = useContext(Context);
  const [expenseAmount, setExpenseAmount] = useState<any>("");
  const [expenseTitle, setExpenseTitle] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("/ss/receipt.png");
  const [creator, setCreator] = useState<string>("");
  const [expenseModal, setExpenseModal] = useState<string>("close");
  const [distributionType, setDistributionType] = useState<string>("Evenly");
  const [settleModal, setSettleModal] = useState<string>("close");
  const [userIds, setUserIds] = useState<string[]>([]);
  const [inputPercents, setInputPercents] = useState<any[]>([]);
  const [userPercent, setUserPercent] = useState<any>();
  const [tempSideUsers, setTempSideUsers] = useState<[]>([]);

  document.addEventListener("keydown", pressEsc);
  function pressEsc(e: any) {
    if (e.key === "Escape") {
      setExpenseModal("close");
      setSettleModal("close");
    }
  }
  const percentsToIntArr = inputPercents.map((str: string) => parseInt(str));
  const sum =
    percentsToIntArr.reduce((partialSum, a) => partialSum + a, 0) +
    parseInt(userPercent);

  const handleChange = (index: number, value: any) => {
    // Create a copy of the inputPercents array
    const newInputValues = [...inputPercents];
    // Update the value at the specified index
    newInputValues[index] = value;
    // Set the updated array in state
    setInputPercents(newInputValues);
  };
  let distributionsArr: DistributionType[] = tempSideUsers
    .filter((checkUser: any) => userIds.includes(checkUser._id))
    .map((user: any, index: number) => ({
      lendingUser: user._id,
      amount:
        distributionType == "Evenly"
          ? expenseAmount / (userIds.length + 1)
          : distributionType == "By Percent"
          ? (parseInt(inputPercents[index]) * expenseAmount) / 100
          : distributionType == "Custom"
          ? 50 //custom input case
          : expenseAmount / (userIds.length + 1), //default to even distribution

      title: expenseTitle,
    }));
  // console.log(distributionsArr);

  return (
    <div className="text-[15px]">
      {expenseModal == "open" ? (
        <div className="modal flex flex-col md:flex-row md:pb-10 ">
          <form
            onSubmit={handleSubmit(handleExpense)}
            className="modal-div w-[350px] md:translate-x-[70px] md:w-[420px] max-h-[60vh] md:max-h-[70vh] overflow-y-scroll"
          >
            <div className="modal-top">
              <p>
                Add an expense {group ? "in: " : null}
                {group ? (
                  <span className="text-green-300">{group.groupName}</span>
                ) : null}
              </p>
              <p className="cursor" onClick={() => setExpenseModal("close")}>
                X
              </p>
            </div>
            <div className="modal-mid flex-col">
              <div className="flex">
                <p className="flex flex-wrap items-center">
                  With <strong className="px-1">you</strong> and:
                </p>
                <div className="flex flex-wrap">
                  {group
                    ? group.users
                        .filter((checkUser: any) =>
                          userIds.includes(checkUser._id)
                        )
                        .map((user: any) => {
                          return (
                            <strong
                              className="flex items-center m-1 "
                              key={user._id}
                            >
                              <Image
                                className="rounded-full mr-2"
                                width={30}
                                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                              />
                              {user.name}
                            </strong>
                          );
                        })
                    : null}
                </div>

                {/* <Input
                  className="w-fit"
                  placeholder="Enter names or emaasdasdasdasils"
                  // {...register("email", {
                  //   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  //   required: true,
                  // })}
                /> */}
              </div>
              <div className="flex my-2 border-t">
                <div id="postExpenseLeft flex-none justify-center" className="">
                  <div className="flex flex-col">
                    <strong>
                      <Input
                        className="w-[140px] md:w-[170px] md:text-lg border-b border-dashed m-1 text-center"
                        placeholder="Name of Expense"
                        {...register("title", {
                          required: true,
                        })}
                        value={expenseTitle}
                        onChange={(e) => {
                          setExpenseTitle(e.target.value);
                          // console.log(expenseTitle);
                        }}
                      />
                    </strong>
                    <div className="flex justify-center">
                      <Popover className="" placement="left" showArrow={true}>
                        <PopoverTrigger>
                          <div className="text-center text-gray-400">
                            <Image
                              className="expense-img hover-gray cursor rounded-md mt-3"
                              width={90}
                              src={imageSrc}
                            />
                            Click to change
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="bg-white rounded-md p-3 border-gray-300 border-[1.5px] translate-x-[10px]">
                            <table>
                              <tbody className="text-[14px]">
                                {categories.map((category, index) => (
                                  <tr key={index}>
                                    <td>{category.name}:</td>
                                    <td>
                                      <Image
                                        className="hover-gray"
                                        width={30}
                                        src={category.iconSrc}
                                        onClick={() =>
                                          setImageSrc(category.iconSrc)
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div id="postExpenseRight" className="flex-1 p-2 pb-0">
                  <div className="flex flex-col justify-center">
                    <strong className="text-center md:text-lg">
                      Total amount paid by you
                    </strong>
                    <div className="flex text-xl pl-5 justify-center ">
                      $
                      <Input
                        placeholder="0.00"
                        className="w-[120px] border-b border-dashed"
                        type="number"
                        {...register("totalAmount", {
                          required: true,
                        })}
                        value={expenseAmount}
                        onChange={(e) => {
                          setExpenseAmount(e.target.value);
                        }}
                      />
                    </div>
                    <h4 className="text-center md:text-lg">
                      Splitting options:{" "}
                    </h4>
                    <div className="flex px-2 justify-evenly">
                      {distributionOptions.map((option) => {
                        return (
                          <Tooltip
                            content={
                              <div className="bg-black text-white rounded-lg p-2 -translate-y-1">
                                {option.desc}
                              </div>
                            }
                            key={option.desc}
                            placement="bottom"
                            closeDelay={0}
                          >
                            {/* <Button
                              // className={
                              //   selectedDesc == obj.desc
                              //     ? "popover-trigger popover-open"
                              //     : "popover-trigger"
                              // }
                              disableRipple
                            > */}
                            <Image
                              width={37}
                              className={
                                distributionType == option.desc
                                  ? "border-black border-2 bg-[#2c9984] rounded-full p-2 my-2  hover:cursor-pointer"
                                  : "border rounded-full p-2 my-2 hover:bg-green-200 hover:cursor-pointer"
                              }
                              onClick={() => {
                                setInputPercents([]);
                                setDistributionType(option.desc);
                              }}
                              src={option.iconSrc}
                            />
                            {/* </Button> */}
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  my-2 border-t">
                <div className="flex flex-col flex-initial w-56">
                  {group
                    ? group.users
                        .filter((checkUser: any) =>
                          userIds.includes(checkUser._id)
                        )
                        .map((user: any, index: number) => {
                          return (
                            <div key={user._id}>
                              {user.name} owes
                              <strong>
                                {distributionType == "Evenly"
                                  ? " $" +
                                    (
                                      expenseAmount /
                                      (userIds.length + 1)
                                    ).toFixed(2)
                                  : null}
                                {distributionType == "By Percent" ? (
                                  <div className="flex">
                                    <Input
                                      placeholder="percent"
                                      type="number"
                                      value={inputPercents[index]}
                                      onChange={(e) => {
                                        // console.log(inputPercents);
                                        handleChange(index, e.target.value);
                                      }}
                                    />
                                    actual amount:
                                    {(
                                      (parseInt(inputPercents[index]) *
                                        expenseAmount) /
                                      100
                                    ).toFixed(2)}
                                  </div>
                                ) : null}
                              </strong>
                            </div>
                          );
                        })
                    : null}
                </div>
                <div className="grow text-center">
                  {" "}
                  You get back $
                  <strong>
                    {distributionType == "Evenly"
                      ? (
                          (expenseAmount * userIds.length) /
                          (userIds.length + 1)
                        ).toFixed(2)
                      : null}
                    {distributionType == "By Percent" ? (
                      <div>
                        <Input
                          placeholder="user percent"
                          type="number"
                          value={userPercent}
                          onChange={(e) => {
                            setUserPercent(e.target.value);
                          }}
                        />
                        {(
                          (parseInt(userPercent) * expenseAmount) /
                          100
                        ).toFixed(2)}
                      </div>
                    ) : null}
                  </strong>
                </div>
              </div>
            </div>

            <div className="modal-bot border-t">
              <Button
                onClick={() => setExpenseModal("close")}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button className="btn btn-green" type="submit" disableRipple>
                Save
              </Button>
            </div>
          </form>

          <div className="modal-div min-w-[260px] max-w-[80vw] ml-4 md:translate-x-[70px] max-h-[30vh] md:max-h-[80vh] overflow-y-scroll mt-3">
            <div className="modal-top">
              {" "}
              {group ? "Group Members " + `(${group.users.length})` : "Friends"}
            </div>
            <div className="modal-mid flex-col">
              <strong className="pl-1">Click on member to add/remove</strong>{" "}
              {group
                ? group.users.length
                  ? null
                  : "add group"
                : user
                ? user.friends.length
                  ? null
                  : "add friends"
                : null}
              {group
                ? group.users
                    .filter((checkUser: any) => checkUser._id != user._id)
                    .map((user: any) => {
                      const findIdx: (id: string) => boolean = function (
                        id: string
                      ): boolean {
                        return id == user._id;
                      };
                      return (
                        <Button
                          className={
                            userIds.includes(user._id)
                              ? "flex mt-1 py-[0.5px] justify-start bg-green-200 p-1 rounded-md "
                              : "flex mt-1 py-[0.5px] justify-start p-1 rounded-md hover:bg-green-100 "
                          }
                          key={user._id}
                          disableRipple
                          onClick={() => {
                            let tempUserIds: string[] = userIds;
                            if (userIds.includes(user._id)) {
                              const idx = tempUserIds.findIndex(findIdx);
                              tempUserIds.splice(idx, 1);
                            } else {
                              tempUserIds.push(user._id);
                            }

                            setUserIds([...tempUserIds]);
                            // console.log(userIds);
                          }}
                        >
                          <Image
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            width={43}
                            className="mr-1 rounded-full"
                            alt="pfp"
                          />
                          <div className="flex flex-col pl-2">
                            <strong className="text-left">{user.name}</strong>
                            {user.email}
                          </div>
                        </Button>
                      );
                    })
                : null}
              <hr className="border border-gray-400 border-dashed mt-1"></hr>
              <div
                className="flex mt-2 mr-1 py-[0.5px] justify-start p-1 rounded-md "
                // onClick={() => {
                //   console.log(userIds);
                // }}
              >
                <Image
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  width={43}
                  className="mr-1 rounded-full"
                  alt="pfp"
                />
                <div className="flex flex-col pl-2">
                  <strong className="text-left">You</strong>
                  {user.email}
                </div>
              </div>
            </div>
            <div className="modal-bot">3</div>
          </div>
        </div>
      ) : null}
      {settleModal == "open" ? (
        <div className="modal flex ">
          <div className="modal-div">
            <div className="modal-top">
              <p>Add an expense</p>

              <p className="cursor" onClick={() => setSettleModal("close")}>
                X
              </p>
            </div>
            <div className="modal-mid justify-center flex-col ">
              <p className="text-center text-gray-500 text-[16px]">
                Select a payment method
              </p>
              <Button
                className="mx-auto mt-2 btn-free btn-green w-[290px] text-[16px]"
                disableRipple
              >
                Cash payment
              </Button>
              <Button
                className="font-bold mx-auto mt-3 btn-free btn-lblue w-[290px] text-[16px] italic"
                disableRipple
              >
                Venmo
              </Button>
            </div>
            <div className="modal-bot">
              <Button
                onClick={() => setSettleModal("close")}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button className="btn btn-green" disableRipple>
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        onClick={() => {
          setExpenseModal("open");
          setTempSideUsers(group ? group.users : user.friends);
          setUserIds([]);
          console.log(userIds);
        }}
        disableRipple
        className="btn btn-orange"
        radius="lg"
      >
        Add an expense
      </Button>
      <Button
        onClick={() => setSettleModal("open")}
        disableRipple
        className="btn btn-green"
        radius="lg"
      >
        Settle up
      </Button>
    </div>
  );
};

export default ExpenseSettle;
