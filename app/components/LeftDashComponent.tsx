"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "../providers";
interface LeftDashProps {
  path: string;
}
interface InviteForm {
  inviteEmail: string;
}

const LeftDashComponent: React.FC<LeftDashProps> = ({ path }) => {
  const router = useRouter();

  const {
    selectedGroup,
    setSelectedGroup,
    user,
    userGroups,
    userFriends,
    setUserFriends,
    BACKEND_API
  } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteForm>();
  const [friendsModal, setFriendsModal] = useState<string>("close");
  async function addFriend(email: string) {
    if (
      userFriends.find((friend: any) => friend.email == email) ||
      user.email == email
    ) {
      alert("already added");
      return 5;
    }
    try {
      const res: any = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}users/addFriend`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setUserFriends([data, ...userFriends]);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  const onSubmit: SubmitHandler<InviteForm> = (data) => {
    console.log(data.inviteEmail);
    addFriend(data.inviteEmail);
  };

  type Payments = {
    recipient: string;
    amountToPay: number;
  };

  type Members = {
    name: string;
    email: string;
    payments: Payments[];
  };

  type Group = {
    _id: string;
    groupName: string;
    creator: string;
    createdDate: string;
    members: Members[];
  };
  // onClick={() => {
  //   setSelectedGroup(group);
  //   router.push(`/groups/${group._id}`);
  // }}

  return (
    <div>
      {friendsModal == "open" ? (
        <div className="modal flex ">
          <div className="modal-div">
            <div className="modal-top">
              <p>Invite Friends</p>
              <p className="cursor" onClick={() => setFriendsModal("close")}>
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
                onClick={() => setFriendsModal("close")}
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

      <div className="text-[16px] mt-1">
        <Button
          className={path == "dashboard" ? "left-top open" : "left-top"}
          onClick={() => router.push("/dashboard")}
          disableRipple
        >
          <Image className="h-[17px] ml-1" src="/svgs/logo.svg" alt="logo" />
          <div>Dashboard</div>
        </Button>

        {/* <Button
          className={path == "recent-activity" ? "left-top open" : "left-top"}
          onClick={() => router.push("/recent-activity")}
          disableRipple
        >
          <Image className="h-[17px] ml-1" src="/svgs/recent.svg" alt="logo" />
          Recent Activity
        </Button> */}
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
          <span className="flex items-center">groups</span>
          <Link href="/new-group" className="add">
            <span className="font-extrabold text-[13px]">+</span> add
          </Link>
        </div>
        <div className="max-h-[22vh] overflow-y-scroll">
          {userGroups.map((group: any) => {
            return (
              <Button
                key={group._id}
                className={path == group._id ? "left-tabs open" : "left-tabs"}
                onClick={() => {
                  setSelectedGroup(group);
                  router.push(`/groups/${group._id}`);
                }}
                disableRipple
              >
                <Image src="/svgs/group.svg" width="10px" />
                {group.groupName}
              </Button>
            );
          })}
        </div>
        <div id="invite-box" className="">
          <h3 className="invites color">Add friends</h3>
          <div className="border ml-[5px] rounded-b-sm">
            <form onSubmit={handleSubmit(onSubmit)} >
              <Input
                className="text-black border-b border-dashed pt-3 mb-3 "
                type="email"
                placeholder="Enter an email address"
                {...register("inviteEmail", {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  required: true,
                })}
              />
              {errors.inviteEmail && (
                <span className="pl-1">Incorrect email format</span>
              )}

              <Button disableRipple className="btn-inv w-full" type="submit">
                Send invite
              </Button>
            </form>
          </div>
        </div>
        <div id="friends" className="left-header mt-4">
          <span>friends</span>
          {/* <Button
            onClick={() => setFriendsModal("open")}
            className="add"
            disableRipple
          >
            <span className="font-extrabold text-[13px]">+</span> add
          </Button> */}
        </div>

        <div className="max-h-[22vh] overflow-y-scroll">
          {user
            ? userFriends.map((friend: any) => {
                return (
                  <Button
                    key={friend._id}
                    className="left-tabs hover-gray"
                    disableRipple
                  >
                    <Image
                      src="/svgs/user.svg"
                      className="min-w-[10px]"
                      width="10px"
                    />
                    {friend.name}&nbsp;{friend.email}
                  </Button>
                );
              })
            : null}
        </div>
        {/* <Link className="left-tabs" href="/">
          <Image src="/svgs/user.svg" width="10px" />
          man
        </Link>
        <Link className="left-tabs" href="/">
          <Image src="/svgs/user.svg" width="10px" />
          woman
        </Link> */}

        {/* <div id="fb-twtt" className="text-[14px] flex pt-2 justify-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default LeftDashComponent;
