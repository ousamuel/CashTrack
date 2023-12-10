"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Link,
} from "@nextui-org/react";
import LeftDashComponent from "./components/LeftDashComponent";
import { useRouter } from "next/navigation";
import { Context } from "./providers";

interface HeaderProps {
  path: string;
}
const Header: React.FC<HeaderProps> = ({ path }) => {
  const { user } = useContext(Context);
  const router = useRouter();
  const logOut = async function () {
    try {
      await fetch(`http://localhost:8001/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            router.push("/");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex fixed w-full color h-[40px]">
      <div className="navbar">
        <div className="flex">
          <Popover className="" placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button className="dropdown cursor" disableRipple>
                <Image
                  className="mt-[5px]"
                  width={20}
                  src="/svgs/dropdown.svg"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-2 border border-[#5bc5a7] rounded-md text-[#999999]">
              <LeftDashComponent path={path} />
              {/* <div className="text-[16px] mt-1 mb-4">
                <Button
                  className={path == "dashboard" ? "left-top open" : "left-top"}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  disableRipple

                >
                  <Image
                    className="h-[17px] ml-1"
                    src="/svgs/logo.svg"
                    alt="logo"
                  />
                  <div>Dashboard</div>
                </Button>

                <Button
                  className={
                    path == "recent-activity" ? "left-top open" : "left-top"
                  }
                  onClick={() => {
                    router.push("/recent-activity");
                  }}
                  disableRipple
                >
                  <Image
                    className="h-[17px] ml-1"
                    src="/svgs/flag.svg"
                    alt="logo"
                  />
                  Recent Activity
                </Button>
              </div>
              <div className="text-[14px]">
                <Button
                  className={
                    path == "all-expenses" ? "left-top open" : "left-top"
                  }
                  onClick={() => {
                    router.push("/all-expenses");
                  }}
                  disableRipple
                >
                  <Image
                    className="h-[15px] items-center ml-1"
                    src="/svgs/bulletList.svg"
                    alt="list"
                  />
                  All expenses
                </Button>
              </div>
              <div className="mt-1">
                <div id="groups" className="left-header">
                  <span>groups</span>
                  <Link href="/new-group" className="add">
                    <span className="font-extrabold text-[13px]">+</span> add
                  </Link>
                </div>
                <Link className="left-tabs" href="/dashboard">
                  <Image src="/svgs/tag.svg" width="10px" />
                  food
                </Link>
                <Link className="left-tabs" href="/dashboard">
                  <Image src="/svgs/tag.svg" width="10px" />
                  food
                </Link>

                <div id="friends" className="left-header">
                  <span>friends</span>
                  <Button className="add" disableRipple>
                    <span className="font-extrabold text-[13px]">+</span> add
                  </Button>
                </div>
                <Link className="left-tabs" href="/">
                  <Image src="/svgs/user.svg" width="10px" />
                  man
                </Link>
                <Link className="left-tabs" href="/">
                  <Image src="/svgs/user.svg" width="10px" />
                  woman
                </Link>

                <div id="invite-box" className="">
                  <h3 className="invites color">Invite friends</h3>
                  <div className="input-box">
                    <input
                      className=""
                      type="email"
                      placeholder="Enter an email address"
                    />
                    <Button
                      disableRipple
                      className="btn-inv"
                      onClick={() => {
                        alert("Please enter a valid email address.");
                      }}
                    >
                      Send invite
                    </Button>
                  </div>
                </div>
              </div> */}
            </PopoverContent>
          </Popover>
          <Link
            href="/dashboard"
            className="w-[165px] flex content-center pl-1"
          >
            <Image
              width="30px"
              height="22px"
              className="m-auto"
              src="/svgs/logo.svg"
            />
            <strong className="ml-1 text-xl">CashTrack</strong>
          </Link>
        </div>
        <Popover className="" placement="bottom" showArrow={true}>
          {user ? (
            <PopoverTrigger className="hover:bg-[#39a385]">
              <Button className="px-2 flex" disableRipple>
                <Image
                  className="w-[25px] rounded-full mr-2"
                  radius="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                <p>{user.name}</p>
                <Image
                  className="ml-1 mt-[2px]"
                  width={10}
                  src="/svgs/dropdown.svg"
                />
              </Button>
            </PopoverTrigger>
          ) : null}

          <PopoverContent>
            <div className="triangle-up"></div>
            <div className="bg-white rounded-md border-gray-400 border-[1px] -translate-y-2 ">
              <div className="flex flex-col">
                <Link className="acc-btn" href="/dashboard">
                  Your account
                </Link>
                <Link className="acc-btn" href="/new-group">
                  Create a group
                </Link>
                <Button className="acc-btn" onClick={logOut}>
                  Logout
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
