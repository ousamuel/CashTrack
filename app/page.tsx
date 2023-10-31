"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider,
  Link,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Header from "./header";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Header />
      <div className="main-body ">
        <div className="left-container w-[200px] flex-col w-1/5 p-2">
          <div className="text-[16px] mt-1 mb-4">
            <Link className="left-top open" href="/">
              <Image
                className="h-[17px] ml-1"
                src="/images/splitwise.png"
                alt="logo"
              />
              <div>Dashboard</div>
            </Link>
            <Link className="left-top" href="/">
              <Image
                className="h-[17px] ml-1"
                src="/svgs/flag.svg"
                alt="logo"
              />
              Recent Activity
            </Link>
          </div>
          <div className="text-[14px]">
            <Link className="left-top" href="/">
              <Image
                className="h-[15px] ml-1"
                src="/svgs/bulletList.svg"
                alt="list"
              />
              All expenses
            </Link>
          </div>

          <div className="mt-1">
            <div id="groups" className="left-header">
              <span>groups</span>
              <div>
                <span className="font-extrabold text-[13px]">+</span> add
              </div>
            </div>
            <Link className="left-tabs open">
              <Image src="/svgs/tag.svg" width="10px" />
              food
            </Link>
            <Link className="left-tabs ">
              <Image src="/svgs/tag.svg" width="10px" />
              food
            </Link>

            <div id="friends" className="left-header">
              <span>friends</span>
              <div>
                <span className="font-extrabold text-[13px]">+</span> add
              </div>
            </div>
            <Link className="left-tabs open">
              <Image src="/svgs/user.svg" width="10px" />
              man
            </Link>
            <Link className="left-tabs ">
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
                <Button disableRipple className="btn-inv">
                  Send invite
                </Button>
              </div>
            </div>
            <div id="fb-twtt" className="text-[14px] flex pt-2 justify-center">
              <Button disableRipple className="btn-2 btn-fb w-2/5" radius="lg">
                <Image width={15} src="/svgs/fb.svg" alt="fb" />
                Share
              </Button>
              <Button disableRipple className="btn-2 btn-tt w-2/5" radius="lg">
                <Image width={15} src="/svgs/tt.svg" alt="tt" />
                Tweet
              </Button>
            </div>
          </div>
        </div>
        <div className="mid-container w-3/5">
          <div className="p-3 bg-gray-200 flex border-b-2 justify-between">
            <h1 className="topbar">Dashboard</h1>
            <div className="text-[15px]">
              <Button disableRipple className="btn btn-orange" radius="lg">
                Add an expense
              </Button>
              <Button disableRipple className="btn btn-green" radius="lg">
                Settle up
              </Button>
            </div>
          </div>
          <div className="py-2 bg-gray-200 flex justify-between border-y border-gray-300">
            <div className="block ">
              <p>total balance</p>
              <p>price</p>
            </div>
            <div className="block border-l border-gray-300">
              <p>you owe</p>
              <p>price</p>
            </div>
            <div className="block border-l border-gray-300">
              <p>you are owed</p>
              <p>price</p>
            </div>
          </div>
          <h2 className="relative uppercase p-2 px-3 text-[14px]">
            <span>you owe</span>
            <div className="absolute top-[10px] flex text-[12px] w-full justify-center items-center">
              <Button disableRipple className="list-btn" radius="lg">
                <Image
                  className="h-[12px]"
                  width="15px"
                  src="/svgs/list.svg"
                  alt="list"
                />
                view as list{" "}
              </Button>{" "}
              <Button disableRipple className="chart-btn" radius="lg">
                <Image
                  className="border-[1.5px] border-black mr-[10px]"
                  width="14px"
                  src="/svgs/chart.svg"
                  alt="charts"
                />
                <span>view as chart</span>
              </Button>{" "}
            </div>
            <span className="float-right">you are owed</span>
          </h2>
          <div className="p-3">list</div>
        </div>
        <div className="right-container max-w-[200px] w-1/5">
          <h2 className="uppercase">splitwise on the go</h2>
          <span>Get the free Splitwise app and add IOUs from anywhere:</span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://apps.apple.com/us/app/splitwise/id458023433"
          >
            <Image
              className="mt-3"
              src="/images/iphone.png"
              alt="iphone app link"
              width="160px"
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile"
          >
            <Image
              className="mt-3"
              src="/images/android.png"
              alt="android app link"
              width="160px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
