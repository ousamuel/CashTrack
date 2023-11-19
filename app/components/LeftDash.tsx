"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface LeftDashProps {
  path: string;
}
const LeftDash: React.FC<LeftDashProps> = ({ path }) => {
  const router = useRouter();
  return (
    <div className="left-container w-[200px] flex-col w-1/5 p-2">
      <div className="text-[16px] mt-1 mb-4">
        <Button
          className={path == "dashboard" ? "left-top open" : "left-top"}
          onClick={() => router.push("/dashboard")}
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
          className={path == "recent-activity" ? "left-top open" : "left-top"}
          onClick={() => router.push("/recent-activity")}
          disableRipple
        >
          <Image className="h-[17px] ml-1" src="/svgs/flag.svg" alt="logo" />
          Recent Activity
        </Button>
      </div>
      <div className="text-[14px]">
        <Button
          className={path == "all-expenses" ? "left-top open" : "left-top"}
          onClick={() => router.push("/all-expenses")}
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
        <div id="fb-twtt" className="text-[14px] flex pt-2 justify-center">
          <Button
            onClick={() => alert("Fake button")}
            disableRipple
            className="btn-2 btn-fb w-2/5"
            radius="lg"
          >
            <Image width={15} src="/svgs/fb.svg" alt="fb" />
            Share
          </Button>
          <Button
            onClick={() => alert("Fake button")}
            disableRipple
            className="btn-2 btn-tt w-2/5"
            radius="lg"
          >
            <Image width={15} src="/svgs/tt.svg" alt="tt" />
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftDash;
