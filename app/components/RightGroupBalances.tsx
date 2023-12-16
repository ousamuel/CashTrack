"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Link, Button, Tooltip, Input } from "@nextui-org/react";
import io from "socket.io-client";
import { Context } from "../providers";
const socket = io("http://localhost:8001");

type RightGroupBalancesProps = {
  group: any;
  // expenses: any;
};
const RightGroupBalances: React.FC<RightGroupBalancesProps> = ({ group }) => {
  const [members, setMembers] = useState<[]>([]);
  const { user } = useContext(Context);
  console.log(group);

  type ButtonType = {
    src: string;
    desc: string;
  };

  const buttonArray: ButtonType[] = [
    { src: "/svgs/list.svg", desc: "Group Balances" },
    { src: "/svgs/user.svg", desc: "Members" },
    { src: "/svgs/chat.svg", desc: "Whiteboard" },
    { src: "/svgs/settings.svg", desc: "Settings" },
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
        {/* {membersArray.map((member) => {
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
                <strong>$25.00</strong>
              </p>
            </div>
          );
        })} */}
        {/* 
const totalReturn = expense.distributions.reduce(
          (total: number, { amount }: { amount: number }) => total + amount,
          0
        );
        */}
        {group && group.users
          ? group.users.map((user: any) => {
              const ownedExpenses = group.expenses.filter(
                (expense: any) => expense.creator._id == user._id
              );
              const totalPaid = ownedExpenses.reduce(
                (total: number, { totalAmount }: { totalAmount: number }) =>
                  total + totalAmount,
                0
              );
              const involvedExpenses = group.expenses.filter((expense: any) =>
                expense.users.includes(user._id)
              );
              let totalBorrowed = 0;
              involvedExpenses.map((expense: any) => {
                for (let i = 0; i < expense.distributions.length; i++) {
                  if (expense.distributions[i].lendingUser._id == user._id) {
                    totalBorrowed += expense.distributions[i].amount;
                    break;
                  }
                }
              });
              return (
                <div className="mb-3">
                  {user.name} paid a total of ${totalPaid.toFixed(2)} and owes a
                  total of ${totalBorrowed.toFixed(2)}
                </div>
              );
            })
          : null}
      </div>
    );
  };
  const MembersComponent: React.FC = () => {
    return (
      <div>
        <strong>Group Members</strong>
        {group.users.map((user: any) => {
          return (
            <div key={user._id} className="flex items-center mt-3 ">
              <Image
                className="rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center "
                src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
              />
              <div className="flex flex-col pl-2">
                <h3 className="leading-none font-bold">{user.name}</h3>
                <h2 className="leading-snug">{user.email}</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const renderComponent = (desc: string): React.FC => {
    switch (desc) {
      case "Balances":
        return BalancesComponent;
      case "Members":
        return MembersComponent;
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

  return (
    <div className="right-container">
      {/* <div className="text-box">
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
      </div> */}
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
};

export default RightGroupBalances;
