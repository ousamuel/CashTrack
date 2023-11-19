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
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();

  const [path, setPath] = useState<string>("");

  return (
    <div className="flex fixed w-full color h-[33px]">
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
              <div className="text-[16px] mt-1 mb-4">
                <Button
                  className={path == "dashboard" ? "left-top open" : "left-top"}
                  onClick={() => {
                    setPath("dashboard");
                    router.push("/dashboard");
                  }}
                  disableRipple
                >
                  <Image
                    className="h-[17px] ml-1"
                    src="/images/splitwise.png"
                    alt="logo"
                  />
                  <div>Dashboard</div>
                </Button>

                <Button
                  className={
                    path == "recent-activity" ? "left-top open" : "left-top"
                  }
                  onClick={() => {
                    setPath("recent-activity");
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
                    setPath("all-expenses");
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
                <Link className="left-tabs" href="/">
                  <Image src="/svgs/tag.svg" width="10px" />
                  food
                </Link>
                <Link className="left-tabs" href="/">
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
              </div>
            </PopoverContent>
          </Popover>
          <Link href="/" className="w-[165px] flex content-center pl-1">
            <Image
              width="108px"
              height="22px"
              className="m-auto"
              src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
            />
          </Link>
        </div>
        <Popover className="" placement="bottom" showArrow={true}>
          <PopoverTrigger className="hover:bg-[#39a385]">
            <Button className="px-2 flex" disableRipple>
              <Image
                className="w-[25px] rounded-full mr-2"
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <p>Sam</p>
              <Image
                className="ml-1 mt-[2px]"
                width={10}
                src="/svgs/dropdown.svg"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="triangle-up"></div>
            <div className="bg-white rounded-md border-gray-400 border-[1px] -translate-y-2 ">
              <div className="flex flex-col">
                <Link className="acc-btn" href='/dashboard'>
                  Your account
                </Link>
                <Link className="acc-btn" href="/new-group">
                  Create a group
                </Link>
                <Link className="acc-btn" href='/dashboard'>
                  Logout
                </Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
