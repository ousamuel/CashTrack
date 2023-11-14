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

  return (
    <div className="flex fixed w-full color h-[33px]">
      <div className="navbar">
        <Link href="/" className="w-[165px] flex content-center pl-1">
          <Image
            width="108px"
            height="22px"
            className="m-auto"
            src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
          />
        </Link>
        <Popover className="" placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Button className="px-2 flex">
              <Image
                className="w-[25px] rounded-full mr-2"
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <p>Sam</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="triangle-up"></div>
            <div className="bg-white rounded-sm p-3 border-gray-300 border-[1px] -translate-y-2 -translate-x-10">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
