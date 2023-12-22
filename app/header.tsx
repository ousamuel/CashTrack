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
  const { user, BACKEND_API } = useContext(Context);
  const router = useRouter();
  const logOut = async function () {
    try {
      await fetch(`${BACKEND_API}logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("logged out");
            // router.push("/");
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
      {user ? (
        <div className="navbar">
          <div className="flex">
            <Popover className="" placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button className="dropdown cursor" disableRipple>
                  <Image
                    className="mt-[5px] px-2"
                    width={35}
                    src="/svgs/dropdown.svg"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-2 border border-[#5bc5a7] rounded-md text-[#999999]">
                <LeftDashComponent path={path} />
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
            <PopoverTrigger className="hover:bg-[#39a385]">
              <Button className="px-2 flex" disableRipple>
                <Image
                  className="w-[22px] rounded-full mr-2 border bg-white"
                  radius="sm"
                  src="/svgs/user.svg"
                />
                <p>{user.name}</p>
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
                  <Link className="acc-btn" href="/account">
                    Your account
                  </Link>
                  <Link className="acc-btn" href="/new-group">
                    Create a group
                  </Link>
                  <Link href="/" className="acc-btn" onClick={logOut}>
                    Logout
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
