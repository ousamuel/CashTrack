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

// };
// async function loginUser(input: { [key: string]: string }) {
//   // function points to /server/controllers/userController.js
//   try {
//     const response: any = await fetch(`http://localhost:8001/users/login`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         email: input.email,
//         _password: input.password,
//       }),
//     });
//     if (!response.ok) {
//       if (response.status == 401) {
//         console.log(401);
//         setW
type FormData = {
  title: string;
  imageSrc: string;
  totalAmount: number;
  group: string;
  userIds: string[];
  distributions: DistributionType[];
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
  // console.log(group)

  const [expenseModal, setExpenseModal] = useState<string>("close");
  const [distributionType, setDistributionType] = useState<string>("Evenly");
  const [imageSrc, setImageSrc] = useState<string>("/ss/receipt.png");
  const [settleModal, setSettleModal] = useState<string>("close");
  const { user } = useContext(Context);
  const [userIds, setUserIds] = useState<string[]>([]);
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
  type Option = {
    desc: string;
    iconSrc: string;
  };
  const distributionOptions: Option[] = [
    { desc: "Evenly", iconSrc: "/svgs/equal.svg" },
    { desc: "By Percent", iconSrc: "/svgs/percent.svg" },
    { desc: "Custom", iconSrc: "/svgs/dollar-sign.svg" },
  ];
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const postNewExpense = async function (
    title: string,
    imageSrc: string,
    totalAmount: number,
    groupId: string,
    distributions: DistributionType[]
  ) {
    try {
      await fetch(`http://localhost:8001/expenses`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: "",
          imageSrc: "",
          creator: user._id,
          totalAmount: 0,
          distributions: distributions,
          group: groupId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(group);

  // console.log("groupdId" + groupId);
  return (
    <div className="text-[15px]">
      {expenseModal == "open" ? (
        <div className="modal flex flex-col md:flex-row ">
          <div className="modal-div w-[350px] md:translate-x-[70px] md:w-[420px]">
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
              <div>
                <p>With you and:</p>
                <Input
                  className="w-fit"
                  placeholder="Enter names or emaasdasdasdasils"
                  // {...register("email", {
                  //   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  //   required: true,
                  // })}
                />
              </div>
              <div className="flex my-5 border-t">
                <div id="postExpenseLeft flex-none justify-center" className="">
                  <div className="flex flex-col">
                    <strong>
                      <Input
                        className="w-[140px] md:w-[170px] md:text-lg border-b border-dashed m-1 text-center"
                        placeholder="Name of Expense"
                        {...register("title", {
                          required: true,
                        })}
                      />
                    </strong>
                    <div className="flex justify-center">
                      <Popover className="" placement="left" showArrow={true}>
                        <PopoverTrigger>
                          <Image
                            className="expense-img hover-gray cursor rounded-md mt-3"
                            width={90}
                            src={imageSrc}
                          />
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
                      Total amount paid
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
                              <div className="bg-black text-white rounded-lg p-2 -translate-y-4">
                                {option.desc}
                              </div>
                            }
                            key={option.desc}
                            placement="bottom"
                            closeDelay={0}
                          >
                            <Button
                              // className={
                              //   selectedDesc == obj.desc
                              //     ? "popover-trigger popover-open"
                              //     : "popover-trigger"
                              // }
                              onClick={() => setDistributionType(option.desc)}
                              disableRipple
                            >
                              <Image
                                width={37}
                                className={
                                  distributionType == option.desc
                                    ? "border-black border-2 bg-[#2c9984] rounded-full p-2 my-2"
                                    : "border rounded-full p-2 my-2"
                                }
                                src={option.iconSrc}
                              />
                            </Button>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
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
              <Button className="btn btn-green" disableRipple>
                Save
              </Button>
            </div>
          </div>

          <div className="modal-div min-w-[200px] ml-4 md:translate-x-[70px]">
            <div className="modal-top">
              {" "}
              {group ? "Group Members " + `(${group.users.length})` : "Friends"}
            </div>
            <div className="modal-mid flex-col">
              {group.users
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
                          : "flex mt-1 py-[0.5px] justify-start p-1 rounded-md "
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
                        console.log(userIds);
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
                })}
              <hr className="border border-gray-400 border-dashed mt-1"></hr>
              <Button
                className="flex mt-1 mx-1 py-[0.5px] justify-start p-1 rounded-md "
                disableRipple
                onClick={() => {
                  console.log(userIds);
                }}
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
              </Button>
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
