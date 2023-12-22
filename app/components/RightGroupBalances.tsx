"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Link,
  Button,
  Tooltip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Context } from "../providers";
// import io from "socket.io-client";
// const socket = io("http://localhost:8001");
interface InviteForm {
  inviteEmail: string;
}

type RightGroupBalancesProps = {
  group: any;
  expenses: any;
};
const RightGroupBalances: React.FC<RightGroupBalancesProps> = ({
  group,
  expenses,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [selectedDesc, setSelectedDesc] = useState<string>("Balances");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false);
  const handleButtonClick = (desc: string): void => {
    setSelectedDesc(desc);
    const component = renderComponent(desc);
    setSelectedComponent(component);
  };
  const { user } = useContext(Context);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteForm>();
  console.log(group);
  type ButtonType = {
    src: string;
    desc: string;
  };
  const buttonArray: ButtonType[] = [
    { src: "/svgs/list.svg", desc: "Balances" },
    { src: "/svgs/user.svg", desc: "Members" },
    // { src: "/svgs/chat.svg", desc: "Whiteboard" },
    { src: "/svgs/settings.svg", desc: "Settings" },
  ];
  const MembersComponent: React.FC = () => {
    return (
      <div>
        <h4 className="flex justify-between pr-5">
          Group Members{" "}
          <Button
            className="rounded-sm leading-none px-1 text-gray-500 
            bg-[#f1f1f1] hover:bg-[#eaeaea] hover:text-black"
            disableRipple
            onClick={() => {
              reset();
              setAddMemberModal(true);
            }}
          >
            +
          </Button>
        </h4>
        {group.users.map((userObj: any) => {
          return (
            <div key={userObj._id} className="flex items-center mt-3 ">
              <Image
                className={
                  userObj._id == user._id
                    ? "rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center border-b-2 border-[#2c9984]"
                    : "rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center"
                }
                src="/svgs/user.svg"
              />
              <div className="flex flex-col pl-2">
                <h3 className="leading-none font-bold flex">
                  {userObj.name}{" "}
                  {group.creator == userObj._id ? (
                    <Image width={17} className="ml-2" src="/svgs/crown.svg" />
                  ) : null}
                </h3>
                <h2 className="leading-snug">{userObj.email}</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const SettingsComponent: React.FC = () => {
    return (
      <div className="flex flex-col ">
        <h4>Settings</h4>

        {group.creator == user._id ? (
          <Button
            className="btn-3 text-left text-white bg-[#e51212] hover:bg-[#c83400]"
            disableRipple
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete Group
          </Button>
        ) : null}
      </div>
    );
  };
  const renderComponent = (desc: string): any => {
    switch (desc) {
      case "Balances":
        return null;
      case "Members":
        return MembersComponent;
      case "Settings":
        return SettingsComponent;
      default:
        return MembersComponent;
    }
  };

  const addMember = async function (inviteEmail: string) {
    const duplicateMember = group.users.find(
      (user: any) => user.email == inviteEmail
    );
    if (duplicateMember) {
      alert(`${inviteEmail} is already in "${group.groupName}"`);
      return false
    }
    try {
      const res: any = await fetch(
        `http://localhost:8001/groups/addMember/${group._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
          body: JSON.stringify({
            userEmail: inviteEmail,
          }),
        }
      );
      if (res.ok) {
        setAddMemberModal(false);
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const deleteGroup = async function () {
    try {
      const res: any = await fetch(
        `http://localhost:8001/groups/${group._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
        }
      );
      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const onSubmit: SubmitHandler<InviteForm> = (data) => {
    addMember(data.inviteEmail);
  };
  return (
    <div className="right-container">
      {openDeleteModal ? (
        <div className="modal flex flex-col md:flex-row md:pb-10 ">
          <div className="modal-div min-w-[270px] max-w-[65vw] flex flex-col text-center">
            This action is permanent
            <Button
              className="btn-free btn-orange"
              onClick={deleteGroup}
              disableRipple
            >
              {" "}
              Delete <strong className="">({group.groupName})</strong>
            </Button>
            <Button
              className="btn-free btn-green"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      {addMemberModal ? (
        <div className="modal flex flex-col md:flex-row md:pb-10 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal-div min-w-[270px] flex flex-col text-center"
          >
            <div className="modal-top">
              {" "}
              <p className="mr-5">Add a member to "{group.groupName}"</p>
              <p
                className="cursor text-[#e51212]"
                onClick={() => setAddMemberModal(false)}
              >
                X
              </p>
            </div>
            <Input
              className={
                errors.inviteEmail
                  ? "modal-mid border border-[#e51212]"
                  : "modal-mid border-b"
              }
              placeholder="Enter member's email"
              {...register("inviteEmail", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                required: true,
              })}
            />

            {/* <div className="modal-mid flex">overPaid || zeroPayment</div> */}
            <div className="flex justify-between bg-white rounded-b-[5px]">
              <p className="flex px-4 text-[#e51212]">
                {errors.inviteEmail ? "Invalid email" : null}
              </p>
              <div className="modal-bot">
                <Button
                  onClick={() => {
                    setAddMemberModal(false);
                  }}
                  className="btn btn-gray"
                  disableRipple
                >
                  Cancel
                </Button>
                <Button className="btn btn-green" type="submit" disableRipple>
                  Add user
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}

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
      <h4 className={selectedDesc == "Balances" ? "pt-1" : "hidden"}>
        Group Balances
      </h4>

      {group && group.users
        ? group.users.map((userObj: any, index: number) => {
            // console.log(userObj);
            const ownedExpenses = expenses.filter(
              (expense: any) =>
                expense.creator && expense.creator._id === userObj._id
            );
            const totalPaid = ownedExpenses.reduce(
              (total: number, { totalAmount }: { totalAmount: number }) =>
                total + totalAmount,
              0
            );
            const involvedExpenses = expenses.filter(
              (expense: any) =>
                expense.users && expense.users.includes(userObj._id)
            );
            let totalBorrowed = 0;
            involvedExpenses.map((expense: any) => {
              for (let i = 0; i < expense.payments.length; i++) {
                if (expense.payments[i].sender._id == userObj._id) {
                  totalBorrowed -= expense.payments[i].amount;
                }
              }
              for (let i = 0; i < expense.distributions.length; i++) {
                if (expense.distributions[i].lendingUser._id == userObj._id) {
                  totalBorrowed += expense.distributions[i].amount;
                  break;
                }
              }
            });
            return totalPaid || totalBorrowed ? (
              <div className={selectedDesc == "Balances" ? "" : "hidden"}>
                <div
                  className={
                    index != 0 ? "flex border-t py-[10px]" : "flex py-[10px]"
                  }
                >
                  <div className="flex flex-col items-center justify-center border-r border-gray-200 pr-1">
                    <strong>{userObj.name}</strong>
                    <Image
                      className="rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center "
                      src="/svgs/user.svg"
                    />
                  </div>
                  <div className="pl-2 flex flex-col justify-center">
                    {totalPaid ? (
                      <h2 className="text-[#2c9984]">
                        PAID ${totalPaid.toFixed(2)}{" "}
                      </h2>
                    ) : null}
                    {totalBorrowed ? (
                      <h2 className="text-[#e51212]">
                        OWES ${totalBorrowed.toFixed(2)}{" "}
                      </h2>
                    ) : null}
                    {totalPaid && totalBorrowed ? (
                      <strong className="border-t border-gray-200 text-center">
                        Net Balance
                      </strong>
                    ) : null}
                    {totalPaid && totalBorrowed ? (
                      totalPaid >= totalBorrowed ? (
                        <h2 className="text-[#2c9984] text-center leading-none">
                          ${(totalPaid - totalBorrowed).toFixed(2)}{" "}
                        </h2>
                      ) : (
                        <h2 className="text-[#e51212] text-center leading-none">
                          ${(totalBorrowed - totalPaid).toFixed(2)}{" "}
                        </h2>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null;
          })
        : "Loading"}
      <div className="mt-2">{selectedComponent}</div>
    </div>
  );
};

export default RightGroupBalances;
// const [message, setMessage] = useState<string>("");
// const [messageReceived, setMessageReceived] = useState<string>("");
// const [allMessagesState, setAllMessagesState] = useState<any[]>([]);
// const allMessages: any[] = [];
// const sendMessage = () => {
//   socket.emit("send_message", {
//     message: message,
//     userId: user._id,
//   });
// };
// useEffect(() => {
//   setAllMessagesState([...allMessages]);
//   socket.on("receive_message", (data) => {
//     setMessageReceived(data.message);
//     allMessages.push(data.message)
//     setAllMessagesState([...allMessages, data.message]);
//   });
// }, []);

{
  /* <div className="text-box">
    <Input
      className="text-2xl"
      // value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="message"
    />
    <Button
      onClick={() => {
        sendMessage();
      }}
      disableRipple
    >
      {" "}
      send message
    </Button>
    <div>
      {messageReceived}
      {allMessagesState.map((message: any) => {
        return <div>{message.message}</div>;
      })}
    </div>
  </div> */
}
