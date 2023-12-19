"use client";
import React, { useContext, useState } from "react";
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Link,
  Textarea,
  Input,
} from "@nextui-org/react";
import Header from "../header";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "../providers";
type FormData = {
  groupTitle: string;
  // percents: number[];
  // userIds: string[];
  // distributions: DistributionType[];
};
export default function NewGroup() {
  const { user } = useContext(Context);
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [tempEmails, setTempEmails] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const handleGroup: SubmitHandler<FormData> = (data) => {
    console.log(data);
    createNewGroup(data);
  };

  const createNewGroup = async function (input: { [key: string]: any }) {
    try {
      await fetch(`http://localhost:8001/groups`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          groupName: input.groupTitle,
          creator: user._id,
          userEmails: userEmails,
        }),
      })
        .then((res) => (res.ok ? res.json() : console.log(res.status)))
        .then((data) => {
          window.location.href = `/groups/${data._id}`;
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header path="" />
      <form
        onSubmit={handleSubmit(handleGroup)}
        className="justify-center flex flex-col items-center pt-[70px] sm:flex-row"
      >
        <div className="sm:flex flex-col mx-7 mb-7 hidden">
          <Image className="mb-4" width={200} src="/svgs/logo.svg" />
          {/* <Input className="max-w-[200px]" type="file" /> */}
        </div>
        <div className="flex flex-col text-center sm:text-left min-w-[40vw]">
          <h2 className="uppercase text-[16px] mb-3">Start a new group</h2>
          <h1>My group shall be called...</h1>
          <Input
            className={
              errors.groupTitle
                ? "border-red-500 border rounded-md text-[30px] py-1"
                : "border rounded-md text-[30px] py-1"
            }
            placeholder="Lunch Bandits"
            {...register("groupTitle", {
              required: true,
            })}
            // value={groupName}
            // onChange={(e) => {
            //   setGroupName(e.target.value);
            // }}
          />
          <hr className="my-4"></hr>
          <div className="flex justify-between">
            <div className="grow">
              <h2 className="uppercase text-[16px] text-black font-extrabold">
                Group members{" "}
              </h2>
              {/* <p className="text-gray-500">
                (users must already have an account created)
              </p> */}

              <div className="max-w-[200px] text-left text-[14px]">
                <p className="pl-3">
                  Creator:&nbsp;<strong>You</strong>
                </p>
                {userEmails
                  .filter((email: any) => email)
                  .map((user: any, index: number) => {
                    return (
                      <div className="flex max-w-full my-1 pl-3">
                        <Button
                          className="btn-2 btn-orange p-0 leading-none mr-1"
                          onClick={() => {
                            let tempUserEmails: string[] = userEmails;
                            tempUserEmails.splice(index, 1);
                            setUserEmails([...tempUserEmails]);
                          }}
                        >
                          x
                        </Button>
                        {user}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col px-2 grow">
              <h2 className="uppercase text-[16px]">Add users</h2>

              <Textarea
                className="border whitespace-normal rounded-t-md pt-1"
                value={tempEmails}
                onChange={(e) => {
                  console.log(tempEmails);
                  setTempEmails(e.target.value);
                }}
                placeholder="Enter emails with a space between each email. Example: sample@gmail.com user@gmail.com blank@gmail.com"
              />
              <Button
                className="btn-3 btn-green h-[40px]"
                onClick={() => {
                  const emailsArr = tempEmails.split(/\s+/);
                  const mergedArr = userEmails.concat(emailsArr);
                  const filtered = mergedArr.filter(
                    (email: any, index: number) =>
                      mergedArr.indexOf(email) === index
                  );
                  setUserEmails(filtered);
                  setTempEmails("");
                }}
              >
                Add email(s)
              </Button>
              <div className="flex flex-col mt-1">
                {user && user.friends ? (
                  <h2 className="uppercase text-[16px]">Add from friends</h2>
                ) : null}
                <div className="flex flex-col max-h-[130px] w-full items-center overflow-y-scroll border w-fit px-4">
                  {user && user.friends
                    ? user.friends.map((friend: any, index: any) => {
                        const findIdx: (id: string) => boolean = function (
                          email: string
                        ): boolean {
                          return email == friend.email;
                        };
                        return (
                          <Button
                            key={friend._id + index}
                            className={
                              userEmails.includes(friend.email)
                                ? "flex mt-1 py-[0.5px] bg-green-200 p-1 rounded-md  w-full"
                                : "flex mt-1 py-[0.5px] p-1 rounded-md hover:bg-green-100 w-full "
                            }
                            onClick={() => {
                              let tempUserEmails: string[] = userEmails;
                              if (userEmails.includes(friend.email)) {
                                const idx = tempUserEmails.findIndex(findIdx);
                                tempUserEmails.splice(idx, 1);
                              } else {
                                tempUserEmails.push(friend.email);
                              }

                              setUserEmails([...tempUserEmails]);
                              console.log(userEmails);
                            }}
                            disableRipple
                          >
                            {friend.name}: {friend.email}
                          </Button>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
          <Button
            className="btn-free btn-orange w-[80%] mx-auto text-[20px] px-4 mt-3"
            disableRipple
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
