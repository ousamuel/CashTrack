"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Link, Button, Tooltip, Input } from "@nextui-org/react";
import io from "socket.io-client";
import { Context } from "../providers";
const socket = io("http://localhost:8001");

type RightGroupBalancesProps = {
  group: any;
  expenses: any;
};
const RightGroupBalances: React.FC<RightGroupBalancesProps> = ({
  group,
  expenses,
}) => {
  const { user } = useContext(Context);
  console.log(group);
  type ButtonType = {
    src: string;
    desc: string;
  };

  const buttonArray: ButtonType[] = [
    { src: "/svgs/list.svg", desc: "Balances" },
    { src: "/svgs/user.svg", desc: "Members" },
    { src: "/svgs/chat.svg", desc: "Whiteboard" },
    { src: "/svgs/settings.svg", desc: "Settings" },
  ];

  const MembersComponent: React.FC = () => {
    return (
      <div>
        <h4>Group Members</h4>
        {group.users.map((user: any) => {
          return (
            <div key={user._id} className="flex items-center mt-3 ">
              <Image
                className="rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center "
                src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
              />
              <div className="flex flex-col pl-2">
                <h3 className="leading-none font-bold flex">
                  {user.name}{" "}
                  {group.creator == user._id ? (
                    <Image width={17} className='ml-2' src="/svgs/crown.svg" />
                  ) : null}
                </h3>
                <h2 className="leading-snug">{user.email}</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const renderComponent = (desc: string): any => {
    switch (desc) {
      case "Balances":
        return null;
      case "Members":
        return MembersComponent;
      default:
        return MembersComponent;
    }
  };
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [selectedDesc, setSelectedDesc] = useState<string>("Balances");
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
      <h4 className={selectedDesc == "Balances" ? "pt-1" : "hidden"}>
        Group Balances
      </h4>

      {group && group.users
        ? group.users.map((userObj: any) => {
            console.log(userObj);
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
              for (let i = 0; i < expense.distributions.length; i++) {
                if (expense.distributions[i].lendingUser._id == userObj._id) {
                  totalBorrowed += expense.distributions[i].amount;
                  break;
                }
              }
            });
            return totalPaid || totalBorrowed ? (
              <div className={selectedDesc == "Balances" ? "mt-3" : "hidden"}>
                <div className="flex">
                  <div className="flex flex-col items-center border-r border-gray-200 pr-1">
                    <strong>{userObj.name}</strong>
                    <Image
                      className="rounded-full min-w-[40px] max-w-[40px] items-center my-auto justify-center "
                      src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
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
                      totalPaid >= totalBorrowed ? (
                        <h2 className="text-[#2c9984] border-t border-gray-200">
                          GETS BACK ${(totalPaid - totalBorrowed).toFixed(2)}{" "}
                        </h2>
                      ) : (
                        <h2 className="text-[#e51212] border-t border-gray-200">
                          OWES ${(totalBorrowed - totalPaid).toFixed(2)}{" "}
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
